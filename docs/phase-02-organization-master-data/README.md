# Giai đoạn 2 — Tổ chức & danh mục / Phase 2 — Organization & master data

[← Mục lục / Index](../README.md) · [← P1](../phase-01-foundation/README.md) · [P3 →](../phase-03-inventory/README.md)

---

## 1. Mục tiêu & phạm vi / Goal & scope

- **VI:** Thông tin doanh nghiệp, chi nhánh, phòng ban, năm tài chính & kỳ kế toán, tham số hệ thống; sản phẩm, đối tác, kho, tiền tệ, thuế, điều khoản thanh toán, bảng giá bán cùng các quy tắc nghiệp vụ của danh mục; đính kèm, nhập / xuất Excel, tìm kiếm. Phân quyền giữ nguyên mô hình chức năng × hành động của P1, chỉ nạp thêm các vai trò nghiệp vụ và ma trận mặc định.
- **EN:** Company profile, branches, departments, fiscal years & periods, system parameters; products, partners, warehouses, currencies, taxes, payment terms, sales price lists and their business rules; attachments, Excel import / export, search. Authorization keeps the P1 function × action model; only the business roles and the default matrix are added.
- **VI:** Cần hoàn thành P1 trước.
- **EN:** Requires P1 to be finished.

## 2. Tài liệu trong giai đoạn / Documents in this phase

| Tài liệu / Document | Nội dung (VI) | Yêu cầu / Requirements |
|---|---|---|
| [01 · Vai trò & Phân quyền / Roles & Permissions](01-roles-permissions.md) | Các vai trò nghiệp vụ mặc định; ma trận quyền Xem / Tạo / Sửa / Xóa trên cấu hình và danh mục. | BR-ROL-005 |
| [02 · Quản trị hệ thống / System Administration (SYS)](02-system-administration.md) | Thông tin doanh nghiệp, chi nhánh, phòng ban; liên kết người dùng với nhân viên; tham số hệ thống; tên tiếng Anh trên danh mục; đính kèm, nhập / xuất Excel, tìm kiếm. | FR-SYS-001, FR-SYS-002, FR-SYS-003, FR-SYS-020, FR-SYS-023, FR-SYS-026, FR-SYS-027, FR-SYS-028, FR-SYS-031; mở rộng / extended: FR-SYS-004; BR-SYS-002 |
| [03 · Dữ liệu danh mục / Master Data (MDM)](03-master-data.md) | Sản phẩm, nhóm sản phẩm, đơn vị tính; khách hàng, nhà cung cấp, nhóm đối tác; tiền tệ & tỷ giá (nhập tay), thuế suất, điều khoản & phương thức thanh toán, tài khoản ngân hàng; kho, nhân viên cơ bản; bảng giá bán đơn giản. | FR-MDM-001, FR-MDM-002, FR-MDM-003, FR-MDM-009, FR-MDM-010, FR-MDM-011, FR-MDM-012, FR-MDM-014, FR-MDM-016, FR-MDM-017, FR-MDM-018, FR-MDM-019, FR-MDM-020, FR-MDM-021, FR-MDM-022, FR-MDM-025; BR-MDM-001, BR-MDM-002, BR-MDM-003, BR-MDM-005, BR-MDM-006 |
| [07 · Kế toán – Tài chính / Accounting & Finance (ACC)](07-accounting-finance.md) | Năm tài chính & kỳ kế toán. | FR-ACC-002; BR-ACC-009, BR-ACC-008 |
| [11 · Tích hợp / Integrations (INT)](11-integrations.md) | Lưu trữ tệp. | FR-INT-017, FR-INT-021 |

## 3. NFR bắt đầu áp dụng / NFRs starting in this phase

- **VI:** `NFR-L10N-001`, `NFR-DAT-001`, `NFR-DAT-003`, `NFR-DAT-004`, `NFR-MNT-002` — xem [12 · Yêu cầu phi chức năng](../common/12-non-functional.md).
- **EN:** `NFR-L10N-001`, `NFR-DAT-001`, `NFR-DAT-003`, `NFR-DAT-004`, `NFR-MNT-002` — see [12 · Non-functional requirements](../common/12-non-functional.md).

## 4. Điều kiện hoàn thành / Exit criteria

- **VI:** Cơ cấu tổ chức và danh mục được khai báo đầy đủ; danh mục từ hệ thống cũ được nhập thành công qua mẫu Excel; các quy tắc nghiệp vụ của danh mục (`BR-MDM-*`, `BR-SYS-002`) có kiểm thử tự động; mọi API từ chối thao tác không có quyền theo ma trận.
- **EN:** Organization and master data are fully set up; legacy master data is imported through the Excel templates; the master-data business rules (`BR-MDM-*`, `BR-SYS-002`) are covered by automated tests; every API rejects operations not allowed by the matrix.

## 5. Ghi chú / Notes

- **VI:** Mốc nội bộ, nghiệm thu trên dữ liệu thử.
- **EN:** Internal milestone accepted on test data.
- **VI:** Chuyển sang [P7](../phase-07-approvals-controls/README.md) để P2 tập trung vào danh mục và logic nghiệp vụ: quên mật khẩu qua email, khóa tài khoản, lịch sử mật khẩu, đăng xuất mọi thiết bị, sao chép vai trò, nhật ký kiểm toán (kể cả ghi nhật ký thay đổi phân quyền và lịch sử thay đổi danh mục), chuyển ngôn ngữ giao diện theo người dùng.
- **EN:** Moved to [P7](../phase-07-approvals-controls/README.md) so that P2 focuses on master data and business logic: forgot password by email, lockout, password history, sign-out from all devices, role cloning, the audit log (including auditing of permission changes and master-data change history), per-user UI language switching.
- **VI:** Để bổ sung nhật ký kiểm toán ở P7 mà không phải sửa lại: mọi bảng tạo ở P2 có `created_at`, `created_by`, `updated_at`, `updated_by`; mọi thao tác ghi đi qua tầng service trong một giao dịch, để sau này ghi `audit_logs` ngay trong giao dịch đó.
- **EN:** So the audit log can be added in P7 without rework: every table created in P2 has `created_at`, `created_by`, `updated_at`, `updated_by`; every write goes through the service layer inside one transaction, so `audit_logs` can later be written in that same transaction.
