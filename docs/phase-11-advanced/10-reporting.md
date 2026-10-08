# 10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT) — Giai đoạn 11 / Phase 11

[← Giai đoạn 11 · Nâng cao / Phase 11 · Advanced](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/10-reporting.md) · [P4](../phase-04-purchasing/10-reporting.md) · [P5](../phase-05-sales/10-reporting.md) · [P6](../phase-06-receivables-payables-cash/10-reporting.md) · [P7](../phase-07-approvals-controls/10-reporting.md) · [P8](../phase-08-operations-completion/10-reporting.md) · [P9](../phase-09-accounting-einvoicing/10-reporting.md) · [P10](../phase-10-expansion/10-reporting.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Gửi báo cáo định kỳ; báo cáo tùy biến; kết nối công cụ BI.
- **EN:** Scheduled reports; custom report builder; BI connectivity.

## 1. Yêu cầu chức năng / Functional requirements

#### FR-RPT-007 · Gửi báo cáo định kỳ / Scheduled reports
`Could` · `P11`

- **VI:** Đặt lịch gửi báo cáo qua email (hằng ngày, tuần, tháng) dưới dạng Excel / PDF.
- **EN:** Schedule reports by email (daily, weekly, monthly) as Excel / PDF.

#### FR-RPT-008 · Báo cáo tùy biến / Custom report builder
`Could` · `P11`

- **VI:** Người dùng nghiệp vụ tự tạo báo cáo bằng cách chọn nguồn dữ liệu, cột, bộ lọc, nhóm và lưu thành mẫu dùng chung.
- **EN:** Business users build reports by choosing data sources, columns, filters and grouping, and save them as shared templates.

#### FR-RPT-009 · Kết nối công cụ BI / BI tool connectivity
`Could` · `P11`

- **VI:** Cung cấp kho dữ liệu hoặc bản sao chỉ đọc để kết nối Power BI, Metabase…, có kiểm soát truy cập.
- **EN:** Provide a data warehouse or read-only replica for Power BI, Metabase…, with access control.

## 2. Danh mục báo cáo chuẩn / Standard report catalog

| Mã / Code | Báo cáo (VI) | Report (EN) | Phân hệ / Module | Giai đoạn / Phase |
|---|---|---|---|---|
| R-SAL-05 | Thực hiện chỉ tiêu doanh số | Sales target achievement | SAL | P11 |
| R-ACC-13 | Ngân sách so với thực tế | Budget vs. actual | ACC | P11 |

## 3. Mô hình dữ liệu / Data model

- **VI:** Lịch gửi báo cáo chạy với quyền của người tạo lịch: job kiểm tra lại quyền Xem và phạm vi dữ liệu của chủ lịch mỗi lần chạy, rồi gửi tệp cho người nhận (`FR-RPT-007`). Báo cáo tùy biến chỉ chọn được nguồn dữ liệu trong danh sách trắng `report_data_sources` (view `rpt_*` / `bi.*`), mỗi nguồn gắn một chức năng phải có quyền Xem; định nghĩa cột, bộ lọc, nhóm lưu dạng JSON (`FR-RPT-008`). Công cụ BI chỉ đọc schema `bi` qua vai trò cơ sở dữ liệu `bi_reader`, trên bản sao chỉ đọc; view trong `bi` không chứa dữ liệu cá nhân và lương (`FR-RPT-009`, `NFR-PRV-001`).
- **EN:** Scheduled reports run with the schedule owner's rights: each run re-checks the owner's View permission and data scope, then sends the file to the recipients (`FR-RPT-007`). Custom reports can only use data sources whitelisted in `report_data_sources` (`rpt_*` / `bi.*` views), each tied to a function requiring View; column, filter and grouping definitions are stored as JSON (`FR-RPT-008`). BI tools only read the `bi` schema through the `bi_reader` database role, on a read-only replica; `bi` views contain no personal or salary data (`FR-RPT-009`, `NFR-PRV-001`).

| Bảng / Table | Mục đích (VI) | Purpose (EN) |
|---|---|---|
| `report_schedules`, `report_schedule_recipients`, `report_runs` | Lịch gửi báo cáo định kỳ và kết quả từng lần chạy. | Report schedules and the result of each run. |
| `report_data_sources`, `custom_reports` | Nguồn dữ liệu được phép và mẫu báo cáo tùy biến dùng chung. | Allowed data sources and shared custom report templates. |
| Schema `bi`, vai trò / role `bi_reader` | Lớp dữ liệu chỉ đọc cho Power BI, Metabase… | Read-only data layer for Power BI, Metabase… |
| `rpt_sales_target_achievement`, `rpt_budget_vs_actual` | R-SAL-05, R-ACC-13. | R-SAL-05, R-ACC-13. |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 04-sales.md, 07-accounting-finance.md (P11)

INSERT INTO app_functions (code, module, name_vi, name_en, supported_actions, sort_order) VALUES
  ('RPT.R-SAL-05', 'RPT', 'Thực hiện chỉ tiêu doanh số', 'Sales target achievement', '{VIEW,PRINT,EXPORT}', 9305),
  ('RPT.R-ACC-13', 'RPT', 'Ngân sách so với thực tế',    'Budget vs. actual',        '{VIEW,PRINT,EXPORT}', 9413),
  ('RPT.CUSTOM',   'RPT', 'Báo cáo tùy biến',            'Custom reports',           '{VIEW,CREATE,EDIT,DELETE,EXPORT}', 9900)
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (role_id, function_code, action)
SELECT rp.role_id, m.report_code, a
FROM (VALUES ('RPT.R-SAL-05', 'SAL.TARGET'), ('RPT.R-ACC-13', 'ACC.BUDGET')) AS m(report_code, source_function)
JOIN role_permissions rp ON rp.function_code = m.source_function AND rp.action = 'VIEW'
CROSS JOIN unnest('{VIEW,PRINT,EXPORT}'::permission_action[]) AS a
ON CONFLICT DO NOTHING;

-- R-SAL-05: doanh số thực hiện lấy từ rpt_sales_lines (P5)
CREATE VIEW rpt_sales_target_achievement AS
WITH actual AS (
  SELECT date_part('year', doc_date)::smallint AS y, date_part('month', doc_date)::smallint AS m,
         salesperson_id, branch_id, sum(revenue_vnd) AS revenue_vnd
  FROM rpt_sales_lines GROUP BY 1, 2, 3, 4
)
SELECT t.period_year, t.period_month, t.employee_id, t.department_id, t.branch_id, t.target_vnd,
       coalesce(sum(a.revenue_vnd), 0)                                         AS actual_vnd,
       round(100 * coalesce(sum(a.revenue_vnd), 0) / NULLIF(t.target_vnd, 0), 2) AS achievement_pct
FROM sales_targets t
LEFT JOIN employees e ON e.department_id = t.department_id
LEFT JOIN actual a
  ON a.y = t.period_year AND a.m = t.period_month
 AND (   a.salesperson_id = t.employee_id
      OR a.salesperson_id = e.id
      OR (t.branch_id IS NOT NULL AND a.branch_id = t.branch_id))
GROUP BY t.id, t.period_year, t.period_month, t.employee_id, t.department_id, t.branch_id, t.target_vnd;

-- R-ACC-13
CREATE VIEW rpt_budget_vs_actual AS
SELECT budget_id, fiscal_year_id, department_id, account_code, expense_category_id, period_month,
       budget_vnd, actual_vnd, committed_vnd, remaining_vnd,
       round(100 * actual_vnd / NULLIF(budget_vnd, 0), 2) AS used_pct
FROM v_budget_consumption;

-- ===== Gửi báo cáo định kỳ / Scheduled reports (FR-RPT-007) =====
CREATE TYPE report_frequency AS ENUM ('DAILY','WEEKLY','MONTHLY');
CREATE TYPE report_format    AS ENUM ('XLSX','PDF');

CREATE TABLE report_schedules (
  id                uuid             PRIMARY KEY DEFAULT gen_random_uuid(),
  name              varchar(150)     NOT NULL,
  report_code       varchar(50)      NOT NULL REFERENCES app_functions(code),  -- 'RPT.R-…'
  custom_report_id  uuid,            -- FK thêm bên dưới / FK added below
  params            jsonb            NOT NULL DEFAULT '{}',  -- bộ lọc; ngày tương đối như "LAST_MONTH"
  format            report_format    NOT NULL DEFAULT 'XLSX',
  frequency         report_frequency NOT NULL,
  run_time          time             NOT NULL DEFAULT '07:00',
  day_of_week       smallint         CHECK (day_of_week BETWEEN 1 AND 7),
  day_of_month      smallint         CHECK (day_of_month BETWEEN 1 AND 31),
  owner_id          uuid             NOT NULL REFERENCES users(id),  -- chạy với quyền của người này / runs with this user's rights
  next_run_at       timestamptz      NOT NULL,
  last_run_at       timestamptz,
  is_active         boolean          NOT NULL DEFAULT true,
  created_at        timestamptz      NOT NULL DEFAULT now(),
  CHECK (frequency <> 'WEEKLY'  OR day_of_week IS NOT NULL),
  CHECK (frequency <> 'MONTHLY' OR day_of_month IS NOT NULL)
);
CREATE INDEX report_schedules_due ON report_schedules (next_run_at) WHERE is_active;

CREATE TABLE report_schedule_recipients (
  schedule_id  uuid         NOT NULL REFERENCES report_schedules(id) ON DELETE CASCADE,
  user_id      uuid         REFERENCES users(id),
  email        varchar(255),
  CHECK (num_nonnulls(user_id, email) = 1)
);
CREATE UNIQUE INDEX ON report_schedule_recipients (schedule_id, user_id, email) NULLS NOT DISTINCT;

CREATE TABLE report_runs (
  id                bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  schedule_id       uuid        NOT NULL REFERENCES report_schedules(id),
  started_at        timestamptz NOT NULL DEFAULT now(),
  finished_at       timestamptz,
  success           boolean,
  file_id           uuid        REFERENCES stored_files(id),
  email_message_id  uuid        REFERENCES email_messages(id),
  error             text
);

-- ===== Báo cáo tùy biến / Custom report builder (FR-RPT-008) =====
CREATE TABLE report_data_sources (
  code           varchar(50)  PRIMARY KEY,
  name_vi        varchar(150) NOT NULL,
  name_en        varchar(150) NOT NULL,
  relation_name  varchar(128) NOT NULL UNIQUE,  -- view được phép / whitelisted view, vd / e.g. 'rpt_sales_lines'
  function_code  varchar(50)  NOT NULL REFERENCES app_functions(code),
  columns        jsonb        NOT NULL,         -- [{name, type, label_vi, label_en, sensitive_field_code}]
  is_active      boolean      NOT NULL DEFAULT true
);

CREATE TABLE custom_reports (
  id                uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  name              varchar(150) NOT NULL,
  data_source_code  varchar(50)  NOT NULL REFERENCES report_data_sources(code),
  definition        jsonb        NOT NULL,  -- {columns, filters, group_by, sort, totals}
  is_shared         boolean      NOT NULL DEFAULT false,
  owner_id          uuid         NOT NULL REFERENCES users(id),
  version           integer      NOT NULL DEFAULT 1,
  created_at        timestamptz  NOT NULL DEFAULT now(),
  updated_at        timestamptz  NOT NULL DEFAULT now()
);

ALTER TABLE report_schedules
  ADD CONSTRAINT report_schedules_custom_report_fk FOREIGN KEY (custom_report_id) REFERENCES custom_reports(id);

INSERT INTO report_data_sources (code, name_vi, name_en, relation_name, function_code, columns) VALUES
  ('SALES_LINES',    'Doanh số',            'Sales lines',          'rpt_sales_lines',          'RPT.R-SAL-01', '[]'),
  ('OPEN_SO',        'Đơn bán chưa giao',   'Open sales orders',    'rpt_open_sales_orders',    'RPT.R-SAL-02', '[]'),
  ('PURCHASE_LINES', 'Giá trị mua',         'Purchase lines',       'rpt_purchase_lines',       'RPT.R-PUR-01', '[]'),
  ('STOCK_CARD',     'Thẻ kho',             'Stock card',           'rpt_stock_card',           'RPT.R-INV-01', '[]'),
  ('GENERAL_JOURNAL','Sổ nhật ký chung',    'General journal',      'rpt_general_journal',      'RPT.R-ACC-01', '[]');

-- ===== Kết nối BI / BI connectivity (FR-RPT-009) =====
-- Chạy trên bản sao chỉ đọc; tạo LOGIN riêng cho từng công cụ BI và GRANT bi_reader cho login đó
-- Run on the read-only replica; create a separate LOGIN per BI tool and GRANT bi_reader to it
CREATE SCHEMA bi;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'bi_reader') THEN
    CREATE ROLE bi_reader NOLOGIN;  -- vai trò cấp cluster / cluster-wide role
  END IF;
END $$;
GRANT USAGE ON SCHEMA bi TO bi_reader;
ALTER DEFAULT PRIVILEGES IN SCHEMA bi GRANT SELECT ON TABLES TO bi_reader;

CREATE VIEW bi.sales_lines AS
  SELECT doc_date, line_kind, branch_id, customer_id, salesperson_id, product_id, base_qty, revenue_vnd
  FROM public.rpt_sales_lines;
CREATE VIEW bi.purchase_lines AS
  SELECT accounting_date, branch_id, supplier_id, product_id, qty, amount_untaxed_vnd
  FROM public.rpt_purchase_lines;
CREATE VIEW bi.stock_balances AS
  SELECT warehouse_id, product_id, lot_id, on_hand_qty, reserved_qty FROM public.stock_balances;
CREATE VIEW bi.products AS
  SELECT id, code, name, name_en, product_type, category_id, base_uom_id, is_active FROM public.products;
CREATE VIEW bi.customers AS
  SELECT id, code, name, partner_kind, customer_group_id, salesperson_id, billing_province_code
  FROM public.partners WHERE is_customer;  -- không có MST, điện thoại, email / no tax ID, phone, email
CREATE VIEW bi.pnl_by_dimension AS
  SELECT * FROM public.rpt_pnl_by_dimension;
GRANT SELECT ON ALL TABLES IN SCHEMA bi TO bi_reader;
```

</details>
