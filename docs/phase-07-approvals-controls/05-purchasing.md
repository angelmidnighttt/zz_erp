# 05 · Mua hàng / Purchasing (PUR) — Giai đoạn 7 / Phase 7

[← Giai đoạn 7 · Phê duyệt & kiểm soát / Phase 7 · Approvals & controls](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P4](../phase-04-purchasing/05-purchasing.md) · [P8](../phase-08-operations-completion/05-purchasing.md) · [P9](../phase-09-accounting-einvoicing/05-purchasing.md) · [P10](../phase-10-expansion/05-purchasing.md) · [P11](../phase-11-advanced/05-purchasing.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Duyệt đơn mua theo ngưỡng.
- **EN:** Threshold-based PO approval.

## 1. Yêu cầu chức năng / Functional requirements

**Đơn mua hàng / Purchase orders**

#### FR-PUR-009 · Duyệt đơn mua theo ngưỡng / PO approval by threshold
`Must` · `P7`

- **VI:** Đơn mua được duyệt theo ngưỡng giá trị và nhóm hàng; đơn chưa duyệt không được gửi nhà cung cấp và không được nhận hàng.
- **EN:** POs are approved by value thresholds and product category; unapproved POs cannot be sent to suppliers or received.

## 2. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-PUR-001 | Đơn mua vượt ngưỡng giá trị cấu hình phải được duyệt trước khi gửi nhà cung cấp. | POs above the configured threshold must be approved before being sent. | P7 |
| BR-PUR-005 | Người tạo đơn mua không được tự duyệt đơn đó (`BR-ROL-001`). | The PO creator cannot approve it (`BR-ROL-001`). | P7 |
