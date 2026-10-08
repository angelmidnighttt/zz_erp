# 01 · Vai trò & Phân quyền / Roles & Permissions — Giai đoạn 3 / Phase 3

[← Giai đoạn 3 · Kho cơ bản / Phase 3 · Basic inventory](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/01-roles-permissions.md) · [P2](../phase-02-organization-master-data/01-roles-permissions.md) · [P4](../phase-04-purchasing/01-roles-permissions.md) · [P5](../phase-05-sales/01-roles-permissions.md) · [P6](../phase-06-receivables-payables-cash/01-roles-permissions.md) · [P7](../phase-07-approvals-controls/01-roles-permissions.md) · [P8](../phase-08-operations-completion/01-roles-permissions.md) · [P9](../phase-09-accounting-einvoicing/01-roles-permissions.md) · [P10](../phase-10-expansion/01-roles-permissions.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Bổ sung các chức năng `INV.STOCK_MOVE`, `INV.STOCK_COUNT` vào danh mục `app_functions` và các dòng quyền mặc định tương ứng.
- **EN:** Add the functions `INV.STOCK_MOVE`, `INV.STOCK_COUNT` to the `app_functions` catalog together with their default permission rows.

## 1. Ma trận phân quyền mặc định bổ sung / Additional default permission matrix

Ký hiệu / Legend: `V` Xem / View · `C` Tạo / Create · `E` Sửa / Edit · `D` Xóa / Delete · `A` Duyệt / Approve · `—` Không / None

| Chức năng / Function | Mã / Code | ADM | CEO | SAL | SLM | PUR | PUM | WH | WHM | ACC | CAC | CSH | AUD |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Nhập / xuất / chuyển kho / Receipts, issues, transfers | `INV.STOCK_MOVE` | — | V | — | — | V | V | VCE | VCEDA | V | V | — | V |
| Kiểm kê / Stock count | `INV.STOCK_COUNT` | — | V | — | — | — | — | VCE | VCEA | V | VA | — | V |

## 2. Ghi chú / Notes

- **VI:** Ma trận là cấu hình mặc định khi khởi tạo; quản trị viên có thể thay đổi. Ô có `A` chỉ có tác dụng từ khi có luồng duyệt (P7).
- **EN:** The matrix is the initial default configuration; administrators can change it. Cells with `A` only take effect once approval flows exist (P7).

## 3. Quy tắc nghiệp vụ / Business rules

#### BR-ROL-004 · Điều chỉnh tồn kho cần duyệt / Stock adjustments require approval
`Must` · `P3`

- **VI:** Thủ kho không được điều chỉnh tồn kho (thừa/thiếu) nếu không qua phê duyệt của quản lý kho hoặc kế toán trưởng.
- **EN:** Warehouse keepers cannot post stock adjustments (surplus/shortage) without approval from the warehouse manager or chief accountant.

| Quy tắc / Rule | Cơ chế (VI) | Mechanism (EN) |
|---|---|---|
| BR-ROL-004 | Dữ liệu khởi tạo: `WH` không có `APPROVE` trên `INV.STOCK_COUNT`; điều chỉnh tồn kho chỉ ghi sổ sau khi được duyệt. | Seed data: `WH` has no `APPROVE` on `INV.STOCK_COUNT`; stock adjustments post only after approval. |

- **VI:** Từ P3 đến P6 chưa có luồng duyệt: "duyệt" ở đây là người có quyền `APPROVE` trên Kiểm kê bấm xác nhận (xem [02 · Quản trị hệ thống](02-system-administration.md)).
- **EN:** From P3 to P6 there are no approval flows: "approval" here means a user holding `APPROVE` on stock counts confirms the adjustment (see [02 · System administration](02-system-administration.md)).

## 4. Mô hình dữ liệu / Data model

- **VI:** Không đổi lược đồ; chỉ nạp chức năng và ma trận mục 1 bằng hàm `perm_letters` ([P2](../phase-02-organization-master-data/01-roles-permissions.md)). `BR-ROL-004` được đáp ứng vì `WH` không có dòng `APPROVE` trên `INV.STOCK_COUNT`. Từ P3, khối seed của `01-roles-permissions.md` chạy đầu tiên trong giai đoạn vì các bảng `document_types` của phân hệ tham chiếu tới `app_functions`.
- **EN:** No schema change; only the section 1 functions and matrix are seeded with `perm_letters` ([P2](../phase-02-organization-master-data/01-roles-permissions.md)). `BR-ROL-004` holds because `WH` has no `APPROVE` row on `INV.STOCK_COUNT`. From P3 on, the `01-roles-permissions.md` seed runs first in each phase because module `document_types` rows reference `app_functions`.

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: P2

INSERT INTO app_functions (code, module, name_vi, name_en, supported_actions, sort_order) VALUES
  ('INV.STOCK_MOVE',  'INV', 'Nhập / xuất / chuyển kho', 'Receipts, issues, transfers', '{VIEW,CREATE,EDIT,DELETE,APPROVE}', 310),
  ('INV.STOCK_COUNT', 'INV', 'Kiểm kê',                  'Stock count',                 '{VIEW,CREATE,EDIT,DELETE,APPROVE}', 320)
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (role_id, function_code, action)
SELECT r.id, m.function_code, a
FROM (VALUES
  ('INV.STOCK_MOVE',  'CEO', 'V'),   ('INV.STOCK_MOVE',  'PUR', 'V'),    ('INV.STOCK_MOVE',  'PUM', 'V'),
  ('INV.STOCK_MOVE',  'WH',  'VCE'), ('INV.STOCK_MOVE',  'WHM', 'VCEDA'), ('INV.STOCK_MOVE', 'ACC', 'V'),
  ('INV.STOCK_MOVE',  'CAC', 'V'),   ('INV.STOCK_MOVE',  'AUD', 'V'),
  ('INV.STOCK_COUNT', 'CEO', 'V'),   ('INV.STOCK_COUNT', 'WH',  'VCE'),  ('INV.STOCK_COUNT', 'WHM', 'VCEA'),
  ('INV.STOCK_COUNT', 'ACC', 'V'),   ('INV.STOCK_COUNT', 'CAC', 'VA'),   ('INV.STOCK_COUNT', 'AUD', 'V')
) AS m(function_code, role_code, letters)
JOIN roles r ON r.code = m.role_code
CROSS JOIN LATERAL perm_letters(m.letters) AS a
ON CONFLICT DO NOTHING;
```

</details>
