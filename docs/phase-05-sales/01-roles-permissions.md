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

- **VI:** Ma trận là cấu hình mặc định khi khởi tạo; quản trị viên có thể thay đổi. Phạm vi dữ liệu lấy theo phạm vi mặc định của vai trò ([P2](../phase-02-organization-master-data/01-roles-permissions.md)). Ô có `A` chỉ có tác dụng từ khi có luồng duyệt (P7).
- **EN:** The matrix is the initial default configuration; administrators can change it. Data scope follows the role's default scope ([P2](../phase-02-organization-master-data/01-roles-permissions.md)). Cells with `A` only take effect once approval flows exist (P7).
