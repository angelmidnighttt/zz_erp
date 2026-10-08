# 01 · Vai trò & Phân quyền / Roles & Permissions — Giai đoạn 10 / Phase 10

[← Giai đoạn 10 · Mở rộng / Phase 10 · Expansion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/01-roles-permissions.md) · [P2](../phase-02-organization-master-data/01-roles-permissions.md) · [P3](../phase-03-inventory/01-roles-permissions.md) · [P4](../phase-04-purchasing/01-roles-permissions.md) · [P5](../phase-05-sales/01-roles-permissions.md) · [P6](../phase-06-receivables-payables-cash/01-roles-permissions.md) · [P7](../phase-07-approvals-controls/01-roles-permissions.md) · [P8](../phase-08-operations-completion/01-roles-permissions.md) · [P9](../phase-09-accounting-einvoicing/01-roles-permissions.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Bổ sung các chức năng `HRM.EMPLOYEE`, `HRM.PAYROLL` vào danh mục `app_functions` và các dòng quyền mặc định tương ứng.
- **EN:** Add the functions `HRM.EMPLOYEE`, `HRM.PAYROLL` to the `app_functions` catalog together with their default permission rows.

## 1. Ma trận phân quyền mặc định bổ sung / Additional default permission matrix

Ký hiệu / Legend: `V` Xem / View · `C` Tạo / Create · `E` Sửa / Edit · `D` Xóa / Delete · `A` Duyệt / Approve · `—` Không / None

| Chức năng / Function | Mã / Code | ADM | CEO | SAL | SLM | PUR | PUM | WH | WHM | ACC | CAC | CSH | HR | HRM | AUD |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hồ sơ nhân sự / Employee records | `HRM.EMPLOYEE` | — | V | — | — | — | — | — | — | — | — | — | VCE | VCEDA | — |
| Bảng lương / Payroll | `HRM.PAYROLL` | — | VA | — | — | — | — | — | — | V | V | — | VCE | VCEA | — |

## 2. Ghi chú / Notes

- **VI:** Ma trận là cấu hình mặc định khi khởi tạo; quản trị viên có thể thay đổi. Phạm vi dữ liệu lấy theo phạm vi mặc định của vai trò ([P7](../phase-07-approvals-controls/01-roles-permissions.md)).
- **EN:** The matrix is the initial default configuration; administrators can change it. Data scope follows the role's default scope ([P7](../phase-07-approvals-controls/01-roles-permissions.md)).

## 3. Mô hình dữ liệu / Data model

- **VI:** Không đổi lược đồ; nạp chức năng và ma trận mục 1. Các phân hệ mới của P10 (CRM, khuyến mãi, yêu cầu báo giá, tài sản cố định) chưa có dòng trong ma trận nên chức năng và quyền dưới đây là **đề xuất**, theo cách phân vai của các chức năng gần nhất, cần chốt cùng ma trận. Phạm vi `OWN` của `SAL` và `DEPARTMENT` của `SLM` đáp ứng `BR-CRM-001`.
- **EN:** No schema change; the section 1 functions and matrix are seeded. P10's new modules (CRM, promotions, RFQs, fixed assets) have no matrix rows yet, so the functions and grants below are **proposed**, following the closest existing functions, and must be confirmed with the matrix. The `OWN` scope of `SAL` and `DEPARTMENT` scope of `SLM` satisfy `BR-CRM-001`.

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: P9

INSERT INTO app_functions (code, module, name_vi, name_en, supported_actions, sort_order) VALUES
  ('HRM.EMPLOYEE',    'HRM', 'Hồ sơ nhân sự',             'Employee records',       '{VIEW,CREATE,EDIT,DELETE,APPROVE}', 810),
  ('HRM.PAYROLL',     'HRM', 'Bảng lương',                'Payroll',                '{VIEW,CREATE,EDIT,DELETE,APPROVE}', 820),
  -- Đề xuất / proposed
  ('CRM.LEAD',        'CRM', 'Khách hàng tiềm năng',      'Leads',                  '{VIEW,CREATE,EDIT,DELETE}',         910),
  ('CRM.OPPORTUNITY', 'CRM', 'Cơ hội & hoạt động',        'Opportunities & activities', '{VIEW,CREATE,EDIT,DELETE}',     920),
  ('SAL.PROMOTION',   'SAL', 'Chương trình khuyến mãi',   'Promotions',             '{VIEW,CREATE,EDIT,DELETE,APPROVE}', 540),
  ('PUR.RFQ',         'PUR', 'Yêu cầu báo giá',           'Requests for quotation', '{VIEW,CREATE,EDIT,DELETE}',         415),
  ('ACC.FIXED_ASSET', 'ACC', 'Tài sản cố định & CCDC',    'Fixed assets & tools',   '{VIEW,CREATE,EDIT,DELETE,APPROVE}', 780)
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (role_id, function_code, action)
SELECT r.id, m.function_code, a
FROM (VALUES
  ('HRM.EMPLOYEE',    'CEO', 'V'),    ('HRM.EMPLOYEE',    'HR',  'VCE'),   ('HRM.EMPLOYEE',    'HRM', 'VCEDA'),
  ('HRM.PAYROLL',     'CEO', 'VA'),   ('HRM.PAYROLL',     'ACC', 'V'),     ('HRM.PAYROLL',     'CAC', 'V'),
  ('HRM.PAYROLL',     'HR',  'VCE'),  ('HRM.PAYROLL',     'HRM', 'VCEA'),
  -- Đề xuất / proposed
  ('CRM.LEAD',        'CEO', 'V'),    ('CRM.LEAD',        'SAL', 'VCE'),   ('CRM.LEAD',        'SLM', 'VCED'),
  ('CRM.OPPORTUNITY', 'CEO', 'V'),    ('CRM.OPPORTUNITY', 'SAL', 'VCE'),   ('CRM.OPPORTUNITY', 'SLM', 'VCED'),
  ('SAL.PROMOTION',   'CEO', 'VA'),   ('SAL.PROMOTION',   'SAL', 'V'),     ('SAL.PROMOTION',   'SLM', 'VCED'),
  ('SAL.PROMOTION',   'ACC', 'V'),    ('SAL.PROMOTION',   'CAC', 'V'),
  ('PUR.RFQ',         'CEO', 'V'),    ('PUR.RFQ',         'PUR', 'VCE'),   ('PUR.RFQ',         'PUM', 'VCED'),
  ('ACC.FIXED_ASSET', 'CEO', 'V'),    ('ACC.FIXED_ASSET', 'ACC', 'VCE'),   ('ACC.FIXED_ASSET', 'CAC', 'VCEDA'),
  ('ACC.FIXED_ASSET', 'AUD', 'V')
) AS m(function_code, role_code, letters)
JOIN roles r ON r.code = m.role_code
CROSS JOIN LATERAL perm_letters(m.letters) AS a
ON CONFLICT DO NOTHING;
```

</details>
