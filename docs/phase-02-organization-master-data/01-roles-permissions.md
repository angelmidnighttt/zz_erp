# 01 · Vai trò & Phân quyền / Roles & Permissions — Giai đoạn 2 / Phase 2

[← Giai đoạn 2 · Tổ chức & danh mục / Phase 2 · Organization & master data](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/01-roles-permissions.md) · [P3](../phase-03-inventory/01-roles-permissions.md) · [P4](../phase-04-purchasing/01-roles-permissions.md) · [P5](../phase-05-sales/01-roles-permissions.md) · [P6](../phase-06-receivables-payables-cash/01-roles-permissions.md) · [P7](../phase-07-approvals-controls/01-roles-permissions.md) · [P8](../phase-08-operations-completion/01-roles-permissions.md) · [P9](../phase-09-accounting-einvoicing/01-roles-permissions.md) · [P10](../phase-10-expansion/01-roles-permissions.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Các vai trò nghiệp vụ mặc định; quyền trên cấu hình, nhật ký và danh mục; sao chép vai trò; ghi nhật ký thay đổi phân quyền.
- **EN:** The default business roles; permissions on settings, audit log and master data; role cloning; auditing of permission changes.

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

#### BR-ROL-006 · Thay đổi phân quyền được ghi nhật ký / Permission changes are audited
`Must` · `P2`

- **VI:** Mọi thay đổi vai trò, quyền và việc gán vai trò cho người dùng đều được ghi vào nhật ký kiểm toán (người thực hiện, thời điểm, giá trị trước – sau).
- **EN:** Every change to roles, permissions and user role assignments is written to the audit log (actor, timestamp, before/after values).

| Quy tắc / Rule | Cơ chế (VI) | Mechanism (EN) |
|---|---|---|
| BR-ROL-005 | Dữ liệu khởi tạo: `ADM` chỉ có các dòng theo ma trận mục 3, không có quyền trên danh mục nghiệp vụ, chứng từ, lương, sổ sách. | Seed data: `ADM` only has the rows from the section 3 matrix, with no rights on business master data, documents, payroll or ledgers. |
| BR-ROL-006 | Mọi thay đổi trên `roles`, `role_permissions`, `user_roles` được ghi vào `audit_logs` trong cùng giao dịch. | Every change to `roles`, `role_permissions`, `user_roles` is written to `audit_logs` in the same transaction. |

## 5. Mô hình dữ liệu bổ sung / Data model additions

| Thay đổi / Change | Mục đích (VI) | Purpose (EN) |
|---|---|---|
| `roles.cloned_from_id` | Vai trò được sao chép từ vai trò nào (`FR-SYS-011`). | Which role this one was cloned from (`FR-SYS-011`). |
| `audit_logs` | Nhật ký kiểm toán dùng chung, chỉ ghi thêm (`FR-SYS-029`). | Shared, append-only audit log (`FR-SYS-029`). |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
ALTER TABLE roles
  ADD COLUMN cloned_from_id uuid REFERENCES roles(id);

-- Chỉ ghi thêm: thu hồi UPDATE/DELETE của tài khoản ứng dụng; nên phân vùng theo tháng
-- Append-only: revoke UPDATE/DELETE from the app account; consider monthly partitioning
CREATE TABLE audit_logs (
  id              bigint       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  occurred_at     timestamptz  NOT NULL DEFAULT now(),
  actor_user_id   uuid         REFERENCES users(id),
  entity_type     varchar(50)  NOT NULL,
  entity_id       varchar(100) NOT NULL,
  operation       varchar(10)  NOT NULL CHECK (operation IN ('INSERT','UPDATE','DELETE')),
  before_data     jsonb,
  after_data      jsonb,
  ip_address      inet,
  user_agent      text,
  correlation_id  varchar(64)
);
CREATE INDEX ON audit_logs (entity_type, entity_id, occurred_at DESC);
CREATE INDEX ON audit_logs (actor_user_id, occurred_at DESC);
```

</details>

## 6. Câu hỏi mở / Open questions

| # | Câu hỏi (VI) | Question (EN) |
|---|---|---|
| Q-ROL-01 | Có cần thêm vai trò đặc thù (giám sát bán hàng theo vùng, kế toán kho, kế toán công nợ…)? | Are additional roles needed (regional sales supervisor, inventory accountant, AR/AP accountant…)? |
