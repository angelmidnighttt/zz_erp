# 02 · Quản trị hệ thống / System Administration (SYS) — Giai đoạn 11 / Phase 11

[← Giai đoạn 11 · Nâng cao / Phase 11 · Advanced](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/02-system-administration.md) · [P2](../phase-02-organization-master-data/02-system-administration.md) · [P3](../phase-03-inventory/02-system-administration.md) · [P6](../phase-06-receivables-payables-cash/02-system-administration.md) · [P7](../phase-07-approvals-controls/02-system-administration.md) · [P8](../phase-08-operations-completion/02-system-administration.md) · [P9](../phase-09-accounting-einvoicing/02-system-administration.md) · [P10](../phase-10-expansion/02-system-administration.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Đăng nhập một lần (SSO); nhắc duyệt & chuyển cấp.
- **EN:** Single sign-on; approval reminders & escalation.

## 1. Yêu cầu chức năng / Functional requirements

**Người dùng & xác thực / Users & authentication**

#### FR-SYS-009 · Đăng nhập một lần / Single sign-on
`Could` · `P11`

- **VI:** Hỗ trợ đăng nhập bằng Google Workspace hoặc Microsoft Entra ID (OIDC).
- **EN:** Support sign-in via Google Workspace or Microsoft Entra ID (OIDC).

**Luồng phê duyệt / Approval workflow**

#### FR-SYS-018 · Nhắc duyệt & chuyển cấp / Reminders & escalation
`Could` · `P11`

- **VI:** Gửi nhắc khi chứng từ chờ duyệt quá N giờ; tùy chọn tự chuyển lên cấp trên.
- **EN:** Send reminders when a document has been pending for more than N hours; optionally escalate to the next level.

## 2. Mô hình dữ liệu / Data model

- **VI:** Một người dùng có thể liên kết nhiều danh tính SSO (Google Workspace, Microsoft Entra ID), khóa theo `provider` + `subject` của token OIDC; tài khoản chỉ đăng nhập SSO không có mật khẩu nên `users.password_hash` cho phép trống (`FR-SYS-009`). Nhắc duyệt và chuyển cấp cấu hình theo từng bước của luồng duyệt; job định kỳ so `approval_requests.step_started_at` với ngưỡng giờ để gửi nhắc và ghi hành động `ESCALATE` do hệ thống thực hiện (`FR-SYS-018`).
- **EN:** A user may link several SSO identities (Google Workspace, Microsoft Entra ID), keyed by the OIDC token's `provider` + `subject`; SSO-only accounts have no password, so `users.password_hash` becomes nullable (`FR-SYS-009`). Reminders and escalation are configured per approval-flow step; a scheduled job compares `approval_requests.step_started_at` with the hour thresholds to send reminders and records a system `ESCALATE` action (`FR-SYS-018`).

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: P10

-- ===== SSO (FR-SYS-009) =====
CREATE TYPE sso_provider AS ENUM ('GOOGLE','MICROSOFT');

CREATE TABLE user_identities (
  id             uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid         NOT NULL REFERENCES users(id),
  provider       sso_provider NOT NULL,
  subject        varchar(255) NOT NULL,  -- claim "sub" (Entra: "oid")
  email          varchar(255) NOT NULL,
  linked_at      timestamptz  NOT NULL DEFAULT now(),
  last_login_at  timestamptz,
  UNIQUE (provider, subject)
);
CREATE INDEX ON user_identities (user_id);

ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;  -- tài khoản chỉ dùng SSO / SSO-only accounts

INSERT INTO system_settings (key, value) VALUES
  ('sso.enabled_providers', '[]'),  -- vd / e.g. ["GOOGLE"]
  ('sso.allowed_domains',   '[]')   -- vd / e.g. ["example.vn"]
ON CONFLICT (key) DO NOTHING;

-- ===== Nhắc duyệt & chuyển cấp / Reminders & escalation (FR-SYS-018) =====
CREATE TYPE escalation_target AS ENUM ('NONE','NEXT_STEP','MANAGER');

ALTER TABLE approval_flow_steps
  ADD COLUMN remind_after_hours    smallint CHECK (remind_after_hours > 0),
  ADD COLUMN escalate_after_hours  smallint CHECK (escalate_after_hours > 0),
  ADD COLUMN escalate_to           escalation_target NOT NULL DEFAULT 'NONE';

ALTER TABLE approval_requests
  ADD COLUMN step_started_at   timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN last_reminded_at  timestamptz,
  ADD COLUMN escalated_at      timestamptz;
CREATE INDEX approval_requests_pending_age ON approval_requests (step_started_at) WHERE status = 'PENDING';

ALTER TYPE approval_action_type ADD VALUE 'ESCALATE';
ALTER TABLE approval_actions
  ALTER COLUMN actor_user_id DROP NOT NULL,  -- NULL = hệ thống / system
  ADD CONSTRAINT approval_actions_actor_check CHECK (actor_user_id IS NOT NULL OR action::text = 'ESCALATE');
```

</details>
