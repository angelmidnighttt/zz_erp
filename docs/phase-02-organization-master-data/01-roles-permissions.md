# 01 · Vai trò & Phân quyền / Roles & Permissions — Giai đoạn 2 / Phase 2

[← Giai đoạn 2 · Tổ chức & danh mục / Phase 2 · Organization & master data](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/01-roles-permissions.md) · [P3](../phase-03-inventory/01-roles-permissions.md) · [P4](../phase-04-purchasing/01-roles-permissions.md) · [P5](../phase-05-sales/01-roles-permissions.md) · [P6](../phase-06-receivables-payables-cash/01-roles-permissions.md) · [P7](../phase-07-approvals-controls/01-roles-permissions.md) · [P8](../phase-08-operations-completion/01-roles-permissions.md) · [P9](../phase-09-accounting-einvoicing/01-roles-permissions.md) · [P10](../phase-10-expansion/01-roles-permissions.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Phạm vi dữ liệu Của tôi / Toàn công ty; các vai trò nghiệp vụ mặc định; quyền trên cấu hình, nhật ký và danh mục; sao chép vai trò; ghi nhật ký thay đổi phân quyền.
- **EN:** Own / All data scope; the default business roles; permissions on settings, audit log and master data; role cloning; auditing of permission changes.

## 1. Phạm vi dữ liệu / Data scope

- **VI:** Mỗi quyền có thêm phạm vi dữ liệu (`FR-SYS-012`). Giai đoạn này chỉ có hai phạm vi: Của tôi / Own và Toàn công ty / All. Các phạm vi Phòng ban, Chi nhánh, Kho / quỹ được gán bổ sung ở [P7](../phase-07-approvals-controls/01-roles-permissions.md).
- **EN:** Each permission now carries a data scope (`FR-SYS-012`). This phase only has two scopes: Own and All. The Department, Branch and Assigned warehouse / cash-fund scopes are added in [P7](../phase-07-approvals-controls/01-roles-permissions.md).

| Phạm vi / Scope | Điều kiện lọc (VI) | Filter (EN) |
|---|---|---|
| `OWN` | `owner_id` = người dùng hiện tại | `owner_id` = current user |
| `ALL` | Không lọc (toàn công ty) | No filter (whole company) |

| # | Quy tắc tính quyền (VI) | Resolution rule (EN) |
|---|---|---|
| 3 | Mỗi vai trò cấp quyền tạo ra một điều kiện lọc theo phạm vi (bảng trên); điều kiện hiệu lực là **OR** của các điều kiện đó. | Each granting role yields one scope filter (table above); the effective filter is the **OR** of those filters. |

- **VI:** Quy tắc 1, 2 xem [P1](../phase-01-foundation/01-roles-permissions.md). Để áp dụng được phạm vi dữ liệu, mọi bảng danh mục có người phụ trách và mọi bảng chứng từ phải có `owner_id` (người phụ trách, mặc định là người tạo), `branch_id`, `department_id`.
- **EN:** Rules 1 and 2 are in [P1](../phase-01-foundation/01-roles-permissions.md). For data scope to work, every master table with an owner and every document table must carry `owner_id` (the responsible user, defaulting to the creator), `branch_id` and `department_id`.

## 2. Vai trò mặc định bổ sung / Additional default roles

| Mã / Code | Vai trò (VI) | Role (EN) | Phạm vi mặc định / Default scope |
|---|---|---|---|
| `CEO` | Ban giám đốc | Executive | Toàn công ty / All |
| `SAL` | Nhân viên kinh doanh | Sales staff | Của tôi / Own |
| `SLM` | Trưởng phòng kinh doanh | Sales manager | Phòng ban hoặc chi nhánh / Department or branch |
| `PUR` | Nhân viên mua hàng | Purchasing staff | Phòng ban / Department |
| `PUM` | Trưởng phòng mua hàng | Purchasing manager | Toàn công ty / All |
| `WH` | Thủ kho | Warehouse keeper | Kho được gán / Assigned warehouses |
| `WHM` | Quản lý kho | Warehouse manager | Chi nhánh / Branch |
| `ACC` | Kế toán viên | Accountant | Toàn công ty / All |
| `CAC` | Kế toán trưởng | Chief accountant | Toàn công ty / All |
| `CSH` | Thủ quỹ | Cashier | Quỹ được gán / Assigned cash funds |
| `AUD` | Kiểm soát / Kiểm toán (chỉ xem) | Auditor (read-only) | Toàn công ty / All |

- **VI:** `ADM` (từ P1) có phạm vi mặc định Toàn công ty (chỉ cấu hình). Các vai trò có phạm vi mặc định là phòng ban, chi nhánh hoặc kho / quỹ được gán dùng Toàn công ty cho đến P7.
- **EN:** `ADM` (from P1) has the default scope All (configuration only). Roles whose default scope is department, branch or assigned warehouses / cash funds use All until P7.

## 3. Ma trận phân quyền mặc định / Default permission matrix

Ký hiệu / Legend: `V` Xem / View · `C` Tạo / Create · `E` Sửa / Edit · `D` Xóa / Delete · `A` Duyệt / Approve · `—` Không / None

| Chức năng / Function | Mã / Code | ADM | CEO | SAL | SLM | PUR | PUM | WH | WHM | ACC | CAC | CSH | AUD |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Người dùng & vai trò / Users & roles (từ P1 / from P1) | `SYS.USER_ROLE` | VCED | — | — | — | — | — | — | — | — | — | — | V |
| Cấu hình hệ thống / System settings | `SYS.SETTINGS` | VCE | V | — | — | — | — | — | — | — | V | — | V |
| Nhật ký hệ thống / Audit log | `SYS.AUDIT_LOG` | V | V | — | — | — | — | — | — | — | V | — | V |
| Sản phẩm / Products | `MDM.PRODUCT` | V | V | V | V | VCE | VCEA | V | VCE | V | VE | — | V |
| Khách hàng / Customers | `MDM.CUSTOMER` | — | V | VCE | VCEA | — | — | — | — | V | VE | V | V |
| Nhà cung cấp / Suppliers | `MDM.SUPPLIER` | — | V | — | — | VCE | VCEA | — | — | V | VE | V | V |
| Bảng giá bán / Price lists | `MDM.PRICE_LIST` | — | VA | V | VCE | — | — | — | — | V | V | — | V |

- **VI:** Ma trận là cấu hình mặc định khi khởi tạo; quản trị viên có thể thay đổi. Ô có `A` chỉ có tác dụng từ khi có luồng duyệt (P7).
- **EN:** The matrix is the initial default configuration; administrators can change it. Cells with `A` only take effect once approval flows exist (P7).

Ví dụ / Example — ô `SAL` × Khách hàng = `VCE` trở thành 3 dòng `role_permissions` / becomes 3 `role_permissions` rows:

| role | function_code | action | data_scope |
|---|---|---|---|
| `SAL` | `MDM.CUSTOMER` | `VIEW` | `NULL` → `OWN` |
| `SAL` | `MDM.CUSTOMER` | `CREATE` | `NULL` → `OWN` |
| `SAL` | `MDM.CUSTOMER` | `EDIT` | `NULL` → `OWN` |

## 4. Quy tắc nghiệp vụ / Business rules

#### BR-ROL-005 · Quản trị viên không có quyền nghiệp vụ mặc định / Admins have no business permissions by default
`Must` · `P2`

- **VI:** Vai trò `ADM` chỉ có quyền cấu hình; không mặc định được xem hay sửa dữ liệu nghiệp vụ (đơn hàng, lương, sổ sách).
- **EN:** The `ADM` role has configuration rights only; by default it cannot view or edit business data (orders, payroll, ledgers).

#### BR-ROL-006 · Thay đổi phân quyền được ghi nhật ký / Permission changes are audited
`Must` · `P2`

- **VI:** Mọi thay đổi vai trò, quyền, phạm vi dữ liệu đều được ghi vào nhật ký kiểm toán (người thực hiện, thời điểm, giá trị trước – sau).
- **EN:** Every change to roles, permissions or data scope is written to the audit log (actor, timestamp, before/after values).

| Quy tắc / Rule | Cơ chế (VI) | Mechanism (EN) |
|---|---|---|
| BR-ROL-005 | Dữ liệu khởi tạo: `ADM` chỉ có các dòng theo ma trận mục 3, không có quyền trên danh mục nghiệp vụ, chứng từ, lương, sổ sách. | Seed data: `ADM` only has the rows from the section 3 matrix, with no rights on business master data, documents, payroll or ledgers. |
| BR-ROL-006 | Mọi thay đổi trên `roles`, `role_permissions`, `user_roles` được ghi vào `audit_logs` trong cùng giao dịch. | Every change to `roles`, `role_permissions`, `user_roles` is written to `audit_logs` in the same transaction. |

## 5. Mô hình dữ liệu bổ sung / Data model additions

| Thay đổi / Change | Mục đích (VI) | Purpose (EN) |
|---|---|---|
| `roles.default_data_scope` | Phạm vi mặc định của vai trò. | The role's default scope. |
| `roles.cloned_from_id` | Vai trò được sao chép từ vai trò nào (`FR-SYS-011`). | Which role this one was cloned from (`FR-SYS-011`). |
| `role_permissions.data_scope` | Phạm vi riêng của một ô quyền; để trống thì dùng phạm vi mặc định của vai trò. | Scope of one permission cell; empty falls back to the role's default scope. |
| `audit_logs` | Nhật ký kiểm toán dùng chung, chỉ ghi thêm (`FR-SYS-029`). | Shared, append-only audit log (`FR-SYS-029`). |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Giá trị DEPARTMENT, BRANCH, ASSIGNED được thêm ở P7 / DEPARTMENT, BRANCH, ASSIGNED are added in P7
CREATE TYPE data_scope AS ENUM ('OWN','ALL');

ALTER TABLE roles
  ADD COLUMN default_data_scope data_scope NOT NULL DEFAULT 'ALL',
  ADD COLUMN cloned_from_id     uuid REFERENCES roles(id);

ALTER TABLE role_permissions
  ADD COLUMN data_scope data_scope;  -- NULL = roles.default_data_scope

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
