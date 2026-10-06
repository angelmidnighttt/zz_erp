# 03 · Dữ liệu danh mục / Master Data (MDM) — Giai đoạn 11 / Phase 11

[← Giai đoạn 11 · Nâng cao / Phase 11 · Advanced](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/03-master-data.md) · [P7](../phase-07-approvals-controls/03-master-data.md) · [P8](../phase-08-operations-completion/03-master-data.md) · [P9](../phase-09-accounting-einvoicing/03-master-data.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Biến thể sản phẩm; mã hàng của đối tác; lấy tỷ giá tự động.
- **EN:** Product variants; partner item codes; automatic exchange rates.

## 1. Yêu cầu chức năng / Functional requirements

**Sản phẩm / Products**

#### FR-MDM-005 · Biến thể sản phẩm / Product variants
`Could` · `P11`

- **VI:** Sản phẩm mẫu có các thuộc tính (kích cỡ, màu sắc…) sinh ra các biến thể, mỗi biến thể có mã, mã vạch, giá và tồn kho riêng.
- **EN:** Product templates with attributes (size, color…) generate variants, each with its own code, barcode, price and stock.

#### FR-MDM-008 · Mã hàng của đối tác / Partner item codes
`Could` · `P11`

- **VI:** Lưu mã và tên hàng mà khách hàng / nhà cung cấp sử dụng để in trên chứng từ gửi cho họ.
- **EN:** Store the item codes and names used by customers / suppliers so they can be printed on documents sent to them.
