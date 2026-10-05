# 01 · Vai trò & Phân quyền / Roles & Permissions

[← Mục lục / Index](../README.md)

---

## 1. Mô hình phân quyền / Permission model

- **VI:** Hệ thống áp dụng phân quyền theo vai trò (RBAC) kết hợp phạm vi dữ liệu. Một người dùng có thể có nhiều vai trò; quyền hiệu lực là hợp của quyền các vai trò. Mọi kiểm tra quyền phải được thực hiện ở phía máy chủ.
- **EN:** The system uses role-based access control (RBAC) combined with data scope. A user may hold several roles; effective permissions are the union of all role permissions. All permission checks must be enforced server-side.

| Thành phần (VI) | Component (EN) | Giá trị / Values |
|---|---|---|
| Chức năng | Function | Màn hình / nghiệp vụ, ví dụ "Đơn bán hàng" / Screen or business function, e.g. "Sales order" |
| Hành động | Action | Xem / View · Tạo / Create · Sửa / Edit · Xóa / Delete · Duyệt / Approve · Hủy / Cancel · In / Print · Xuất / Export · Nhập / Import |
| Phạm vi dữ liệu | Data scope | Của tôi / Own · Phòng ban / Department · Chi nhánh / Branch · Công ty / Company · Toàn hệ thống / All |
| Hạn mức | Limits | Chiết khấu tối đa, giá trị duyệt tối đa… / Max discount, max approval amount… |
| Quyền theo trường | Field-level | Ẩn giá vốn, lãi gộp, lương… / Hide cost, gross margin, salary… |

## 2. Danh sách vai trò mặc định / Default roles

| Mã / Code | Vai trò (VI) | Role (EN) | Phạm vi mặc định / Default scope |
|---|---|---|---|
| `ADM` | Quản trị hệ thống | System administrator | Toàn hệ thống (chỉ cấu hình) / All (configuration only) |
| `CEO` | Ban giám đốc | Executive | Công ty / Company |
| `SAL` | Nhân viên kinh doanh | Sales staff | Của tôi / Own |
| `SLM` | Trưởng phòng kinh doanh | Sales manager | Phòng ban hoặc chi nhánh / Department or branch |
| `PUR` | Nhân viên mua hàng | Purchasing staff | Phòng ban / Department |
| `PUM` | Trưởng phòng mua hàng | Purchasing manager | Công ty / Company |
| `WH` | Thủ kho | Warehouse keeper | Kho được gán / Assigned warehouses |
| `WHM` | Quản lý kho | Warehouse manager | Chi nhánh / Branch |
| `ACC` | Kế toán viên | Accountant | Công ty / Company |
| `CAC` | Kế toán trưởng | Chief accountant | Công ty / Company |
| `CSH` | Thủ quỹ | Cashier | Quỹ được gán / Assigned cash funds |
| `HR` | Nhân viên nhân sự | HR staff | Công ty / Company |
| `HRM` | Trưởng phòng nhân sự | HR manager | Công ty / Company |
| `EMP` | Nhân viên (tự phục vụ) | Employee (self-service) | Của tôi / Own |
| `AUD` | Kiểm soát / Kiểm toán (chỉ xem) | Auditor (read-only) | Công ty / Company |

## 3. Ma trận phân quyền mặc định / Default permission matrix

Ký hiệu / Legend: `V` Xem / View · `C` Tạo / Create · `E` Sửa / Edit · `D` Xóa / Delete · `A` Duyệt / Approve · `—` Không / None

| Chức năng / Function | ADM | CEO | SAL | SLM | PUR | PUM | WH | WHM | ACC | CAC | CSH | HR | HRM | AUD |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Người dùng & vai trò / Users & roles | VCED | — | — | — | — | — | — | — | — | — | — | — | — | V |
| Cấu hình hệ thống / System settings | VCE | V | — | — | — | — | — | — | — | V | — | — | — | V |
| Nhật ký hệ thống / Audit log | V | V | — | — | — | — | — | — | — | V | — | — | — | V |
| Sản phẩm / Products | V | V | V | V | VCE | VCEA | V | VCE | V | VE | — | — | — | V |
| Khách hàng / Customers | — | V | VCE | VCEA | — | — | — | — | V | VE | V | — | — | V |
| Nhà cung cấp / Suppliers | — | V | — | — | VCE | VCEA | — | — | V | VE | V | — | — | V |
| Bảng giá bán / Price lists | — | VA | V | VCE | — | — | — | — | V | V | — | — | — | V |
| Báo giá / Quotations | — | V | VCE | VCEDA | — | — | — | — | — | — | — | — | — | V |
| Đơn bán hàng / Sales orders | — | VA | VCE | VCEDA | — | — | V | V | V | V | — | — | — | V |
| Trả hàng bán / Sales returns | — | V | VC | VCEA | — | — | V | V | V | VA | — | — | — | V |
| Đề nghị mua hàng / Purchase requests | — | VA | VC | VC | VCE | VCEA | VC | VC | VC | VC | — | VC | VC | V |
| Đơn mua hàng / Purchase orders | — | VA | — | — | VCE | VCEDA | V | V | V | V | — | — | — | V |
| Nhập / xuất / chuyển kho / Receipts, issues, transfers | — | V | — | — | V | V | VCE | VCEDA | V | V | — | — | — | V |
| Kiểm kê / Stock count | — | V | — | — | — | — | VCE | VCEA | V | VA | — | — | — | V |
| Hóa đơn bán / Customer invoices | — | V | V | V | — | — | — | — | VCE | VCEDA | — | — | — | V |
| Hóa đơn mua / Vendor bills | — | V | — | — | V | V | — | — | VCE | VCEDA | — | — | — | V |
| Phiếu thu / chi tiền mặt / Cash receipts & payments | — | VA | — | — | — | — | — | — | VCE | VCEDA | VCE | — | — | V |
| Giao dịch ngân hàng / Bank transactions | — | VA | — | — | — | — | — | — | VCE | VCEDA | — | — | — | V |
| Bút toán thủ công / Manual journal entries | — | — | — | — | — | — | — | — | VCE | VCEDA | — | — | — | V |
| Khóa sổ kỳ / Period close | — | V | — | — | — | — | — | — | — | VA | — | — | — | V |
| Báo cáo tài chính / Financial statements | — | V | — | — | — | — | — | — | V | V | — | — | — | V |
| Hồ sơ nhân sự / Employee records | — | V | — | — | — | — | — | — | — | — | — | VCE | VCEDA | — |
| Bảng lương / Payroll | — | VA | — | — | — | — | — | — | V | V | — | VCE | VCEA | — |
| Dashboard điều hành / Executive dashboard | — | V | — | — | — | — | — | — | — | V | — | — | — | — |

- **VI:** Ma trận trên là cấu hình mặc định khi khởi tạo; quản trị viên có thể thay đổi. Vai trò `EMP` chỉ truy cập cổng tự phục vụ (P2) và tạo đề nghị mua hàng / tạm ứng.
- **EN:** The matrix above is the initial default configuration; administrators can change it. The `EMP` role only accesses the self-service portal (P2) and can create purchase requests / advance requests.

## 4. Quy tắc phân tách nhiệm vụ / Segregation-of-duties rules

#### BR-ROL-001 · Không tự duyệt / No self-approval
`Must` · `P1`

- **VI:** Người tạo chứng từ không được duyệt chính chứng từ đó, kể cả khi có quyền duyệt.
- **EN:** The creator of a document cannot approve that same document, even if they hold the approve permission.

#### BR-ROL-002 · Tách thủ quỹ và ghi sổ / Separate cash handling and posting
`Must` · `P1`

- **VI:** Thủ quỹ không được tạo hoặc sửa bút toán sổ cái và không được duyệt phiếu chi.
- **EN:** Cashiers cannot create or edit GL journal entries and cannot approve cash payments.

#### BR-ROL-003 · Tách thông tin ngân hàng NCC và duyệt chi / Separate supplier bank details and payment approval
`Must` · `P1`

- **VI:** Người sửa tài khoản ngân hàng của nhà cung cấp không được duyệt thanh toán cho nhà cung cấp đó trong cùng kỳ.
- **EN:** A user who changes a supplier's bank account cannot approve payments to that supplier within the same period.

#### BR-ROL-004 · Điều chỉnh tồn kho cần duyệt / Stock adjustments require approval
`Must` · `P1`

- **VI:** Thủ kho không được điều chỉnh tồn kho (thừa/thiếu) nếu không qua phê duyệt của quản lý kho hoặc kế toán trưởng.
- **EN:** Warehouse keepers cannot post stock adjustments (surplus/shortage) without approval from the warehouse manager or chief accountant.

#### BR-ROL-005 · Quản trị viên không có quyền nghiệp vụ mặc định / Admins have no business permissions by default
`Must` · `P1`

- **VI:** Vai trò `ADM` chỉ có quyền cấu hình; không mặc định được xem hay sửa dữ liệu nghiệp vụ (đơn hàng, lương, sổ sách).
- **EN:** The `ADM` role has configuration rights only; by default it cannot view or edit business data (orders, payroll, ledgers).

#### BR-ROL-006 · Thay đổi phân quyền được ghi nhật ký / Permission changes are audited
`Must` · `P1`

- **VI:** Mọi thay đổi vai trò, quyền, phạm vi dữ liệu đều được ghi vào nhật ký kiểm toán (người thực hiện, thời điểm, giá trị trước – sau).
- **EN:** Every change to roles, permissions or data scope is written to the audit log (actor, timestamp, before/after values).

## 5. Câu hỏi mở / Open questions

| # | Câu hỏi (VI) | Question (EN) |
|---|---|---|
| Q-ROL-01 | Có cần thêm vai trò đặc thù (giám sát bán hàng theo vùng, kế toán kho, kế toán công nợ…)? | Are additional roles needed (regional sales supervisor, inventory accountant, AR/AP accountant…)? |
| Q-ROL-02 | Nhân viên kinh doanh có được xem giá vốn / lãi gộp không? | May sales staff see cost / gross margin? |
| Q-ROL-03 | Ngưỡng giá trị phiếu chi cần ban giám đốc duyệt? | Payment amount threshold requiring executive approval? |
