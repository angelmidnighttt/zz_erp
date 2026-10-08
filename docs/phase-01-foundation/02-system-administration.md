# 02 · Quản trị hệ thống / System Administration (SYS) — Giai đoạn 1 / Phase 1

[← Giai đoạn 1 · Nền tảng / Phase 1 · Foundation](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/02-system-administration.md) · [P3](../phase-03-inventory/02-system-administration.md) · [P7](../phase-07-approvals-controls/02-system-administration.md) · [P8](../phase-08-operations-completion/02-system-administration.md) · [P9](../phase-09-accounting-einvoicing/02-system-administration.md) · [P10](../phase-10-expansion/02-system-administration.md) · [P11](../phase-11-advanced/02-system-administration.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Người dùng, đăng nhập / đăng xuất, đổi mật khẩu; vai trò & quyền theo ma trận chức năng × hành động.
- **EN:** Users, login / logout, password change; roles & permissions as a function × action matrix.

## 1. Yêu cầu chức năng / Functional requirements

**Người dùng & xác thực / Users & authentication**

#### FR-SYS-004 · Quản lý người dùng / User management
`Must` · `P1` (mở rộng / extended: `P2`, `P7`)

- **VI:** Quản trị viên tạo, sửa, khóa/mở khóa người dùng; gán vai trò. Người dùng đã phát sinh dữ liệu không được xóa cứng.
- **EN:** Administrators create, edit, lock/unlock users; assign roles. Users with existing data cannot be hard-deleted.

#### FR-SYS-005 · Đăng nhập & đăng xuất / Login & logout
`Must` · `P1` (mở rộng / extended: `P7`)

- **VI:** Người dùng đăng nhập bằng email hoặc tên đăng nhập và mật khẩu. Hệ thống dùng access token ngắn hạn và refresh token xoay vòng; người dùng đăng xuất khỏi thiết bị hiện tại.
- **EN:** Users sign in with email or username and password. The system uses short-lived access tokens with rotating refresh tokens; users sign out of the current device.

#### FR-SYS-006 · Chính sách mật khẩu & khóa tài khoản / Password policy & lockout
`Must` · `P1` (mở rộng / extended: `P7`)

- **VI:** Mật khẩu tối thiểu 10 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt. Người dùng đổi được mật khẩu của mình; quản trị viên đặt lại mật khẩu cho người dùng.
- **EN:** Passwords have at least 10 characters with upper case, lower case, digits and special characters. Users can change their own password; administrators reset passwords for users.

**Phân quyền / Authorization**

#### FR-SYS-011 · Quản lý vai trò & quyền / Role & permission management
`Must` · `P1` (mở rộng / extended: `P7`)

- **VI:** Quản trị viên tạo vai trò và gán quyền theo ma trận chức năng × hành động (xem [01 · Vai trò & phân quyền](01-roles-permissions.md)).
- **EN:** Administrators create roles and grant permissions as a function × action matrix (see [01 · Roles & permissions](01-roles-permissions.md)).

## 2. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-SYS-003 | Khi người dùng bị khóa, mọi phiên đăng nhập hiện có bị thu hồi ngay lập tức. | When a user is locked, all existing sessions are revoked immediately. | P1 |

## 3. Mô hình dữ liệu / Data model

- **VI:** Các bảng người dùng, phiên đăng nhập, vai trò và quyền được khai báo một lần ở [01 · Vai trò & phân quyền, mục 4.4](01-roles-permissions.md); tệp này chỉ ánh xạ yêu cầu sang bảng và bổ sung trigger cho `BR-SYS-003`.
- **EN:** The user, session, role and permission tables are declared once in [01 · Roles & permissions, section 4.4](01-roles-permissions.md); this file only maps requirements to tables and adds a trigger for `BR-SYS-003`.

| Yêu cầu / Requirement | Bảng / Table | Ghi chú (VI) | Notes (EN) |
|---|---|---|---|
| FR-SYS-004 | `users`, `user_roles` | Không xóa cứng người dùng đã phát sinh dữ liệu: các cột `created_by` / `updated_by` trỏ tới `users(id)` không có `ON DELETE CASCADE`. | Users with data are never hard-deleted: `created_by` / `updated_by` columns reference `users(id)` without `ON DELETE CASCADE`. |
| FR-SYS-005 | `refresh_tokens` | Lưu băm token; đăng xuất = đặt `revoked_at`. | Tokens stored hashed; logout sets `revoked_at`. |
| FR-SYS-006 | `users.password_hash`, `users.password_changed_at` | Chính sách độ mạnh mật khẩu kiểm tra ở tầng ứng dụng. | Password strength is validated in the application layer. |
| FR-SYS-011 | `roles`, `role_permissions`, `app_functions` | — | — |
| BR-SYS-003 | `refresh_tokens.revoked_at` | Trigger dưới đây thu hồi mọi refresh token khi khóa người dùng; access token ngắn hạn vẫn phải được chặn bằng kiểm tra `users.is_locked` ở middleware xác thực. | The trigger below revokes every refresh token when a user is locked; short-lived access tokens must still be blocked by checking `users.is_locked` in the auth middleware. |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 01-roles-permissions.md (P1)

-- BR-SYS-003: khóa người dùng thì thu hồi ngay mọi refresh token còn hiệu lực
-- BR-SYS-003: locking a user immediately revokes every active refresh token
CREATE FUNCTION trg_users_revoke_tokens_on_lock() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  UPDATE refresh_tokens
     SET revoked_at = now()
   WHERE user_id = NEW.id
     AND revoked_at IS NULL;
  RETURN NEW;
END $$;

CREATE TRIGGER users_revoke_tokens_on_lock
AFTER UPDATE OF is_locked ON users
FOR EACH ROW
WHEN (NEW.is_locked AND NOT OLD.is_locked)
EXECUTE FUNCTION trg_users_revoke_tokens_on_lock();

-- Dữ liệu khởi tạo P1 (hạng mục 4 của README): vai trò ADM, chức năng SYS.USER_ROLE và quyền VCED.
-- Tài khoản quản trị đầu tiên do script seed tạo từ biến môi trường, không ghi mật khẩu trong mã nguồn.
-- P1 seed (README item 4): the ADM role, the SYS.USER_ROLE function and its VCED rights.
-- The first administrator account is created by the seed script from environment variables; no password in source code.
INSERT INTO roles (code, name_vi, name_en, is_system)
VALUES ('ADM', 'Quản trị hệ thống', 'System administrator', true)
ON CONFLICT (code) DO NOTHING;

INSERT INTO app_functions (code, module, name_vi, name_en, supported_actions, sort_order)
VALUES ('SYS.USER_ROLE', 'SYS', 'Người dùng & vai trò', 'Users & roles', '{VIEW,CREATE,EDIT,DELETE}', 10)
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (role_id, function_code, action)
SELECT r.id, 'SYS.USER_ROLE', a
FROM roles r
CROSS JOIN unnest('{VIEW,CREATE,EDIT,DELETE}'::permission_action[]) AS a
WHERE r.code = 'ADM'
ON CONFLICT DO NOTHING;
```

</details>
