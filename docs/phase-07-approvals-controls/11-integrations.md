# 11 · Tích hợp / Integrations (INT) — Giai đoạn 7 / Phase 7

[← Giai đoạn 7 · Phê duyệt & kiểm soát / Phase 7 · Approvals & controls](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/11-integrations.md) · [P9](../phase-09-accounting-einvoicing/11-integrations.md) · [P10](../phase-10-expansion/11-integrations.md) · [P11](../phase-11-advanced/11-integrations.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Gửi email (quên mật khẩu, thông báo); cấu hình tên miền gửi, theo dõi trạng thái gửi.
- **EN:** Email sending (forgot password, notifications); sending domain, delivery tracking.

## 1. Yêu cầu chức năng / Functional requirements

**Thông báo / Notifications**

#### FR-INT-006 · Email / Email
`Must` · `P7`

- **VI:** Gửi email qua SMTP hoặc dịch vụ email giao dịch; cấu hình tên miền gửi (SPF, DKIM); theo dõi trạng thái gửi và gửi lại khi lỗi.
- **EN:** Send email via SMTP or a transactional email service; configure the sending domain (SPF, DKIM); track delivery status and retry on failure.
