# 01 · Vai trò & Phân quyền / Roles & Permissions — Giai đoạn 6 / Phase 6

[← Giai đoạn 6 · Công nợ & thu chi / Phase 6 · Receivables, payables & cash](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/01-roles-permissions.md) · [P2](../phase-02-organization-master-data/01-roles-permissions.md) · [P3](../phase-03-inventory/01-roles-permissions.md) · [P4](../phase-04-purchasing/01-roles-permissions.md) · [P5](../phase-05-sales/01-roles-permissions.md) · [P7](../phase-07-approvals-controls/01-roles-permissions.md) · [P8](../phase-08-operations-completion/01-roles-permissions.md) · [P9](../phase-09-accounting-einvoicing/01-roles-permissions.md) · [P10](../phase-10-expansion/01-roles-permissions.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Bổ sung các chức năng `ACC.CASH_VOUCHER`, `ACC.BANK_TXN` vào danh mục `app_functions` và các dòng quyền mặc định tương ứng.
- **EN:** Add the functions `ACC.CASH_VOUCHER`, `ACC.BANK_TXN` to the `app_functions` catalog together with their default permission rows.

## 1. Ma trận phân quyền mặc định bổ sung / Additional default permission matrix

Ký hiệu / Legend: `V` Xem / View · `C` Tạo / Create · `E` Sửa / Edit · `D` Xóa / Delete · `A` Duyệt / Approve · `—` Không / None

| Chức năng / Function | Mã / Code | ADM | CEO | SAL | SLM | PUR | PUM | WH | WHM | ACC | CAC | CSH | AUD |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Phiếu thu / chi tiền mặt / Cash receipts & payments | `ACC.CASH_VOUCHER` | — | VA | — | — | — | — | — | — | VCE | VCEDA | VCE | V |
| Giao dịch ngân hàng / Bank transactions | `ACC.BANK_TXN` | — | VA | — | — | — | — | — | — | VCE | VCEDA | — | V |

## 2. Ghi chú / Notes

- **VI:** Ma trận là cấu hình mặc định khi khởi tạo; quản trị viên có thể thay đổi. Ô có `A` chỉ có tác dụng từ khi có luồng duyệt (P7).
- **EN:** The matrix is the initial default configuration; administrators can change it. Cells with `A` only take effect once approval flows exist (P7).

## 3. Mô hình dữ liệu / Data model

- **VI:** Không đổi lược đồ; nạp chức năng và ma trận mục 1. Chuyển tiền nội bộ dùng chức năng `ACC.BANK_TXN`.
- **EN:** No schema change; the section 1 functions and matrix are seeded. Internal transfers use the `ACC.BANK_TXN` function.

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: P5

INSERT INTO app_functions (code, module, name_vi, name_en, supported_actions, sort_order) VALUES
  ('ACC.CASH_VOUCHER', 'ACC', 'Phiếu thu / chi tiền mặt', 'Cash receipts & payments', '{VIEW,CREATE,EDIT,DELETE,APPROVE}', 730),
  ('ACC.BANK_TXN',     'ACC', 'Giao dịch ngân hàng',      'Bank transactions',        '{VIEW,CREATE,EDIT,DELETE,APPROVE}', 740)
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (role_id, function_code, action)
SELECT r.id, m.function_code, a
FROM (VALUES
  ('ACC.CASH_VOUCHER', 'CEO', 'VA'),  ('ACC.CASH_VOUCHER', 'ACC', 'VCE'), ('ACC.CASH_VOUCHER', 'CAC', 'VCEDA'),
  ('ACC.CASH_VOUCHER', 'CSH', 'VCE'), ('ACC.CASH_VOUCHER', 'AUD', 'V'),
  ('ACC.BANK_TXN',     'CEO', 'VA'),  ('ACC.BANK_TXN',     'ACC', 'VCE'), ('ACC.BANK_TXN',     'CAC', 'VCEDA'),
  ('ACC.BANK_TXN',     'AUD', 'V')
) AS m(function_code, role_code, letters)
JOIN roles r ON r.code = m.role_code
CROSS JOIN LATERAL perm_letters(m.letters) AS a
ON CONFLICT DO NOTHING;
```

</details>
