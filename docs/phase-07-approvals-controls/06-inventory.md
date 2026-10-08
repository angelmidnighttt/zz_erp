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

## 3. Mô hình dữ liệu / Data model

- **VI:** Kho được gán lấy từ `user_access_grants` (`object_type = 'WAREHOUSE'`) qua `user_access_ids` ([01 · Vai trò & phân quyền](01-roles-permissions.md)); service lọc `stock_documents.warehouse_id` / `dest_warehouse_id` theo danh sách này khi phạm vi là `ASSIGNED`. Kiểm kê chuyển sang luồng duyệt; tổng giá trị chênh lệch được tính lúc gửi duyệt và dùng làm số tiền chọn luồng (`BR-INV-006`).
- **EN:** Assigned warehouses come from `user_access_grants` (`object_type = 'WAREHOUSE'`) via `user_access_ids` ([01 · Roles & permissions](01-roles-permissions.md)); the service filters `stock_documents.warehouse_id` / `dest_warehouse_id` against that list when the scope is `ASSIGNED`. Stock counts move to approval flows; the total variance value is computed on submission and used as the amount for flow selection (`BR-INV-006`).

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 02-system-administration.md (P7)

UPDATE document_types SET approval_mode = 'FLOW' WHERE code = 'SC';

-- BR-INV-006: Σ |chênh lệch| × giá vốn, VND / Σ |variance| × cost, VND
ALTER TABLE stock_counts ADD COLUMN diff_value_vnd dm_amount;
```

</details>
