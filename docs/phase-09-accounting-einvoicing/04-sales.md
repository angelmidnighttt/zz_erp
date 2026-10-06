# 04 · Bán hàng / Sales (SAL) — Giai đoạn 9 / Phase 9

[← Giai đoạn 9 · Kế toán đầy đủ & HĐĐT / Phase 9 · Full accounting & e-invoicing](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P5](../phase-05-sales/04-sales.md) · [P7](../phase-07-approvals-controls/04-sales.md) · [P8](../phase-08-operations-completion/04-sales.md) · [P10](../phase-10-expansion/04-sales.md) · [P11](../phase-11-advanced/04-sales.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Phát hành HĐĐT từ ERP, hóa đơn điều chỉnh / thay thế; giảm giá sau bán.
- **EN:** Issuing e-invoices from the ERP, adjustment / replacement invoices; post-sale price reductions.

## 1. Yêu cầu chức năng / Functional requirements

**Hóa đơn / Invoicing**

#### FR-SAL-023 · Phát hành hóa đơn điện tử / Issue e-invoice
`Must` · `P9`

- **VI:** Từ hóa đơn bán hàng, phát hành hóa đơn điện tử qua nhà cung cấp HĐĐT (`FR-INT-001`); nhận về ký hiệu, số hóa đơn, mã của cơ quan thuế (nếu có) và trạng thái; tự động gửi email hóa đơn cho khách hàng.
- **EN:** Issue an e-invoice from the customer invoice via the e-invoice provider (`FR-INT-001`); receive the series, invoice number, tax authority code (if any) and status; email the invoice to the customer automatically.

**Trả hàng & điều chỉnh / Returns & adjustments**

#### FR-SAL-025 · Hóa đơn điều chỉnh / thay thế / Adjustment or replacement invoice
`Must` · `P9`

- **VI:** Lập hóa đơn điều chỉnh (tăng/giảm) hoặc hóa đơn thay thế theo quy định về hóa đơn điện tử, liên kết với hóa đơn gốc; cập nhật công nợ và doanh thu tương ứng.
- **EN:** Issue adjustment (increase/decrease) or replacement invoices per e-invoice regulations, linked to the original invoice; update receivables and revenue accordingly.

#### FR-SAL-026 · Giảm giá sau bán / Post-sale price reduction
`Should` · `P9`

- **VI:** Ghi nhận giảm giá hàng bán hoặc chiết khấu thương mại theo doanh số sau khi đã xuất hóa đơn, không làm thay đổi tồn kho.
- **EN:** Record price reductions or volume rebates after invoicing without affecting stock.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-SAL-021 | Phát hành hóa đơn điện tử trực tiếp từ ERP (`FR-SAL-023`). | Issue e-invoices directly from the ERP (`FR-SAL-023`). |
