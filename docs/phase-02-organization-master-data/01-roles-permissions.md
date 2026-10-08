# 01 · Vai trò & Phân quyền / Roles & Permissions — Giai đoạn 2 / Phase 2

[← Giai đoạn 2 · Tổ chức & danh mục / Phase 2 · Organization & master data](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/01-roles-permissions.md) · [P3](../phase-03-inventory/01-roles-permissions.md) · [P4](../phase-04-purchasing/01-roles-permissions.md) · [P5](../phase-05-sales/01-roles-permissions.md) · [P6](../phase-06-receivables-payables-cash/01-roles-permissions.md) · [P7](../phase-07-approvals-controls/01-roles-permissions.md) · [P8](../phase-08-operations-completion/01-roles-permissions.md) · [P9](../phase-09-accounting-einvoicing/01-roles-permissions.md) · [P10](../phase-10-expansion/01-roles-permissions.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Các vai trò nghiệp vụ mặc định; quyền Xem / Tạo / Sửa / Xóa trên cấu hình và danh mục. Sao chép vai trò và ghi nhật ký thay đổi phân quyền chuyển sang [P7](../phase-07-approvals-controls/01-roles-permissions.md).
- **EN:** The default business roles; View / Create / Edit / Delete permissions on settings and master data. Role cloning and auditing of permission changes moved to [P7](../phase-07-approvals-controls/01-roles-permissions.md).

## 1. Kiểm tra quyền / Permission check

- **VI:** Giữ nguyên mô hình của [P1](../phase-01-foundation/01-roles-permissions.md): chỉ kiểm tra chức năng × hành động theo ma trận mục 3. Chưa có phạm vi dữ liệu: người có quyền Xem trên một chức năng thì thấy toàn bộ dữ liệu của chức năng đó. Phạm vi dữ liệu triển khai ở [P7](../phase-07-approvals-controls/01-roles-permissions.md).
- **EN:** Keep the [P1](../phase-01-foundation/01-roles-permissions.md) model: only function × action is checked, against the section 3 matrix. There is no data scope yet: a user with View on a function sees all of that function's data. Data scope is delivered in [P7](../phase-07-approvals-controls/01-roles-permissions.md).

| Thao tác / Operation | Hành động cần có / Required action |
|---|---|
| Xem danh sách, xem chi tiết, tìm kiếm, xuất dữ liệu / List, detail, search, export | `VIEW` |
| Tạo mới / Create | `CREATE` |
| Sửa / Edit | `EDIT` |
| Xóa / Delete | `DELETE` |

- **VI:** Không có quyền tương ứng thì máy chủ từ chối thao tác (HTTP 403); giao diện ẩn hoặc vô hiệu nút đó. Mỗi hành động được kiểm tra độc lập, nên một vai trò có thể chỉ có `V` (chỉ xem), ví dụ `AUD`.
- **EN:** Without the matching permission the server rejects the operation (HTTP 403); the UI hides or disables that button. Each action is checked on its own, so a role may hold `V` only (read-only), e.g. `AUD`.

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

## 4. Quy tắc nghiệp vụ / Business rules

#### BR-ROL-005 · Quản trị viên không có quyền nghiệp vụ mặc định / Admins have no business permissions by default
`Must` · `P2`

- **VI:** Vai trò `ADM` chỉ có quyền cấu hình; không mặc định được xem hay sửa dữ liệu nghiệp vụ (đơn hàng, lương, sổ sách).
- **EN:** The `ADM` role has configuration rights only; by default it cannot view or edit business data (orders, payroll, ledgers).

| Quy tắc / Rule | Cơ chế (VI) | Mechanism (EN) |
|---|---|---|
| BR-ROL-005 | Dữ liệu khởi tạo: `ADM` chỉ có các dòng theo ma trận mục 3, không có quyền trên danh mục nghiệp vụ, chứng từ, lương, sổ sách. | Seed data: `ADM` only has the rows from the section 3 matrix, with no rights on business master data, documents, payroll or ledgers. |

## 5. Mô hình dữ liệu / Data model

- **VI:** Không đổi lược đồ của [P1](../phase-01-foundation/01-roles-permissions.md). Giai đoạn này chỉ nạp dữ liệu khởi tạo: vai trò mục 2, chức năng và ma trận mục 3. Hàm `perm_letters` đổi chuỗi ký hiệu của ma trận (`'VCE'`) thành các hành động, dùng lại cho seed ở các giai đoạn sau. Seed chạy được nhiều lần (`ON CONFLICT`), không ghi đè quyền quản trị viên đã sửa.
- **EN:** No schema change from [P1](../phase-01-foundation/01-roles-permissions.md). This phase only seeds data: the section 2 roles, the section 3 functions and matrix. The `perm_letters` function turns a matrix cell (`'VCE'`) into actions and is reused by later phases' seeds. Seeds are re-runnable (`ON CONFLICT`) and never overwrite permissions changed by administrators.

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
  ('MDM.PRICE_LIST', 'MDM', 'Bảng giá bán',      'Price lists',     '{VIEW,CREATE,EDIT,DELETE}', 140)
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
  ('MDM.PRICE_LIST', 'ACC', 'V'),   ('MDM.PRICE_LIST', 'CAC', 'V'),   ('MDM.PRICE_LIST', 'AUD', 'V')
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
