# 02 · Quản trị hệ thống / System Administration (SYS) — Giai đoạn 11 / Phase 11

[← Giai đoạn 11 · Nâng cao / Phase 11 · Advanced](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/02-system-administration.md) · [P2](../phase-02-organization-master-data/02-system-administration.md) · [P3](../phase-03-inventory/02-system-administration.md) · [P7](../phase-07-approvals-controls/02-system-administration.md) · [P8](../phase-08-operations-completion/02-system-administration.md) · [P9](../phase-09-accounting-einvoicing/02-system-administration.md) · [P10](../phase-10-expansion/02-system-administration.md)

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
