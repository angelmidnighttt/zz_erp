# 01 · Vai trò & Phân quyền / Roles & Permissions — Giai đoạn 4 / Phase 4

[← Giai đoạn 4 · Mua hàng cơ bản / Phase 4 · Basic purchasing](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/01-roles-permissions.md) · [P2](../phase-02-organization-master-data/01-roles-permissions.md) · [P3](../phase-03-inventory/01-roles-permissions.md) · [P5](../phase-05-sales/01-roles-permissions.md) · [P6](../phase-06-receivables-payables-cash/01-roles-permissions.md) · [P7](../phase-07-approvals-controls/01-roles-permissions.md) · [P8](../phase-08-operations-completion/01-roles-permissions.md) · [P9](../phase-09-accounting-einvoicing/01-roles-permissions.md) · [P10](../phase-10-expansion/01-roles-permissions.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Bổ sung các chức năng `PUR.PURCHASE_ORDER`, `ACC.VENDOR_BILL` vào danh mục `app_functions` và các dòng quyền mặc định tương ứng.
- **EN:** Add the functions `PUR.PURCHASE_ORDER`, `ACC.VENDOR_BILL` to the `app_functions` catalog together with their default permission rows.

## 1. Ma trận phân quyền mặc định bổ sung / Additional default permission matrix

Ký hiệu / Legend: `V` Xem / View · `C` Tạo / Create · `E` Sửa / Edit · `D` Xóa / Delete · `A` Duyệt / Approve · `—` Không / None

| Chức năng / Function | Mã / Code | ADM | CEO | SAL | SLM | PUR | PUM | WH | WHM | ACC | CAC | CSH | AUD |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Đơn mua hàng / Purchase orders | `PUR.PURCHASE_ORDER` | — | VA | — | — | VCE | VCEDA | V | V | V | V | — | V |
| Hóa đơn mua / Vendor bills | `ACC.VENDOR_BILL` | — | V | — | — | V | V | — | — | VCE | VCEDA | — | V |

## 2. Ghi chú / Notes

- **VI:** Ma trận là cấu hình mặc định khi khởi tạo; quản trị viên có thể thay đổi. Ô có `A` chỉ có tác dụng từ khi có luồng duyệt (P7).
- **EN:** The matrix is the initial default configuration; administrators can change it. Cells with `A` only take effect once approval flows exist (P7).

## 3. Mô hình dữ liệu / Data model

- **VI:** Không đổi lược đồ; nạp chức năng và ma trận mục 1. Bổ sung chức năng `INV.RECEIPT_WITHOUT_PO` (chỉ hành động Tạo) cho quyền "nhận hàng không đơn" của `BR-PUR-002`; tài liệu chưa quy định vai trò mặc định nên seed không cấp cho ai, quản trị viên tự gán.
- **EN:** No schema change; the section 1 functions and matrix are seeded. A `INV.RECEIPT_WITHOUT_PO` function (Create only) is added for the "receive without PO" right of `BR-PUR-002`; the docs define no default role for it, so the seed grants it to nobody and administrators assign it.

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: P3

INSERT INTO app_functions (code, module, name_vi, name_en, supported_actions, sort_order) VALUES
  ('PUR.PURCHASE_ORDER',     'PUR', 'Đơn mua hàng',           'Purchase orders',          '{VIEW,CREATE,EDIT,DELETE,APPROVE}', 410),
  ('ACC.VENDOR_BILL',        'ACC', 'Hóa đơn mua',            'Vendor bills',             '{VIEW,CREATE,EDIT,DELETE,APPROVE}', 710),
  ('INV.RECEIPT_WITHOUT_PO', 'INV', 'Nhận hàng không đơn mua', 'Receive without a PO',    '{CREATE}',                          315)
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (role_id, function_code, action)
SELECT r.id, m.function_code, a
FROM (VALUES
  ('PUR.PURCHASE_ORDER', 'CEO', 'VA'),  ('PUR.PURCHASE_ORDER', 'PUR', 'VCE'),  ('PUR.PURCHASE_ORDER', 'PUM', 'VCEDA'),
  ('PUR.PURCHASE_ORDER', 'WH',  'V'),   ('PUR.PURCHASE_ORDER', 'WHM', 'V'),    ('PUR.PURCHASE_ORDER', 'ACC', 'V'),
  ('PUR.PURCHASE_ORDER', 'CAC', 'V'),   ('PUR.PURCHASE_ORDER', 'AUD', 'V'),
  ('ACC.VENDOR_BILL',    'CEO', 'V'),   ('ACC.VENDOR_BILL',    'PUR', 'V'),    ('ACC.VENDOR_BILL',    'PUM', 'V'),
  ('ACC.VENDOR_BILL',    'ACC', 'VCE'), ('ACC.VENDOR_BILL',    'CAC', 'VCEDA'), ('ACC.VENDOR_BILL',   'AUD', 'V')
) AS m(function_code, role_code, letters)
JOIN roles r ON r.code = m.role_code
CROSS JOIN LATERAL perm_letters(m.letters) AS a
ON CONFLICT DO NOTHING;
```

</details>
