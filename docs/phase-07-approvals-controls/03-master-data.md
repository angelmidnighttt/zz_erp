# 03 · Dữ liệu danh mục / Master Data (MDM) — Giai đoạn 7 / Phase 7

[← Giai đoạn 7 · Phê duyệt & kiểm soát / Phase 7 · Approvals & controls](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/03-master-data.md) · [P8](../phase-08-operations-completion/03-master-data.md) · [P9](../phase-09-accounting-einvoicing/03-master-data.md) · [P11](../phase-11-advanced/03-master-data.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Duyệt thay đổi thông tin nhạy cảm và thay đổi bảng giá; giá bán tối thiểu.
- **EN:** Approval of sensitive changes and price list changes; minimum selling price.

## 1. Yêu cầu chức năng / Functional requirements

**Đối tác: khách hàng & nhà cung cấp / Business partners: customers & suppliers**

#### FR-MDM-015 · Duyệt thay đổi thông tin nhạy cảm / Approval of sensitive changes
`Should` · `P7`

- **VI:** Thay đổi tài khoản ngân hàng nhà cung cấp hoặc tăng hạn mức công nợ khách hàng phải được duyệt trước khi có hiệu lực.
- **EN:** Changes to supplier bank accounts or increases to customer credit limits require approval before taking effect.

**Bảng giá / Price lists**

#### FR-MDM-026 · Giá bán tối thiểu / Minimum selling price
`Should` · `P7`

- **VI:** Khai báo giá bán tối thiểu theo sản phẩm (giá cố định hoặc % trên giá vốn); bán dưới mức này phải được duyệt (`BR-SAL-003`).
- **EN:** Define a minimum selling price per product (fixed or % over cost); selling below it requires approval (`BR-SAL-003`).

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-MDM-025 | Thay đổi bảng giá phải được duyệt. | Price list changes require approval. |

## 2. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-MDM-004 | Thay đổi tài khoản ngân hàng nhà cung cấp phải được duyệt và thông báo cho kế toán trưởng. | Supplier bank-account changes require approval and are notified to the chief accountant. | P7 |
