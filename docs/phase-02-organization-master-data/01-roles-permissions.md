# 01 · Vai trò & Phân quyền / Roles & Permissions — Giai đoạn 2 / Phase 2

[← Giai đoạn 2 · Tổ chức & danh mục / Phase 2 · Organization & master data](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/01-roles-permissions.md) · [P3](../phase-03-inventory/01-roles-permissions.md) · [P4](../phase-04-purchasing/01-roles-permissions.md) · [P5](../phase-05-sales/01-roles-permissions.md) · [P6](../phase-06-receivables-payables-cash/01-roles-permissions.md) · [P7](../phase-07-approvals-controls/01-roles-permissions.md) · [P8](../phase-08-operations-completion/01-roles-permissions.md) · [P9](../phase-09-accounting-einvoicing/01-roles-permissions.md) · [P10](../phase-10-expansion/01-roles-permissions.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Các vai trò nghiệp vụ mặc định; chức năng quản lý từng nhóm danh mục; quyền Xem / Tạo / Sửa / Xóa trên cấu hình và danh mục; danh sách chọn. Sao chép vai trò và ghi nhật ký thay đổi phân quyền chuyển sang [P7](../phase-07-approvals-controls/01-roles-permissions.md).
- **EN:** The default business roles; the function guarding each master-data group; View / Create / Edit / Delete permissions on settings and master data; pick lists. Role cloning and auditing of permission changes moved to [P7](../phase-07-approvals-controls/01-roles-permissions.md).

## 1. Kiểm tra quyền / Permission check

- **VI:** Giữ nguyên mô hình của [P1](../phase-01-foundation/01-roles-permissions.md): chỉ kiểm tra chức năng × hành động theo ma trận mục 3. Chưa có phạm vi dữ liệu: người có quyền Xem trên một chức năng thì thấy toàn bộ dữ liệu của chức năng đó. Phạm vi dữ liệu triển khai ở [P7](../phase-07-approvals-controls/01-roles-permissions.md).
- **EN:** Keep the [P1](../phase-01-foundation/01-roles-permissions.md) model: only function × action is checked, against the section 3 matrix. There is no data scope yet: a user with View on a function sees all of that function's data. Data scope is delivered in [P7](../phase-07-approvals-controls/01-roles-permissions.md).

| Thao tác / Operation | Hành động cần có / Required action |
|---|---|
| Xem danh sách, xem chi tiết, tìm kiếm, xuất dữ liệu (từ P6) / List, detail, search, export (from P6) | `VIEW` |
| Tạo mới / Create | `CREATE` |
| Sửa / Edit | `EDIT` |
| Xóa / Delete | `DELETE` |
| Nhập từ Excel (từ P6) / Excel import (from P6) | `CREATE` |

- **VI:** Không có quyền tương ứng thì máy chủ từ chối thao tác (HTTP 403); giao diện ẩn hoặc vô hiệu nút đó. Mỗi hành động được kiểm tra độc lập, nên một vai trò có thể chỉ có `V` (chỉ xem), ví dụ `AUD`.
- **EN:** Without the matching permission the server rejects the operation (HTTP 403); the UI hides or disables that button. Each action is checked on its own, so a role may hold `V` only (read-only), e.g. `AUD`.
- **VI:** Nhập Excel ([P6](../phase-06-receivables-payables-cash/02-system-administration.md)) chỉ thêm mới, nên chỉ cần quyền Tạo trên chức năng của dữ liệu đích; mã đã tồn tại là lỗi của dòng đó.
- **EN:** Excel import ([P6](../phase-06-receivables-payables-cash/02-system-administration.md)) only inserts, so it needs Create on the target data's function; an existing code is an error on that row.

## 2. Vai trò mặc định bổ sung / Additional default roles

| Mã / Code | Vai trò (VI) | Role (EN) |
|---|---|---|
| `CEO` | Ban giám đốc | Executive |
| `SAL` | Nhân viên kinh doanh | Sales staff |
| `SLM` | Trưởng phòng kinh doanh | Sales manager |
| `PUR` | Nhân viên mua hàng | Purchasing staff |
| `PUM` | Trưởng phòng mua hàng | Purchasing manager |
| `WH` | Thủ kho | Warehouse keeper |
| `WHM` | Quản lý kho | Warehouse manager |
| `ACC` | Kế toán viên | Accountant |
| `CAC` | Kế toán trưởng | Chief accountant |
| `CSH` | Thủ quỹ | Cashier |
| `AUD` | Kiểm soát / Kiểm toán (chỉ xem) | Auditor (read-only) |

- **VI:** `ADM` (từ P1) chỉ có quyền cấu hình (`BR-ROL-005`).
- **EN:** `ADM` (from P1) has configuration rights only (`BR-ROL-005`).

## 3. Ma trận phân quyền mặc định / Default permission matrix

Ký hiệu / Legend: `V` Xem / View · `C` Tạo / Create · `E` Sửa / Edit · `D` Xóa / Delete · `—` Không / None

| Chức năng / Function | Mã / Code | ADM | CEO | SAL | SLM | PUR | PUM | WH | WHM | ACC | CAC | CSH | AUD |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Người dùng & vai trò / Users & roles (từ P1 / from P1) | `SYS.USER_ROLE` | VCED | — | — | — | — | — | — | — | — | — | — | V |
| Cấu hình hệ thống / System settings | `SYS.SETTINGS` | VCE | V | — | — | — | — | — | — | — | V | — | V |
| Nhật ký hệ thống / Audit log | `SYS.AUDIT_LOG` | V | V | — | — | — | — | — | — | — | V | — | V |
| Sản phẩm / Products | `MDM.PRODUCT` | V | V | V | V | VCE | VCE | V | VCE | V | VE | — | V |
| Khách hàng / Customers | `MDM.CUSTOMER` | — | V | VCE | VCE | — | — | — | — | V | VE | V | V |
| Nhà cung cấp / Suppliers | `MDM.SUPPLIER` | — | V | — | — | VCE | VCE | — | — | V | VE | V | V |
| Bảng giá bán / Price lists | `MDM.PRICE_LIST` | — | V | V | VCE | — | — | — | — | V | V | — | V |
| Kho / Warehouses | `MDM.WAREHOUSE` | — | V | — | — | — | — | V | VCE | V | V | — | V |
| Danh mục tài chính / Financial master data | `MDM.FINANCE` | — | V | — | — | — | — | — | — | VCE | VCE | V | V |
| Năm tài chính & kỳ kế toán / Fiscal years & periods | `ACC.FISCAL_PERIOD` | — | V | — | — | — | — | — | — | V | VCE | — | V |

- **VI:** Ma trận là cấu hình mặc định khi khởi tạo; quản trị viên có thể thay đổi. Quyền Duyệt trên danh mục được cấp ở [P7](../phase-07-approvals-controls/01-roles-permissions.md) cùng luồng duyệt.
- **EN:** The matrix is the initial default configuration; administrators can change it. Approve rights on master data are granted in [P7](../phase-07-approvals-controls/01-roles-permissions.md) together with approval flows.
- **VI:** Dòng `SYS.AUDIT_LOG` đã có trong dữ liệu khởi tạo để không phải sửa ma trận về sau; màn hình nhật ký kiểm toán làm ở [P7](../phase-07-approvals-controls/02-system-administration.md).
- **EN:** The `SYS.AUDIT_LOG` row is already seeded so the matrix does not change later; the audit-log screen is built in [P7](../phase-07-approvals-controls/02-system-administration.md).

Ví dụ / Example — ô `SAL` × Khách hàng = `VCE` trở thành 3 dòng `role_permissions` / becomes 3 `role_permissions` rows:

| role | function_code | action |
|---|---|---|
| `SAL` | `MDM.CUSTOMER` | `VIEW` |
| `SAL` | `MDM.CUSTOMER` | `CREATE` |
| `SAL` | `MDM.CUSTOMER` | `EDIT` |

- **VI:** `SAL` không có dòng `DELETE` trên `MDM.CUSTOMER`, nên yêu cầu xóa khách hàng của `SAL` bị từ chối.
- **EN:** `SAL` has no `DELETE` row on `MDM.CUSTOMER`, so a delete-customer request from `SAL` is rejected.

### Chức năng của từng danh mục / Function per master-data table

| Chức năng / Function | Bảng / Tables | Ghi chú (VI) | Notes (EN) |
|---|---|---|---|
| `SYS.SETTINGS` | `company_profile`, `branches`, `departments`, `system_settings`, `employees`, `users.employee_id` | Cơ cấu tổ chức, tham số, nhân viên cơ bản. Hồ sơ nhân sự đầy đủ dùng `HRM.EMPLOYEE` từ [P10](../phase-10-expansion/01-roles-permissions.md). | Organization, parameters, basic employees. Full employee records use `HRM.EMPLOYEE` from [P10](../phase-10-expansion/01-roles-permissions.md). |
| `ACC.FISCAL_PERIOD` | `fiscal_years`, `fiscal_periods` | Mở / khóa kỳ là Sửa. Khóa sổ có kiểm tra đầy đủ dùng `ACC.PERIOD_CLOSE` từ [P9](../phase-09-accounting-einvoicing/01-roles-permissions.md). | Opening / locking a period is Edit. The fully checked period close uses `ACC.PERIOD_CLOSE` from [P9](../phase-09-accounting-einvoicing/01-roles-permissions.md). |
| `MDM.FINANCE` | `currencies`, `exchange_rates`, `taxes`, `payment_terms`, `payment_methods`, `company_bank_accounts` | Kế toán nhập tỷ giá hằng ngày. | Accountants enter daily exchange rates. |
| `MDM.WAREHOUSE` | `warehouses` | — | — |
| `MDM.PRODUCT` | `products`, `product_uoms`, `product_categories`, `uoms` | — | — |
| `MDM.CUSTOMER`, `MDM.SUPPLIER` | `partners`, `partner_addresses`, `partner_contacts`, `partner_bank_accounts`, `partner_groups` | Theo loại đối tác, xem bảng dưới. | By partner kind, see the table below. |
| `MDM.PRICE_LIST` | `price_lists`, `price_list_items` | — | — |

- **VI:** Đối tác dùng chung một bảng (`FR-MDM-009`) nên quyền được kiểm theo cờ `is_customer` (`MDM.CUSTOMER`) và `is_supplier` (`MDM.SUPPLIER`):
- **EN:** Partners share one table (`FR-MDM-009`), so permissions are checked against the `is_customer` (`MDM.CUSTOMER`) and `is_supplier` (`MDM.SUPPLIER`) flags:

| Thao tác / Operation | Quy tắc (VI) | Rule (EN) |
|---|---|---|
| Xem / View | Thấy đối tác có ít nhất một loại mà người dùng có quyền Xem. | Sees partners having at least one kind the user can View. |
| Tạo / Create | Cần quyền Tạo trên mọi loại được bật. | Needs Create on every kind that is set. |
| Sửa / Edit | Trường chung (tên, MST, địa chỉ, người liên hệ, tài khoản ngân hàng…) cần quyền Sửa trên ít nhất một loại của đối tác; nhóm trường khách hàng / nhà cung cấp cần quyền Sửa trên đúng loại đó; bật thêm một loại cần quyền Tạo trên loại đó. | Shared fields (name, tax ID, addresses, contacts, bank accounts…) need Edit on at least one of the partner's kinds; customer / supplier fields need Edit on that kind; turning on a kind needs Create on that kind. |
| Xóa / Delete | Cần quyền Xóa trên mọi loại của đối tác. | Needs Delete on every kind of the partner. |
| Nhóm đối tác / Partner groups | Theo `group_type`; `BOTH` cần quyền trên cả hai chức năng. | By `group_type`; `BOTH` needs the permission on both functions. |

### Danh sách chọn / Pick lists

- **VI:** Ô chọn trên màn hình nhập liệu (vd chọn điều khoản thanh toán khi tạo khách hàng, chọn kho khi lập phiếu) dùng API danh sách chọn riêng: chỉ cần đăng nhập, không cần quyền Xem trên chức năng của danh mục đó. API chỉ trả bản ghi đang dùng (`is_active`) với các trường định danh (`id`, `code`, `name`, `name_en` và trường cần để hiển thị), không trả hạn mức công nợ, tài khoản ngân hàng của đối tác hay dữ liệu nhạy cảm khác.
- **EN:** Pickers on data-entry screens (e.g. choosing payment terms when creating a customer, a warehouse on a stock document) use separate pick-list APIs: being signed in is enough, View on that master data's function is not required. These APIs return only active records (`is_active`) with identifying fields (`id`, `code`, `name`, `name_en` and fields needed for display), never credit limits, partner bank accounts or other sensitive data.

## 4. Quy tắc nghiệp vụ / Business rules

#### BR-ROL-005 · Quản trị viên không có quyền nghiệp vụ mặc định / Admins have no business permissions by default
`Must` · `P2`

- **VI:** Vai trò `ADM` chỉ có quyền cấu hình; không mặc định được xem hay sửa dữ liệu nghiệp vụ (đơn hàng, lương, sổ sách).
- **EN:** The `ADM` role has configuration rights only; by default it cannot view or edit business data (orders, payroll, ledgers).

| Quy tắc / Rule | Cơ chế (VI) | Mechanism (EN) |
|---|---|---|
| BR-ROL-005 | Dữ liệu khởi tạo: `ADM` chỉ có các dòng theo ma trận mục 3, không có quyền trên danh mục nghiệp vụ, chứng từ, lương, sổ sách. | Seed data: `ADM` only has the rows from the section 3 matrix, with no rights on business master data, documents, payroll or ledgers. |

## 5. Mô hình dữ liệu / Data model

- **VI:** Không đổi lược đồ của [P1](../phase-01-foundation/01-roles-permissions.md). Giai đoạn này chỉ nạp dữ liệu khởi tạo: vai trò mục 2, chức năng và ma trận mục 3 (gồm `MDM.WAREHOUSE`, `MDM.FINANCE`, `ACC.FISCAL_PERIOD`). Hàm `perm_letters` đổi chuỗi ký hiệu của ma trận (`'VCE'`) thành các hành động, dùng lại cho seed ở các giai đoạn sau. Seed chạy được nhiều lần (`ON CONFLICT`), không ghi đè quyền quản trị viên đã sửa.
- **EN:** No schema change from [P1](../phase-01-foundation/01-roles-permissions.md). This phase only seeds data: the section 2 roles, the section 3 functions and matrix (including `MDM.WAREHOUSE`, `MDM.FINANCE`, `ACC.FISCAL_PERIOD`). The `perm_letters` function turns a matrix cell (`'VCE'`) into actions and is reused by later phases' seeds. Seeds are re-runnable (`ON CONFLICT`) and never overwrite permissions changed by administrators.

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: P1; 02-system-administration.md (P2)

-- 'VCEDA' → {VIEW, CREATE, EDIT, DELETE, APPROVE}; ký hiệu lạ → NULL → INSERT lỗi NOT NULL
-- Unknown letters → NULL → the INSERT fails on NOT NULL
CREATE FUNCTION perm_letters(p_letters text) RETURNS SETOF permission_action
LANGUAGE sql IMMUTABLE STRICT AS $$
  SELECT (CASE ch
            WHEN 'V' THEN 'VIEW'   WHEN 'C' THEN 'CREATE' WHEN 'E' THEN 'EDIT'
            WHEN 'D' THEN 'DELETE' WHEN 'A' THEN 'APPROVE'
          END)::permission_action
  FROM regexp_split_to_table(p_letters, '') AS ch
$$;

INSERT INTO roles (code, name_vi, name_en, is_system) VALUES
  ('CEO', 'Ban giám đốc',                    'Executive',            true),
  ('SAL', 'Nhân viên kinh doanh',            'Sales staff',          true),
  ('SLM', 'Trưởng phòng kinh doanh',         'Sales manager',        true),
  ('PUR', 'Nhân viên mua hàng',              'Purchasing staff',     true),
  ('PUM', 'Trưởng phòng mua hàng',           'Purchasing manager',   true),
  ('WH',  'Thủ kho',                         'Warehouse keeper',     true),
  ('WHM', 'Quản lý kho',                     'Warehouse manager',    true),
  ('ACC', 'Kế toán viên',                    'Accountant',           true),
  ('CAC', 'Kế toán trưởng',                  'Chief accountant',     true),
  ('CSH', 'Thủ quỹ',                         'Cashier',              true),
  ('AUD', 'Kiểm soát / Kiểm toán (chỉ xem)', 'Auditor (read-only)',  true)
ON CONFLICT (code) DO NOTHING;

INSERT INTO app_functions (code, module, name_vi, name_en, supported_actions, sort_order) VALUES
  ('SYS.SETTINGS',   'SYS', 'Cấu hình hệ thống', 'System settings', '{VIEW,CREATE,EDIT}',        20),
  ('SYS.AUDIT_LOG',  'SYS', 'Nhật ký hệ thống',  'Audit log',       '{VIEW}',                    30),
  ('MDM.PRODUCT',    'MDM', 'Sản phẩm',          'Products',        '{VIEW,CREATE,EDIT,DELETE}', 110),
  ('MDM.CUSTOMER',   'MDM', 'Khách hàng',        'Customers',       '{VIEW,CREATE,EDIT,DELETE}', 120),
  ('MDM.SUPPLIER',   'MDM', 'Nhà cung cấp',      'Suppliers',       '{VIEW,CREATE,EDIT,DELETE}', 130),
  ('MDM.PRICE_LIST', 'MDM', 'Bảng giá bán',      'Price lists',     '{VIEW,CREATE,EDIT,DELETE}', 140),
  ('MDM.WAREHOUSE',  'MDM', 'Kho',               'Warehouses',      '{VIEW,CREATE,EDIT,DELETE}', 150),
  ('MDM.FINANCE',    'MDM', 'Danh mục tài chính', 'Financial master data', '{VIEW,CREATE,EDIT,DELETE}', 160),
  ('ACC.FISCAL_PERIOD', 'ACC', 'Năm tài chính & kỳ kế toán', 'Fiscal years & periods', '{VIEW,CREATE,EDIT}', 705)
ON CONFLICT (code) DO NOTHING;

-- Ma trận mục 3; ô "—" không có dòng / Section 3 matrix; "—" cells have no row
INSERT INTO role_permissions (role_id, function_code, action)
SELECT r.id, m.function_code, a
FROM (VALUES
  ('SYS.USER_ROLE',  'AUD', 'V'),
  ('SYS.SETTINGS',   'ADM', 'VCE'), ('SYS.SETTINGS',   'CEO', 'V'),   ('SYS.SETTINGS',   'CAC', 'V'),
  ('SYS.SETTINGS',   'AUD', 'V'),
  ('SYS.AUDIT_LOG',  'ADM', 'V'),   ('SYS.AUDIT_LOG',  'CEO', 'V'),   ('SYS.AUDIT_LOG',  'CAC', 'V'),
  ('SYS.AUDIT_LOG',  'AUD', 'V'),
  ('MDM.PRODUCT',    'ADM', 'V'),   ('MDM.PRODUCT',    'CEO', 'V'),   ('MDM.PRODUCT',    'SAL', 'V'),
  ('MDM.PRODUCT',    'SLM', 'V'),   ('MDM.PRODUCT',    'PUR', 'VCE'), ('MDM.PRODUCT',    'PUM', 'VCE'),
  ('MDM.PRODUCT',    'WH',  'V'),   ('MDM.PRODUCT',    'WHM', 'VCE'), ('MDM.PRODUCT',    'ACC', 'V'),
  ('MDM.PRODUCT',    'CAC', 'VE'),  ('MDM.PRODUCT',    'AUD', 'V'),
  ('MDM.CUSTOMER',   'CEO', 'V'),   ('MDM.CUSTOMER',   'SAL', 'VCE'), ('MDM.CUSTOMER',   'SLM', 'VCE'),
  ('MDM.CUSTOMER',   'ACC', 'V'),   ('MDM.CUSTOMER',   'CAC', 'VE'),  ('MDM.CUSTOMER',   'CSH', 'V'),
  ('MDM.CUSTOMER',   'AUD', 'V'),
  ('MDM.SUPPLIER',   'CEO', 'V'),   ('MDM.SUPPLIER',   'PUR', 'VCE'), ('MDM.SUPPLIER',   'PUM', 'VCE'),
  ('MDM.SUPPLIER',   'ACC', 'V'),   ('MDM.SUPPLIER',   'CAC', 'VE'),  ('MDM.SUPPLIER',   'CSH', 'V'),
  ('MDM.SUPPLIER',   'AUD', 'V'),
  ('MDM.PRICE_LIST', 'CEO', 'V'),   ('MDM.PRICE_LIST', 'SAL', 'V'),   ('MDM.PRICE_LIST', 'SLM', 'VCE'),
  ('MDM.PRICE_LIST', 'ACC', 'V'),   ('MDM.PRICE_LIST', 'CAC', 'V'),   ('MDM.PRICE_LIST', 'AUD', 'V'),
  ('MDM.WAREHOUSE',  'CEO', 'V'),   ('MDM.WAREHOUSE',  'WH',  'V'),   ('MDM.WAREHOUSE',  'WHM', 'VCE'),
  ('MDM.WAREHOUSE',  'ACC', 'V'),   ('MDM.WAREHOUSE',  'CAC', 'V'),   ('MDM.WAREHOUSE',  'AUD', 'V'),
  ('MDM.FINANCE',    'CEO', 'V'),   ('MDM.FINANCE',    'ACC', 'VCE'), ('MDM.FINANCE',    'CAC', 'VCE'),
  ('MDM.FINANCE',    'CSH', 'V'),   ('MDM.FINANCE',    'AUD', 'V'),
  ('ACC.FISCAL_PERIOD', 'CEO', 'V'), ('ACC.FISCAL_PERIOD', 'ACC', 'V'), ('ACC.FISCAL_PERIOD', 'CAC', 'VCE'),
  ('ACC.FISCAL_PERIOD', 'AUD', 'V')
) AS m(function_code, role_code, letters)
JOIN roles r ON r.code = m.role_code
CROSS JOIN LATERAL perm_letters(m.letters) AS a
ON CONFLICT DO NOTHING;
```

</details>

## 6. Câu hỏi mở / Open questions

| # | Câu hỏi (VI) | Question (EN) |
|---|---|---|
| Q-ROL-01 | Có cần thêm vai trò đặc thù (giám sát bán hàng theo vùng, kế toán kho, kế toán công nợ…)? | Are additional roles needed (regional sales supervisor, inventory accountant, AR/AP accountant…)? |
