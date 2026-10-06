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

- **VI:** Ma trận là cấu hình mặc định khi khởi tạo; quản trị viên có thể thay đổi. Phạm vi dữ liệu lấy theo phạm vi mặc định của vai trò ([P2](../phase-02-organization-master-data/01-roles-permissions.md), [P7](../phase-07-approvals-controls/01-roles-permissions.md)).
- **EN:** The matrix is the initial default configuration; administrators can change it. Data scope follows the role's default scope ([P2](../phase-02-organization-master-data/01-roles-permissions.md), [P7](../phase-07-approvals-controls/01-roles-permissions.md)).
