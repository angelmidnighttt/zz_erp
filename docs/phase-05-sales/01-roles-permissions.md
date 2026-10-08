# 01 · Vai trò & Phân quyền / Roles & Permissions — Giai đoạn 5 / Phase 5

[← Giai đoạn 5 · Bán hàng cơ bản / Phase 5 · Basic sales](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/01-roles-permissions.md) · [P2](../phase-02-organization-master-data/01-roles-permissions.md) · [P3](../phase-03-inventory/01-roles-permissions.md) · [P4](../phase-04-purchasing/01-roles-permissions.md) · [P6](../phase-06-receivables-payables-cash/01-roles-permissions.md) · [P7](../phase-07-approvals-controls/01-roles-permissions.md) · [P8](../phase-08-operations-completion/01-roles-permissions.md) · [P9](../phase-09-accounting-einvoicing/01-roles-permissions.md) · [P10](../phase-10-expansion/01-roles-permissions.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Bổ sung các chức năng `SAL.QUOTATION`, `SAL.SALES_ORDER`, `SAL.SALES_RETURN`, `ACC.CUSTOMER_INVOICE` vào danh mục `app_functions` và các dòng quyền mặc định tương ứng.
- **EN:** Add the functions `SAL.QUOTATION`, `SAL.SALES_ORDER`, `SAL.SALES_RETURN`, `ACC.CUSTOMER_INVOICE` to the `app_functions` catalog together with their default permission rows.

## 1. Ma trận phân quyền mặc định bổ sung / Additional default permission matrix

Ký hiệu / Legend: `V` Xem / View · `C` Tạo / Create · `E` Sửa / Edit · `D` Xóa / Delete · `A` Duyệt / Approve · `—` Không / None

| Chức năng / Function | Mã / Code | ADM | CEO | SAL | SLM | PUR | PUM | WH | WHM | ACC | CAC | CSH | AUD |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Báo giá / Quotations | `SAL.QUOTATION` | — | V | VCE | VCEDA | — | — | — | — | — | — | — | V |
| Đơn bán hàng / Sales orders | `SAL.SALES_ORDER` | — | VA | VCE | VCEDA | — | — | V | V | V | V | — | V |
| Trả hàng bán / Sales returns | `SAL.SALES_RETURN` | — | V | VC | VCEA | — | — | V | V | V | VA | — | V |
| Hóa đơn bán / Customer invoices | `ACC.CUSTOMER_INVOICE` | — | V | V | V | — | — | — | — | VCE | VCEDA | — | V |

## 2. Ghi chú / Notes

- **VI:** Ma trận là cấu hình mặc định khi khởi tạo; quản trị viên có thể thay đổi. Ô có `A` chỉ có tác dụng từ khi có luồng duyệt (P7).
- **EN:** The matrix is the initial default configuration; administrators can change it. Cells with `A` only take effect once approval flows exist (P7).

## 3. Mô hình dữ liệu / Data model

- **VI:** Không đổi lược đồ; nạp chức năng và ma trận mục 1. Bổ sung hai chức năng cho các quyền riêng mà [04 · Bán hàng](04-sales.md) yêu cầu nhưng chưa có trong ma trận: `SAL.PRICE_OVERRIDE` (sửa giá tự động, `FR-SAL-007`) và `SAL.ORDER_AMEND` (sửa đơn đã xác nhận, `FR-SAL-016`); seed không cấp mặc định, quản trị viên tự gán.
- **EN:** No schema change; the section 1 functions and matrix are seeded. Two functions are added for the specific rights [04 · Sales](04-sales.md) requires but the matrix does not list: `SAL.PRICE_OVERRIDE` (override automatic prices, `FR-SAL-007`) and `SAL.ORDER_AMEND` (edit confirmed orders, `FR-SAL-016`); the seed grants them to nobody and administrators assign them.

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: P4

INSERT INTO app_functions (code, module, name_vi, name_en, supported_actions, sort_order) VALUES
  ('SAL.QUOTATION',        'SAL', 'Báo giá',                'Quotations',             '{VIEW,CREATE,EDIT,DELETE,APPROVE}', 510),
  ('SAL.SALES_ORDER',      'SAL', 'Đơn bán hàng',           'Sales orders',           '{VIEW,CREATE,EDIT,DELETE,APPROVE}', 520),
  ('SAL.SALES_RETURN',     'SAL', 'Trả hàng bán',           'Sales returns',          '{VIEW,CREATE,EDIT,DELETE,APPROVE}', 530),
  ('ACC.CUSTOMER_INVOICE', 'ACC', 'Hóa đơn bán',            'Customer invoices',      '{VIEW,CREATE,EDIT,DELETE,APPROVE}', 720),
  ('SAL.PRICE_OVERRIDE',   'SAL', 'Sửa giá bán tự động',    'Override sales prices',  '{EDIT}',                            521),
  ('SAL.ORDER_AMEND',      'SAL', 'Sửa đơn đã xác nhận',    'Amend confirmed orders', '{EDIT}',                            522)
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (role_id, function_code, action)
SELECT r.id, m.function_code, a
FROM (VALUES
  ('SAL.QUOTATION',        'CEO', 'V'),   ('SAL.QUOTATION',        'SAL', 'VCE'),  ('SAL.QUOTATION',        'SLM', 'VCEDA'),
  ('SAL.QUOTATION',        'AUD', 'V'),
  ('SAL.SALES_ORDER',      'CEO', 'VA'),  ('SAL.SALES_ORDER',      'SAL', 'VCE'),  ('SAL.SALES_ORDER',      'SLM', 'VCEDA'),
  ('SAL.SALES_ORDER',      'WH',  'V'),   ('SAL.SALES_ORDER',      'WHM', 'V'),    ('SAL.SALES_ORDER',      'ACC', 'V'),
  ('SAL.SALES_ORDER',      'CAC', 'V'),   ('SAL.SALES_ORDER',      'AUD', 'V'),
  ('SAL.SALES_RETURN',     'CEO', 'V'),   ('SAL.SALES_RETURN',     'SAL', 'VC'),   ('SAL.SALES_RETURN',     'SLM', 'VCEA'),
  ('SAL.SALES_RETURN',     'WH',  'V'),   ('SAL.SALES_RETURN',     'WHM', 'V'),    ('SAL.SALES_RETURN',     'ACC', 'V'),
  ('SAL.SALES_RETURN',     'CAC', 'VA'),  ('SAL.SALES_RETURN',     'AUD', 'V'),
  ('ACC.CUSTOMER_INVOICE', 'CEO', 'V'),   ('ACC.CUSTOMER_INVOICE', 'SAL', 'V'),    ('ACC.CUSTOMER_INVOICE', 'SLM', 'V'),
  ('ACC.CUSTOMER_INVOICE', 'ACC', 'VCE'), ('ACC.CUSTOMER_INVOICE', 'CAC', 'VCEDA'), ('ACC.CUSTOMER_INVOICE', 'AUD', 'V')
) AS m(function_code, role_code, letters)
JOIN roles r ON r.code = m.role_code
CROSS JOIN LATERAL perm_letters(m.letters) AS a
ON CONFLICT DO NOTHING;
```

</details>
