# 04 · Bán hàng / Sales (SAL) — Giai đoạn 7 / Phase 7

[← Giai đoạn 7 · Phê duyệt & kiểm soát / Phase 7 · Approvals & controls](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P5](../phase-05-sales/04-sales.md) · [P8](../phase-08-operations-completion/04-sales.md) · [P9](../phase-09-accounting-einvoicing/04-sales.md) · [P10](../phase-10-expansion/04-sales.md) · [P11](../phase-11-advanced/04-sales.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Kiểm tra hạn mức công nợ; duyệt đơn theo điều kiện; ẩn giá vốn, lãi gộp bằng quyền theo trường.
- **EN:** Credit limit check; conditional order approval; hiding cost and gross margin through field-level permissions.

## 1. Yêu cầu chức năng / Functional requirements

**Đơn bán hàng / Sales orders**

#### FR-SAL-012 · Kiểm tra hạn mức công nợ / Credit limit check
`Must` · `P7`

- **VI:** Khi xác nhận đơn, hệ thống tính: công nợ hiện tại + giá trị đơn đã xác nhận chưa xuất hóa đơn + giá trị đơn này. Nếu vượt hạn mức, hoặc khách hàng có nợ quá hạn quá N ngày, hệ thống chặn hoặc chuyển đơn sang "Chờ duyệt" (cấu hình theo nhóm khách hàng).
- **EN:** On confirmation the system computes: current receivable + confirmed but uninvoiced orders + this order. If this exceeds the credit limit, or the customer has debt overdue by more than N days, the order is blocked or sent to "Pending approval" (configurable per customer group).

**Tiêu chí chấp nhận / Acceptance criteria**

- **AC-1 — VI:** Khách hàng có hạn mức 100.000.000 ₫, công nợ hiện tại 80.000.000 ₫. Xác nhận đơn 30.000.000 ₫ → đơn chuyển "Chờ duyệt" với lý do "Vượt hạn mức công nợ".
  **EN:** Customer credit limit ₫100,000,000, current receivable ₫80,000,000. Confirming a ₫30,000,000 order → order goes to "Pending approval" with reason "Credit limit exceeded".
- **AC-2 — VI:** Cùng khách hàng, đơn 15.000.000 ₫ và không có nợ quá hạn → đơn được xác nhận ngay.
  **EN:** Same customer, ₫15,000,000 order and no overdue debt → order is confirmed immediately.

#### FR-SAL-013 · Duyệt đơn hàng / Order approval
`Must` · `P7`

- **VI:** Đơn hàng đi qua luồng duyệt (`FR-SYS-015`) khi: chiết khấu vượt hạn mức của người lập, giá bán thấp hơn giá tối thiểu, vượt hạn mức công nợ, hoặc giá trị đơn vượt ngưỡng cấu hình.
- **EN:** Orders go through the approval flow (`FR-SYS-015`) when: the discount exceeds the creator's limit, price is below the minimum price, the credit limit is exceeded, or order value exceeds a configured threshold.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-SAL-030 | Ẩn giá vốn, lãi gộp bằng quyền theo trường (`FR-SYS-013`). | Hide cost and gross margin through field-level permissions (`FR-SYS-013`). |

## 2. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-SAL-003 | Giá bán dưới giá tối thiểu hoặc chiết khấu vượt hạn mức của người lập bắt buộc phải được duyệt. | Prices below the minimum or discounts above the creator's limit require approval. | P7 |
