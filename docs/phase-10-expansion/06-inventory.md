# 06 · Kho / Inventory (INV) — Giai đoạn 10 / Phase 10

[← Giai đoạn 10 · Mở rộng / Phase 10 · Expansion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/06-inventory.md) · [P7](../phase-07-approvals-controls/06-inventory.md) · [P8](../phase-08-operations-completion/06-inventory.md) · [P9](../phase-09-accounting-einvoicing/06-inventory.md) · [P11](../phase-11-advanced/06-inventory.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Quét mã vạch.
- **EN:** Barcode scanning.

## 1. Yêu cầu chức năng / Functional requirements

**Nghiệp vụ kho / Stock operations**

#### FR-INV-007 · Quét mã vạch / Barcode scanning
`Should` · `P10`

- **VI:** Nhập, xuất, kiểm kê bằng máy quét mã vạch hoặc camera điện thoại; hỗ trợ mã vạch sản phẩm, lô và vị trí.
- **EN:** Receive, issue and count using barcode scanners or phone cameras; support product, lot and location barcodes.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-INV-014 | Ghi nhận số lượng bằng quét mã vạch (`FR-INV-007`). | Record quantities by barcode scanning (`FR-INV-007`). |
