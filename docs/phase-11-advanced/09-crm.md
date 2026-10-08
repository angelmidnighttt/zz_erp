# 09 · Quản lý quan hệ khách hàng / CRM — Giai đoạn 11 / Phase 11

[← Giai đoạn 11 · Nâng cao / Phase 11 · Advanced](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P10](../phase-10-expansion/09-crm.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Thu thập lead tự động; khiếu nại & chăm sóc khách hàng; phân khúc khách hàng.
- **EN:** Automatic lead capture; complaints & customer care; customer segmentation.

## 1. Yêu cầu chức năng / Functional requirements

#### FR-CRM-002 · Thu thập lead tự động / Automatic lead capture
`Could` · `P11`

- **VI:** Tạo lead tự động từ form website, quảng cáo thu thập khách hàng tiềm năng trên mạng xã hội, Zalo OA (qua API / webhook `FR-INT-014`, `FR-INT-015`).
- **EN:** Create leads automatically from website forms, social media lead ads and Zalo OA (via API / webhooks `FR-INT-014`, `FR-INT-015`).

#### FR-CRM-008 · Khiếu nại & chăm sóc khách hàng / Complaints & customer care
`Could` · `P11`

- **VI:** Ghi nhận phiếu khiếu nại / yêu cầu hỗ trợ, phân công xử lý, thời hạn xử lý (SLA), trạng thái, kết quả.
- **EN:** Record complaint / support tickets, assign handlers, SLA deadlines, status and resolution.

#### FR-CRM-009 · Phân khúc khách hàng / Customer segmentation
`Could` · `P11`

- **VI:** Phân khúc khách hàng theo doanh số, tần suất mua, lần mua gần nhất (RFM) và thuộc tính tùy chọn.
- **EN:** Segment customers by revenue, purchase frequency, recency (RFM) and custom attributes.

## 2. Mô hình dữ liệu / Data model

- **VI:** Mỗi kênh thu thập lead (form website, quảng cáo thu thập lead, Zalo OA) là một `lead_capture_sources` có token xác thực webhook và bảng ánh xạ trường; mọi sự kiện nhận về được lưu ở `lead_capture_events` với `external_id` duy nhất theo kênh để không tạo trùng lead khi kênh gửi lại (`FR-CRM-002`). Phiếu khiếu nại / hỗ trợ có hạn xử lý tính từ chính sách SLA theo mức ưu tiên; trao đổi trên phiếu dùng `document_comments` (P10) — `FR-CRM-008`. Phân khúc RFM tính trong materialized view `mv_customer_rfm`, làm mới định kỳ; phân khúc tùy chọn lưu điều kiện và danh sách thành viên (`FR-CRM-009`). Hồ sơ 360° được bổ sung số khiếu nại đang mở.
- **EN:** Each lead capture channel (website form, lead ads, Zalo OA) is a `lead_capture_sources` row with a webhook token and field mapping; every received event is stored in `lead_capture_events` with an `external_id` unique per channel so retries never create duplicate leads (`FR-CRM-002`). Complaint / support tickets get SLA deadlines from the priority-based SLA policy; ticket conversations use `document_comments` (P10) — `FR-CRM-008`. RFM segmentation is computed in the `mv_customer_rfm` materialized view, refreshed periodically; custom segments store their rules and member list (`FR-CRM-009`). The 360° view gains the number of open complaints.

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 08-hr-payroll.md (P11)

INSERT INTO app_functions (code, module, name_vi, name_en, supported_actions, sort_order) VALUES
  ('CRM.TICKET', 'CRM', 'Khiếu nại & chăm sóc khách hàng', 'Complaints & customer care', '{VIEW,CREATE,EDIT,DELETE}', 930)
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (role_id, function_code, action)
SELECT r.id, 'CRM.TICKET', a
FROM (VALUES ('CEO','V'), ('SAL','VCE'), ('SLM','VCED'), ('AUD','V')) AS m(role_code, letters)
JOIN roles r ON r.code = m.role_code
CROSS JOIN LATERAL perm_letters(m.letters) AS a
ON CONFLICT DO NOTHING;

-- ===== Thu thập lead tự động / Automatic lead capture (FR-CRM-002) =====
CREATE TYPE lead_channel AS ENUM ('WEBSITE_FORM','FACEBOOK_LEAD_ADS','TIKTOK_LEAD_ADS','ZALO_OA','OTHER');

CREATE TABLE lead_capture_sources (
  id                uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  channel           lead_channel NOT NULL,
  name              varchar(150) NOT NULL,
  lead_source_code  varchar(30)  REFERENCES lead_sources(code),
  webhook_token_hash text        NOT NULL,
  field_mapping     jsonb        NOT NULL DEFAULT '{}',
  default_owner_id  uuid         REFERENCES users(id),  -- NULL = theo lead_assignment_rules
  credential_id     uuid         REFERENCES integration_credentials(id),
  is_active         boolean      NOT NULL DEFAULT true,
  created_at        timestamptz  NOT NULL DEFAULT now(),
  created_by        uuid         REFERENCES users(id)
);

CREATE TYPE capture_event_status AS ENUM ('RECEIVED','LEAD_CREATED','DUPLICATE','REJECTED','ERROR');

CREATE TABLE lead_capture_events (
  id           bigint               GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  source_id    uuid                 NOT NULL REFERENCES lead_capture_sources(id),
  external_id  varchar(150)         NOT NULL,
  payload      jsonb                NOT NULL,
  status       capture_event_status NOT NULL DEFAULT 'RECEIVED',
  lead_id      uuid                 REFERENCES crm_leads(id),
  error        text,
  received_at  timestamptz          NOT NULL DEFAULT now(),
  UNIQUE (source_id, external_id)
);

-- ===== Khiếu nại & chăm sóc / Complaints & customer care (FR-CRM-008) =====
CREATE TYPE ticket_priority AS ENUM ('LOW','NORMAL','HIGH','URGENT');
CREATE TYPE ticket_status   AS ENUM ('NEW','IN_PROGRESS','WAITING_CUSTOMER','RESOLVED','CLOSED','CANCELLED');

CREATE TABLE sla_policies (
  priority          ticket_priority PRIMARY KEY,
  response_hours    smallint        NOT NULL CHECK (response_hours > 0),
  resolution_hours  smallint        NOT NULL CHECK (resolution_hours > 0)
);

CREATE TABLE crm_tickets (
  id                  uuid            PRIMARY KEY DEFAULT gen_random_uuid(),
  code                varchar(30)     NOT NULL UNIQUE,
  partner_id          uuid            NOT NULL REFERENCES partners(id),
  contact_id          uuid            REFERENCES partner_contacts(id),
  subject             varchar(255)    NOT NULL,
  description         text,
  category            varchar(50),    -- 'QUALITY','DELIVERY','INVOICE','OTHER'…
  channel             varchar(30),    -- 'PHONE','EMAIL','ZALO','WEB'…
  priority            ticket_priority NOT NULL DEFAULT 'NORMAL',
  status              ticket_status   NOT NULL DEFAULT 'NEW',
  sales_order_id      uuid            REFERENCES sales_orders(id),
  invoice_id          uuid            REFERENCES customer_invoices(id),
  response_due_at     timestamptz,
  resolution_due_at   timestamptz,
  first_response_at   timestamptz,
  resolved_at         timestamptz,
  resolution          text,
  owner_id            uuid            REFERENCES users(id),   -- người xử lý / assignee
  department_id       uuid            REFERENCES departments(id),
  version             integer         NOT NULL DEFAULT 1,
  created_at          timestamptz     NOT NULL DEFAULT now(),
  created_by          uuid            REFERENCES users(id),
  updated_at          timestamptz     NOT NULL DEFAULT now(),
  updated_by          uuid            REFERENCES users(id),
  CHECK (status NOT IN ('RESOLVED','CLOSED') OR resolution IS NOT NULL)
);
CREATE INDEX crm_tickets_open ON crm_tickets (resolution_due_at) WHERE status IN ('NEW','IN_PROGRESS','WAITING_CUSTOMER');
CREATE INDEX ON crm_tickets (partner_id);

-- ===== Phân khúc khách hàng / Customer segmentation (FR-CRM-009) =====
CREATE MATERIALIZED VIEW mv_customer_rfm AS
WITH s AS (
  SELECT i.customer_id,
         current_date - max(i.invoice_date) AS recency_days,
         count(*)                           AS frequency,
         sum(i.amount_total_vnd)            AS monetary_vnd
  FROM customer_invoices i
  WHERE i.status IN ('POSTED','PARTIALLY_PAID','PAID')
    AND i.invoice_date >= current_date - interval '24 months'
  GROUP BY i.customer_id
)
SELECT s.*,
       6 - ntile(5) OVER (ORDER BY s.recency_days) AS r_score,  -- 5 = mua gần nhất / most recent
       ntile(5) OVER (ORDER BY s.frequency)         AS f_score,
       ntile(5) OVER (ORDER BY s.monetary_vnd)      AS m_score,
       now()                                        AS computed_at
FROM s;
CREATE UNIQUE INDEX ON mv_customer_rfm (customer_id);  -- cho REFRESH … CONCURRENTLY

CREATE TYPE segment_type AS ENUM ('RFM','CUSTOM');

CREATE TABLE customer_segments (
  id            uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  code          varchar(30)  NOT NULL UNIQUE,
  name          varchar(150) NOT NULL,
  segment_type  segment_type NOT NULL,
  rules         jsonb        NOT NULL,  -- vd / e.g. {"r_score": [4,5], "m_score": [4,5]}
  is_dynamic    boolean      NOT NULL DEFAULT true,
  created_at    timestamptz  NOT NULL DEFAULT now(),
  created_by    uuid         REFERENCES users(id)
);

CREATE TABLE customer_segment_members (
  segment_id   uuid        NOT NULL REFERENCES customer_segments(id) ON DELETE CASCADE,
  partner_id   uuid        NOT NULL REFERENCES partners(id),
  computed_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (segment_id, partner_id)
);

-- Hồ sơ 360° thêm khiếu nại / the 360° view gains complaints
CREATE OR REPLACE VIEW v_customer_360 AS
SELECT p.id AS partner_id, p.code, p.name, p.phone, p.email, p.salesperson_id,
       (SELECT count(*) FROM crm_activities a WHERE a.partner_id = p.id)                         AS activities,
       (SELECT max(coalesce(a.done_at, a.start_at)) FROM crm_activities a WHERE a.partner_id = p.id) AS last_activity_at,
       (SELECT count(*) FROM crm_opportunities o WHERE o.partner_id = p.id AND o.status = 'OPEN')    AS open_opportunities,
       (SELECT count(*) FROM quotations q WHERE q.customer_id = p.id)                               AS quotations,
       (SELECT count(*) FROM sales_orders s WHERE s.customer_id = p.id AND s.status <> 'CANCELLED')  AS orders,
       (SELECT coalesce(sum(i.amount_total_vnd), 0) FROM customer_invoices i
         WHERE i.customer_id = p.id AND i.status IN ('POSTED','PARTIALLY_PAID','PAID'))             AS lifetime_revenue_vnd,
       (SELECT coalesce(sum(CASE WHEN oi.side = 'DEBIT' THEN oi.residual_vnd ELSE -oi.residual_vnd END), 0)
          FROM open_items oi WHERE oi.partner_id = p.id AND oi.account_type = 'RECEIVABLE')         AS receivable_vnd,
       (SELECT count(*) FROM crm_tickets t
         WHERE t.partner_id = p.id AND t.status IN ('NEW','IN_PROGRESS','WAITING_CUSTOMER'))        AS open_tickets
FROM partners p
WHERE p.is_customer;
```

</details>
