# Giai đoạn 1 — Nền tảng / Phase 1 — Foundation

[← Mục lục / Index](../README.md) · [P2 →](../phase-02-organization-master-data/README.md)

---

## 1. Mục tiêu & phạm vi / Goal & scope

- **VI:** Thiết lập dự án (cấu trúc mã nguồn, CI, cơ sở dữ liệu & migration, cấu hình môi trường) và triển khai tự động lên môi trường dev / staging; người dùng, đăng nhập / đăng xuất, đổi mật khẩu; vai trò và quyền theo ma trận chức năng × hành động.
- **EN:** Project setup (code layout, CI, database & migrations, environment configuration) and automated deployment to dev / staging; users, sign-in / sign-out, password change; roles and permissions as a function × action matrix.

## 2. Thiết lập dự án & triển khai / Project setup & deployment

| # | Hạng mục (VI) | Item (EN) | NFR |
|---|---|---|---|
| 1 | Cấu trúc mã nguồn `api/` + `web/`, Node 18 (`.nvmrc`), lint, kiểm thử tự động | Code layout `api/` + `web/`, Node 18 (`.nvmrc`), lint, automated tests | `NFR-MNT-001`, `NFR-MNT-003` |
| 2 | CI chạy cài đặt, lint, test, build và quét lỗ hổng thư viện cho cả hai dự án | CI runs install, lint, test, build and dependency vulnerability scanning for both projects | `NFR-MNT-004`, `NFR-SEC-008` |
| 3 | Cấu hình qua biến môi trường (`.env.example`); bí mật không nằm trong mã nguồn | Configuration through environment variables (`.env.example`); no secrets in source code | `NFR-SEC-007` |
| 4 | Kết nối cơ sở dữ liệu; migration có phiên bản; seed tài khoản quản trị đầu tiên, vai trò `ADM` và chức năng `SYS.USER_ROLE` | Database connection; versioned migrations; seed the first administrator account, the `ADM` role and the `SYS.USER_ROLE` function | `NFR-MNT-005` |
| 5 | Log có cấu trúc kèm mã truy vết; endpoint health check | Structured logs with correlation IDs; health-check endpoint | `NFR-OBS-001`, `NFR-OBS-003` |
| 6 | Tài liệu API OpenAPI sinh tự động | Auto-generated OpenAPI documentation | `NFR-MNT-006` |
| 7 | Triển khai tự động lên môi trường dev / staging qua HTTPS khi merge; môi trường production dựng trước go-live (P6) | Automated deployment to dev / staging over HTTPS on merge; the production environment is set up before go-live (P6) | `NFR-MNT-004`, `NFR-SEC-001` |
| 8 | Đánh giá yêu cầu lưu trữ dữ liệu tại Việt Nam trước khi chọn nơi đặt hạ tầng | Assess Vietnamese data-localization requirements before choosing where to host | `NFR-PRV-006` |

## 3. Tài liệu trong giai đoạn / Documents in this phase

| Tài liệu / Document | Nội dung (VI) | Yêu cầu / Requirements |
|---|---|---|
| [01 · Vai trò & Phân quyền / Roles & Permissions](01-roles-permissions.md) | Phân quyền theo vai trò ở mức tối thiểu: vai trò được làm hành động nào trên chức năng nào. Chỉ có vai trò `ADM` và chức năng quản lý người dùng & vai trò. | — |
| [02 · Quản trị hệ thống / System Administration (SYS)](02-system-administration.md) | Người dùng, đăng nhập / đăng xuất, đổi mật khẩu; vai trò & quyền theo ma trận chức năng × hành động. | FR-SYS-004, FR-SYS-005, FR-SYS-006, FR-SYS-011; BR-SYS-003 |

## 4. NFR bắt đầu áp dụng / NFRs starting in this phase

- **VI:** `NFR-SCL-001`, `NFR-SEC-001`, `NFR-SEC-002`, `NFR-SEC-003`, `NFR-SEC-004`, `NFR-SEC-005`, `NFR-SEC-006`, `NFR-SEC-007`, `NFR-SEC-008`, `NFR-SEC-009`, `NFR-PRV-001`, `NFR-PRV-006`, `NFR-USA-001`, `NFR-USA-004`, `NFR-L10N-002`, `NFR-L10N-004`, `NFR-L10N-005`, `NFR-MNT-001`, `NFR-MNT-003`, `NFR-MNT-004`, `NFR-MNT-005`, `NFR-MNT-006`, `NFR-OBS-001`, `NFR-OBS-003` — xem [12 · Yêu cầu phi chức năng](../common/12-non-functional.md).
- **EN:** `NFR-SCL-001`, `NFR-SEC-001`, `NFR-SEC-002`, `NFR-SEC-003`, `NFR-SEC-004`, `NFR-SEC-005`, `NFR-SEC-006`, `NFR-SEC-007`, `NFR-SEC-008`, `NFR-SEC-009`, `NFR-PRV-001`, `NFR-PRV-006`, `NFR-USA-001`, `NFR-USA-004`, `NFR-L10N-002`, `NFR-L10N-004`, `NFR-L10N-005`, `NFR-MNT-001`, `NFR-MNT-003`, `NFR-MNT-004`, `NFR-MNT-005`, `NFR-MNT-006`, `NFR-OBS-001`, `NFR-OBS-003` — see [12 · Non-functional requirements](../common/12-non-functional.md).

## 5. Điều kiện hoàn thành / Exit criteria

- **VI:** CI chạy lint, test, build; mỗi lần merge tự triển khai lên dev / staging; quản trị viên tạo người dùng, vai trò và gán quyền; người dùng đăng nhập, đăng xuất, đổi mật khẩu; mọi API từ chối thao tác không có quyền (có kiểm thử tự động).
- **EN:** CI runs lint, test and build; every merge deploys to dev / staging automatically; administrators create users and roles and grant permissions; users sign in, sign out and change passwords; every API rejects unauthorized actions (covered by automated tests).

## 6. Ghi chú / Notes

- **VI:** Mốc nội bộ, nghiệm thu trên dữ liệu thử. Chưa làm ở P1 — chuyển sang P2: quên mật khẩu qua email, khóa tài khoản, lịch sử mật khẩu, đăng xuất mọi thiết bị, sao chép vai trò, nhật ký kiểm toán, chuyển ngôn ngữ VI / EN. Chuyển sang P7: phạm vi dữ liệu, hạn mức, quyền theo trường, phân tách nhiệm vụ, xác thực hai lớp, quản lý phiên, luồng duyệt.
- **EN:** Internal milestone accepted on test data. Not in P1 — moved to P2: forgot password by email, lockout, password history, sign-out from all devices, role cloning, audit log, VI / EN language switching. Moved to P7: data scope, limits, field-level permissions, segregation of duties, MFA, session management, approval flows.
