# 01 · Vai trò & Phân quyền / Roles & Permissions — Giai đoạn 9 / Phase 9

[← Giai đoạn 9 · Kế toán đầy đủ & HĐĐT / Phase 9 · Full accounting & e-invoicing](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/01-roles-permissions.md) · [P2](../phase-02-organization-master-data/01-roles-permissions.md) · [P3](../phase-03-inventory/01-roles-permissions.md) · [P4](../phase-04-purchasing/01-roles-permissions.md) · [P5](../phase-05-sales/01-roles-permissions.md) · [P6](../phase-06-receivables-payables-cash/01-roles-permissions.md) · [P7](../phase-07-approvals-controls/01-roles-permissions.md) · [P8](../phase-08-operations-completion/01-roles-permissions.md) · [P10](../phase-10-expansion/01-roles-permissions.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Bổ sung các chức năng `ACC.JOURNAL_ENTRY`, `ACC.PERIOD_CLOSE`, `ACC.FIN_STATEMENT`, `RPT.EXEC_DASHBOARD` vào danh mục `app_functions` và các dòng quyền mặc định tương ứng.
- **EN:** Add the functions `ACC.JOURNAL_ENTRY`, `ACC.PERIOD_CLOSE`, `ACC.FIN_STATEMENT`, `RPT.EXEC_DASHBOARD` to the `app_functions` catalog together with their default permission rows.

## 1. Ma trận phân quyền mặc định bổ sung / Additional default permission matrix

Ký hiệu / Legend: `V` Xem / View · `C` Tạo / Create · `E` Sửa / Edit · `D` Xóa / Delete · `A` Duyệt / Approve · `—` Không / None

| Chức năng / Function | Mã / Code | ADM | CEO | SAL | SLM | PUR | PUM | WH | WHM | ACC | CAC | CSH | HR | HRM | AUD |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bút toán thủ công / Manual journal entries | `ACC.JOURNAL_ENTRY` | — | — | — | — | — | — | — | — | VCE | VCEDA | — | — | — | V |
| Khóa sổ kỳ / Period close | `ACC.PERIOD_CLOSE` | — | V | — | — | — | — | — | — | — | VA | — | — | — | V |
| Báo cáo tài chính / Financial statements | `ACC.FIN_STATEMENT` | — | V | — | — | — | — | — | — | V | V | — | — | — | V |
| Dashboard điều hành / Executive dashboard | `RPT.EXEC_DASHBOARD` | — | V | — | — | — | — | — | — | — | V | — | — | — | — |

## 2. Ghi chú / Notes

- **VI:** Ma trận là cấu hình mặc định khi khởi tạo; quản trị viên có thể thay đổi. Phạm vi dữ liệu lấy theo phạm vi mặc định của vai trò ([P7](../phase-07-approvals-controls/01-roles-permissions.md)).
- **EN:** The matrix is the initial default configuration; administrators can change it. Data scope follows the role's default scope ([P7](../phase-07-approvals-controls/01-roles-permissions.md)).

## 3. Mô hình dữ liệu / Data model

- **VI:** Không đổi lược đồ; nạp chức năng và ma trận mục 1, cùng phần còn lại của `BR-ROL-002` (thủ quỹ không tạo / sửa bút toán) vì `ACC.JOURNAL_ENTRY` chỉ có từ giai đoạn này. Hai chức năng `ACC.PAYMENT_REQUEST` (`FR-ACC-021`) và `ACC.EMPLOYEE_ADVANCE` (`FR-ACC-023`) chưa có trong ma trận nên được **đề xuất**: `ACC` VCE, `CAC` VCEDA giống các chứng từ kế toán khác; `EMP` VC trên tạm ứng theo [P8, mục 3](../phase-08-operations-completion/01-roles-permissions.md) — cần chốt cùng ma trận.
- **EN:** No schema change; the section 1 functions and matrix are seeded, together with the rest of `BR-ROL-002` (cashiers cannot create / edit journal entries), since `ACC.JOURNAL_ENTRY` only exists from this phase. The `ACC.PAYMENT_REQUEST` (`FR-ACC-021`) and `ACC.EMPLOYEE_ADVANCE` (`FR-ACC-023`) functions are not in the matrix, so their grants are **proposed**: `ACC` VCE, `CAC` VCEDA like other accounting documents; `EMP` VC on advances per [P8, section 3](../phase-08-operations-completion/01-roles-permissions.md) — to be confirmed with the matrix.

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: P8

INSERT INTO app_functions (code, module, name_vi, name_en, supported_actions, sort_order) VALUES
  ('ACC.JOURNAL_ENTRY',    'ACC', 'Bút toán thủ công',  'Manual journal entries', '{VIEW,CREATE,EDIT,DELETE,APPROVE}', 750),
  ('ACC.PERIOD_CLOSE',     'ACC', 'Khóa sổ kỳ',         'Period close',           '{VIEW,APPROVE}',                    760),
  ('ACC.FIN_STATEMENT',    'ACC', 'Báo cáo tài chính',  'Financial statements',   '{VIEW,PRINT,EXPORT}',               770),
  ('RPT.EXEC_DASHBOARD',   'RPT', 'Dashboard điều hành', 'Executive dashboard',   '{VIEW}',                            9001),
  ('ACC.PAYMENT_REQUEST',  'ACC', 'Đề nghị thanh toán', 'Payment requests',       '{VIEW,CREATE,EDIT,DELETE,APPROVE}', 735),
  ('ACC.EMPLOYEE_ADVANCE', 'ACC', 'Tạm ứng & hoàn ứng', 'Employee advances',      '{VIEW,CREATE,EDIT,DELETE,APPROVE}', 736)
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (role_id, function_code, action)
SELECT r.id, m.function_code, a
FROM (VALUES
  ('ACC.JOURNAL_ENTRY',    'ACC', 'VCE'), ('ACC.JOURNAL_ENTRY',    'CAC', 'VCEDA'), ('ACC.JOURNAL_ENTRY', 'AUD', 'V'),
  ('ACC.PERIOD_CLOSE',     'CEO', 'V'),   ('ACC.PERIOD_CLOSE',     'CAC', 'VA'),    ('ACC.PERIOD_CLOSE',  'AUD', 'V'),
  ('ACC.FIN_STATEMENT',    'CEO', 'V'),   ('ACC.FIN_STATEMENT',    'ACC', 'V'),     ('ACC.FIN_STATEMENT', 'CAC', 'V'),
  ('ACC.FIN_STATEMENT',    'AUD', 'V'),
  ('RPT.EXEC_DASHBOARD',   'CEO', 'V'),   ('RPT.EXEC_DASHBOARD',   'CAC', 'V'),
  -- Đề xuất / proposed
  ('ACC.PAYMENT_REQUEST',  'ACC', 'VCE'), ('ACC.PAYMENT_REQUEST',  'CAC', 'VCEDA'), ('ACC.PAYMENT_REQUEST',  'AUD', 'V'),
  ('ACC.EMPLOYEE_ADVANCE', 'ACC', 'VCE'), ('ACC.EMPLOYEE_ADVANCE', 'CAC', 'VCEDA'), ('ACC.EMPLOYEE_ADVANCE', 'AUD', 'V'),
  ('ACC.EMPLOYEE_ADVANCE', 'EMP', 'VC')
) AS m(function_code, role_code, letters)
JOIN roles r ON r.code = m.role_code
CROSS JOIN LATERAL perm_letters(m.letters) AS a
ON CONFLICT DO NOTHING;

-- BR-ROL-002 (phần bút toán / journal-entry part)
INSERT INTO sod_rules (rule_code, role_id, function_code, action)
SELECT 'BR-ROL-002', r.id, 'ACC.JOURNAL_ENTRY', a
FROM roles r CROSS JOIN unnest('{CREATE,EDIT}'::permission_action[]) AS a
WHERE r.code = 'CSH'
ON CONFLICT DO NOTHING;
```

</details>
