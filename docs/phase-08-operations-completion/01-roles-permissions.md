# 01 · Vai trò & Phân quyền / Roles & Permissions — Giai đoạn 8 / Phase 8

[← Giai đoạn 8 · Hoàn thiện mua – bán – kho / Phase 8 · Operations completion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/01-roles-permissions.md) · [P2](../phase-02-organization-master-data/01-roles-permissions.md) · [P3](../phase-03-inventory/01-roles-permissions.md) · [P4](../phase-04-purchasing/01-roles-permissions.md) · [P5](../phase-05-sales/01-roles-permissions.md) · [P6](../phase-06-receivables-payables-cash/01-roles-permissions.md) · [P7](../phase-07-approvals-controls/01-roles-permissions.md) · [P9](../phase-09-accounting-einvoicing/01-roles-permissions.md) · [P10](../phase-10-expansion/01-roles-permissions.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Bổ sung các chức năng `PUR.PURCHASE_REQUEST` vào danh mục `app_functions` và các dòng quyền mặc định tương ứng.
- **EN:** Add the functions `PUR.PURCHASE_REQUEST` to the `app_functions` catalog together with their default permission rows.

## 1. Ma trận phân quyền mặc định bổ sung / Additional default permission matrix

Ký hiệu / Legend: `V` Xem / View · `C` Tạo / Create · `E` Sửa / Edit · `D` Xóa / Delete · `A` Duyệt / Approve · `—` Không / None

| Chức năng / Function | Mã / Code | ADM | CEO | SAL | SLM | PUR | PUM | WH | WHM | ACC | CAC | CSH | HR | HRM | AUD |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Đề nghị mua hàng / Purchase requests | `PUR.PURCHASE_REQUEST` | — | VA | VC | VC | VCE | VCEA | VC | VC | VC | VC | — | VC | VC | V |

## 2. Ghi chú / Notes

- **VI:** Ma trận là cấu hình mặc định khi khởi tạo; quản trị viên có thể thay đổi. Phạm vi dữ liệu lấy theo phạm vi mặc định của vai trò ([P7](../phase-07-approvals-controls/01-roles-permissions.md)).
- **EN:** The matrix is the initial default configuration; administrators can change it. Data scope follows the role's default scope ([P7](../phase-07-approvals-controls/01-roles-permissions.md)).

## 3. Vai trò mặc định bổ sung / Additional default roles

| Mã / Code | Vai trò (VI) | Role (EN) | Phạm vi mặc định / Default scope |
|---|---|---|---|
| `HR` | Nhân viên nhân sự | HR staff | Toàn công ty / All |
| `HRM` | Trưởng phòng nhân sự | HR manager | Toàn công ty / All |
| `EMP` | Nhân viên (tự phục vụ) | Employee (self-service) | Của tôi / Own |

- **VI:** `HR`, `HRM` bắt đầu có quyền từ giai đoạn này (tạo đề nghị mua hàng); quyền trên hồ sơ nhân sự và bảng lương có từ P10. Vai trò `EMP` tạo đề nghị mua hàng (P8) / tạm ứng (P9) và chỉ truy cập cổng tự phục vụ (P11).
- **EN:** `HR` and `HRM` receive their first permissions in this phase (creating purchase requests); rights on employee records and payroll arrive in P10. The `EMP` role creates purchase requests (P8) / advance requests (P9) and only accesses the self-service portal (P11).
