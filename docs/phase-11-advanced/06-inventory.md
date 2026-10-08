# 06 · Kho / Inventory (INV) — Giai đoạn 11 / Phase 11

[← Giai đoạn 11 · Nâng cao / Phase 11 · Advanced](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/06-inventory.md) · [P7](../phase-07-approvals-controls/06-inventory.md) · [P8](../phase-08-operations-completion/06-inventory.md) · [P9](../phase-09-accounting-einvoicing/06-inventory.md) · [P10](../phase-10-expansion/06-inventory.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Soạn hàng & đóng gói; dự phòng giảm giá hàng tồn kho.
- **EN:** Picking & packing; inventory write-down provision.

## 1. Yêu cầu chức năng / Functional requirements

**Nghiệp vụ kho / Stock operations**

#### FR-INV-005 · Soạn hàng & đóng gói / Picking & packing
`Could` · `P11`

- **VI:** Tạo danh sách soạn hàng theo vị trí và thứ tự hết hạn; xác nhận đóng gói, số kiện, trọng lượng.
- **EN:** Generate pick lists ordered by location and expiry; confirm packing, number of parcels and weight.

**Tính giá & hạch toán / Costing & accounting**

#### FR-INV-022 · Dự phòng giảm giá hàng tồn kho / Inventory write-down provision
`Could` · `P11`

- **VI:** Hỗ trợ lập dự phòng giảm giá hàng tồn kho dựa trên giá trị thuần có thể thực hiện được do người dùng nhập.
- **EN:** Support inventory write-down provisions based on user-entered net realizable values.
