# 06 · Kho / Inventory (INV) — Giai đoạn 7 / Phase 7

[← Giai đoạn 7 · Phê duyệt & kiểm soát / Phase 7 · Approvals & controls](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/06-inventory.md) · [P8](../phase-08-operations-completion/06-inventory.md) · [P9](../phase-09-accounting-einvoicing/06-inventory.md) · [P10](../phase-10-expansion/06-inventory.md) · [P11](../phase-11-advanced/06-inventory.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Người dùng chỉ thao tác trên kho được gán; duyệt điều chỉnh kiểm kê theo ngưỡng giá trị.
- **EN:** Users operate only on assigned warehouses; count adjustment approval by value threshold.

## 1. Yêu cầu chức năng / Functional requirements

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-INV-001 | Người dùng chỉ thao tác được trên các kho được gán (`FR-SYS-012`). | Users can only operate on assigned warehouses (`FR-SYS-012`). |
| FR-INV-015 | Duyệt điều chỉnh kiểm kê theo ngưỡng giá trị qua luồng duyệt (`BR-INV-006`, `FR-SYS-015`). | Count adjustments are approved by value threshold through the approval flow (`BR-INV-006`, `FR-SYS-015`). |

## 2. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-INV-006 | Điều chỉnh tồn kho sau kiểm kê phải được quản lý kho và kế toán trưởng duyệt (theo ngưỡng giá trị). | Count adjustments require warehouse manager and chief accountant approval (by value threshold). | P7 |
