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

- **VI:** Ma trận là cấu hình mặc định khi khởi tạo; quản trị viên có thể thay đổi. Phạm vi dữ liệu lấy theo phạm vi mặc định của vai trò ([P2](../phase-02-organization-master-data/01-roles-permissions.md)). Ô có `A` chỉ có tác dụng từ khi có luồng duyệt (P7).
- **EN:** The matrix is the initial default configuration; administrators can change it. Data scope follows the role's default scope ([P2](../phase-02-organization-master-data/01-roles-permissions.md)). Cells with `A` only take effect once approval flows exist (P7).
