# 11 · Tích hợp / Integrations (INT) — Giai đoạn 7 / Phase 7

[← Giai đoạn 7 · Phê duyệt & kiểm soát / Phase 7 · Approvals & controls](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/11-integrations.md) · [P9](../phase-09-accounting-einvoicing/11-integrations.md) · [P10](../phase-10-expansion/11-integrations.md) · [P11](../phase-11-advanced/11-integrations.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Cấu hình tên miền gửi email, theo dõi trạng thái gửi (cho thông báo).
- **EN:** Email sending domain, delivery tracking (for notifications).

## 1. Yêu cầu chức năng / Functional requirements

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-INT-006 | Cấu hình tên miền gửi (SPF, DKIM); theo dõi trạng thái gửi và gửi lại khi lỗi. | Configure the sending domain (SPF, DKIM); track delivery status and retry on failure. |
