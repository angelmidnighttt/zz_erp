# Giai đoạn 7 — Phê duyệt & kiểm soát / Phase 7 — Approvals & controls

[← Mục lục / Index](../README.md) · [← P6](../phase-06-receivables-payables-cash/README.md) · [P8 →](../phase-08-operations-completion/README.md)

---

## 1. Mục tiêu & phạm vi / Goal & scope

- **VI:** Duyệt một cấp và luồng duyệt nhiều cấp có điều kiện; hạn mức, quyền theo trường, phạm vi phòng ban / chi nhánh / kho / quỹ, phân tách nhiệm vụ; kiểm tra hạn mức công nợ, giá bán tối thiểu; xác thực hai lớp, quản lý phiên; thông báo. Hoàn thiện tài khoản & phân quyền (chuyển từ P2): quên mật khẩu qua email, khóa tài khoản, lịch sử mật khẩu, đăng xuất mọi thiết bị, sao chép vai trò, nhật ký kiểm toán, chuyển ngôn ngữ giao diện theo người dùng.
- **EN:** Single-level approval and multi-level conditional flows; limits, field-level permissions, department / branch / warehouse / cash-fund scopes, segregation of duties; credit limit check, minimum selling price; MFA, session management; notifications. Account & access completion (moved from P2): forgot password by email, lockout, password history, sign-out from all devices, role cloning, audit log, per-user UI language switching.
- **VI:** Cần hoàn thành P6 trước.
- **EN:** Requires P6 to be finished.

## 2. Tài liệu trong giai đoạn / Documents in this phase

| Tài liệu / Document | Nội dung (VI) | Yêu cầu / Requirements |
|---|---|---|
| [01 · Vai trò & Phân quyền / Roles & Permissions](01-roles-permissions.md) | Phạm vi dữ liệu (của tôi, toàn công ty, phòng ban, chi nhánh, kho / quỹ được gán); quyền Duyệt trên danh mục; quyền theo trường; hạn mức theo vai trò hoặc người dùng; quy tắc phân tách nhiệm vụ; sao chép vai trò; ghi nhật ký thay đổi phân quyền. | BR-ROL-001, BR-ROL-002, BR-ROL-003, BR-ROL-006 |
| [02 · Quản trị hệ thống / System Administration (SYS)](02-system-administration.md) | Quên mật khẩu, khóa tài khoản, lịch sử mật khẩu, đăng xuất mọi thiết bị; xác thực hai lớp, quản lý phiên; sao chép vai trò; phạm vi dữ liệu, quyền theo trường, hạn mức; duyệt một cấp và luồng duyệt nhiều cấp; thông báo; nhật ký kiểm toán; chuyển ngôn ngữ theo người dùng. | FR-SYS-007, FR-SYS-008, FR-SYS-010, FR-SYS-012, FR-SYS-013, FR-SYS-014, FR-SYS-015, FR-SYS-016, FR-SYS-025, FR-SYS-029; mở rộng / extended: FR-SYS-004, FR-SYS-005, FR-SYS-006, FR-SYS-011, FR-SYS-031; BR-SYS-004, BR-SYS-005 |
| [03 · Dữ liệu danh mục / Master Data (MDM)](03-master-data.md) | Duyệt thay đổi thông tin nhạy cảm và thay đổi bảng giá; giá bán tối thiểu; lịch sử thay đổi danh mục. | FR-MDM-015, FR-MDM-024, FR-MDM-026; mở rộng / extended: FR-MDM-025; BR-MDM-004 |
| [04 · Bán hàng / Sales (SAL)](04-sales.md) | Kiểm tra hạn mức công nợ; duyệt đơn theo điều kiện; ẩn giá vốn, lãi gộp bằng quyền theo trường. | FR-SAL-012, FR-SAL-013; mở rộng / extended: FR-SAL-030; BR-SAL-003 |
| [05 · Mua hàng / Purchasing (PUR)](05-purchasing.md) | Duyệt đơn mua theo ngưỡng. | FR-PUR-009; BR-PUR-001, BR-PUR-005 |
| [06 · Kho / Inventory (INV)](06-inventory.md) | Người dùng chỉ thao tác trên kho được gán; duyệt điều chỉnh kiểm kê theo ngưỡng giá trị. | mở rộng / extended: FR-INV-001, FR-INV-015; BR-INV-006 |
| [10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT)](10-reporting.md) | Báo cáo tuân theo phạm vi dữ liệu và quyền theo trường. | mở rộng / extended: FR-RPT-006 |
| [11 · Tích hợp / Integrations (INT)](11-integrations.md) | Gửi email (quên mật khẩu, thông báo); cấu hình tên miền gửi, theo dõi trạng thái gửi. | FR-INT-006 |

## 3. NFR bắt đầu áp dụng / NFRs starting in this phase

- **VI:** `NFR-PRV-002`, `NFR-SUP-003` — xem [12 · Yêu cầu phi chức năng](../common/12-non-functional.md).
- **EN:** `NFR-PRV-002`, `NFR-SUP-003` — see [12 · Non-functional requirements](../common/12-non-functional.md).

## 4. Điều kiện hoàn thành / Exit criteria

- **VI:** Luồng duyệt được bật cho các chứng từ trọng yếu; bộ kiểm thử phân quyền (phạm vi dữ liệu, hạn mức, quyền theo trường, phân tách nhiệm vụ) đạt; quên mật khẩu, khóa tài khoản và nhật ký kiểm toán hoạt động.
- **EN:** Approval flows are on for key documents; the permission test suite (data scope, limits, field-level, segregation of duties) passes; forgot password, lockout and the audit log work.
