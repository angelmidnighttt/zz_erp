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
`Must` · `P1` (mở rộng / extended: `P2`)

- **VI:** Người dùng đăng nhập bằng email hoặc tên đăng nhập và mật khẩu. Hệ thống dùng access token ngắn hạn và refresh token xoay vòng; người dùng đăng xuất khỏi thiết bị hiện tại.
- **EN:** Users sign in with email or username and password. The system uses short-lived access tokens with rotating refresh tokens; users sign out of the current device.

#### FR-SYS-006 · Chính sách mật khẩu & khóa tài khoản / Password policy & lockout
`Must` · `P1` (mở rộng / extended: `P2`)

- **VI:** Mật khẩu tối thiểu 10 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt. Người dùng đổi được mật khẩu của mình; quản trị viên đặt lại mật khẩu cho người dùng.
- **EN:** Passwords have at least 10 characters with upper case, lower case, digits and special characters. Users can change their own password; administrators reset passwords for users.

**Phân quyền / Authorization**

#### FR-SYS-011 · Quản lý vai trò & quyền / Role & permission management
`Must` · `P1` (mở rộng / extended: `P2`)

- **VI:** Quản trị viên tạo vai trò và gán quyền theo ma trận chức năng × hành động (xem [01 · Vai trò & phân quyền](01-roles-permissions.md)).
- **EN:** Administrators create roles and grant permissions as a function × action matrix (see [01 · Roles & permissions](01-roles-permissions.md)).

## 2. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-SYS-003 | Khi người dùng bị khóa, mọi phiên đăng nhập hiện có bị thu hồi ngay lập tức. | When a user is locked, all existing sessions are revoked immediately. | P1 |
