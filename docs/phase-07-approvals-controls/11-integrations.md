# 11 · Tích hợp / Integrations (INT) — Giai đoạn 7 / Phase 7

[← Giai đoạn 7 · Phê duyệt & kiểm soát / Phase 7 · Approvals & controls](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/11-integrations.md) · [P3](../phase-03-inventory/11-integrations.md) · [P9](../phase-09-accounting-einvoicing/11-integrations.md) · [P10](../phase-10-expansion/11-integrations.md) · [P11](../phase-11-advanced/11-integrations.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Gửi email (quên mật khẩu, thông báo); cấu hình tên miền gửi, theo dõi trạng thái gửi; lưu thông tin xác thực bên thứ ba được mã hóa (chuyển từ [P2](../phase-02-organization-master-data/11-integrations.md)).
- **EN:** Email sending (forgot password, notifications); sending domain, delivery tracking; encrypted third-party credentials (moved from [P2](../phase-02-organization-master-data/11-integrations.md)).

## 1. Yêu cầu chức năng / Functional requirements

**Thông báo / Notifications**

#### FR-INT-006 · Email / Email
`Must` · `P7`

- **VI:** Gửi email qua SMTP hoặc dịch vụ email giao dịch; cấu hình tên miền gửi (SPF, DKIM); theo dõi trạng thái gửi và gửi lại khi lỗi.
- **EN:** Send email via SMTP or a transactional email service; configure the sending domain (SPF, DKIM); track delivery status and retry on failure.

**Yêu cầu chung cho tích hợp / General integration requirements**

| Mã / ID | Yêu cầu (VI) | Requirement (EN) | Ưu tiên / Priority |
|---|---|---|---|
| FR-INT-021 | Thông tin xác thực của bên thứ ba được lưu mã hóa, không hiển thị lại sau khi nhập. | Third-party credentials are stored encrypted and never displayed after entry. | Must · P7 |

## 2. Mô hình dữ liệu / Data model

- **VI:** Email được ghi vào hàng đợi `email_messages` trong cùng giao dịch nghiệp vụ (mẫu outbox), sau đó worker gửi và thử lại với giãn cách tăng dần. Thông tin máy chủ SMTP / dịch vụ email lưu ở `integration_credentials` (tạo ở P2, `FR-INT-021`); SPF, DKIM cấu hình ở DNS, không cần bảng.
- **EN:** Emails are queued in `email_messages` inside the business transaction (outbox pattern); a worker then sends them and retries with increasing back-off. SMTP / email service credentials live in `integration_credentials` (created in P2, `FR-INT-021`); SPF and DKIM are DNS settings and need no table.

| Bảng / Table | Mục đích (VI) | Purpose (EN) |
|---|---|---|
| `email_messages` | Hàng đợi và lịch sử gửi email: trạng thái, số lần thử, lỗi cuối, mã thư của nhà cung cấp (`FR-INT-006`). | Email queue and history: status, attempts, last error, provider message ID (`FR-INT-006`). |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 02-system-administration.md (P7)

INSERT INTO system_settings (key, value) VALUES
  ('email.from_address',  '"no-reply@example.vn"'),
  ('email.from_name',     '"ERP"'),
  ('email.max_attempts',  '5')
ON CONFLICT (key) DO NOTHING;

-- QUEUED gồm cả thư chờ gửi lại; FAILED là lỗi sau khi hết số lần thử
-- QUEUED includes messages waiting for a retry; FAILED is final after the last attempt
CREATE TYPE email_status AS ENUM ('QUEUED','SENDING','SENT','DELIVERED','BOUNCED','FAILED');

CREATE TABLE email_messages (
  id                   uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  to_addresses         text[]       NOT NULL,
  cc_addresses         text[],
  bcc_addresses        text[],
  subject              varchar(500) NOT NULL,
  body_html            text         NOT NULL,
  body_text            text,
  template_code        varchar(50), -- mẫu email từ / email templates from P8
  attachment_file_ids  uuid[],      -- stored_files.id
  entity_type          varchar(50),
  entity_id            uuid,
  status               email_status NOT NULL DEFAULT 'QUEUED',
  attempts             smallint     NOT NULL DEFAULT 0,
  next_attempt_at      timestamptz  NOT NULL DEFAULT now(),
  last_error           text,
  provider_message_id  varchar(255),
  sent_at              timestamptz,
  delivered_at         timestamptz,
  created_at           timestamptz  NOT NULL DEFAULT now(),
  created_by           uuid         REFERENCES users(id)
);
CREATE INDEX email_messages_due ON email_messages (next_attempt_at) WHERE status = 'QUEUED';
CREATE INDEX ON email_messages (entity_type, entity_id);

ALTER TABLE notifications
  ADD CONSTRAINT notifications_email_fk FOREIGN KEY (email_message_id) REFERENCES email_messages(id);
```

</details>
