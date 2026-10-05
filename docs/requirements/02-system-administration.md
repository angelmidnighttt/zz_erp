# 02 · Quản trị hệ thống / System Administration (SYS)

[← Mục lục / Index](../README.md)

---

## 1. Mục tiêu / Objectives

- **VI:** Cung cấp nền tảng dùng chung cho mọi phân hệ: cơ cấu tổ chức, người dùng, xác thực, phân quyền, luồng phê duyệt, đánh số chứng từ, mẫu in, thông báo, nhập/xuất dữ liệu và nhật ký kiểm toán.
- **EN:** Provide the shared foundation for all modules: organization structure, users, authentication, authorization, approval workflows, document numbering, print templates, notifications, data import/export and audit logging.

## 2. Yêu cầu chức năng / Functional requirements

### 2.1 Cơ cấu tổ chức / Organization structure

#### FR-SYS-001 · Thông tin doanh nghiệp / Company profile
`Must` · `P1`

- **VI:** Hệ thống chỉ phục vụ một công ty (một pháp nhân); không có chức năng thêm, xóa hay chuyển đổi giữa các công ty. Quản trị viên cấu hình thông tin doanh nghiệp: tên, tên tiếng Anh, mã số thuế, địa chỉ, người đại diện pháp luật, logo, đồng tiền hạch toán, chế độ kế toán, năm tài chính. Thông tin này được dùng cho mẫu in, hóa đơn điện tử và báo cáo.
- **EN:** The system serves a single company (one legal entity); there is no function to add, delete or switch between companies. Administrators configure the company profile: name, English name, tax ID, address, legal representative, logo, functional currency, accounting regime and fiscal year. This profile is used on print templates, e-invoices and reports.

#### FR-SYS-002 · Quản lý chi nhánh / Manage branches
`Must` · `P1`

- **VI:** Doanh nghiệp có nhiều chi nhánh (mã, tên, địa chỉ, mã số thuế chi nhánh dạng 10-3 số nếu có, giám đốc chi nhánh). Chứng từ luôn gắn với một chi nhánh.
- **EN:** The company has multiple branches (code, name, address, branch tax ID in 10-3 format if any, branch manager). Every document belongs to one branch.

#### FR-SYS-003 · Quản lý phòng ban / Manage departments
`Must` · `P1`

- **VI:** Phòng ban được tổ chức dạng cây không giới hạn cấp, có trưởng bộ phận. Phòng ban dùng cho phân quyền dữ liệu, luồng duyệt và chiều phân tích chi phí.
- **EN:** Departments form an unlimited-depth tree with a department head. Departments drive data scope, approval routing and cost analysis dimensions.

### 2.2 Người dùng & xác thực / Users & authentication

#### FR-SYS-004 · Quản lý người dùng / User management
`Must` · `P1`

- **VI:** Quản trị viên tạo, sửa, khóa/mở khóa người dùng; gán vai trò, chi nhánh, phòng ban, kho và quỹ được truy cập; liên kết người dùng với hồ sơ nhân viên. Người dùng đã phát sinh dữ liệu không được xóa cứng.
- **EN:** Administrators create, edit, lock/unlock users; assign roles and accessible branches, departments, warehouses and cash funds; link users to employee records. Users with existing data cannot be hard-deleted.

#### FR-SYS-005 · Đăng nhập & đăng xuất / Login & logout
`Must` · `P1`

- **VI:** Người dùng đăng nhập bằng email hoặc tên đăng nhập và mật khẩu. Hệ thống dùng access token ngắn hạn và refresh token xoay vòng; cho phép đăng xuất khỏi thiết bị hiện tại hoặc tất cả thiết bị.
- **EN:** Users sign in with email or username and password. The system uses short-lived access tokens with rotating refresh tokens; users can sign out of the current device or all devices.

#### FR-SYS-006 · Chính sách mật khẩu & khóa tài khoản / Password policy & lockout
`Must` · `P1`

- **VI:** Mật khẩu tối thiểu 10 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt; không trùng 5 mật khẩu gần nhất. Tài khoản bị khóa tạm thời sau 5 lần đăng nhập sai liên tiếp trong 15 phút. Các tham số này cấu hình được.
- **EN:** Passwords have at least 10 characters with upper case, lower case, digits and special characters, and must differ from the last 5 passwords. Accounts are temporarily locked after 5 consecutive failed logins within 15 minutes. These parameters are configurable.

#### FR-SYS-007 · Quên mật khẩu / Forgot password
`Must` · `P1`

- **VI:** Người dùng nhận liên kết đặt lại mật khẩu qua email; liên kết dùng một lần và hết hạn sau 30 phút. Hệ thống không tiết lộ email có tồn tại hay không.
- **EN:** Users receive a password-reset link by email; the link is single-use and expires after 30 minutes. The system does not reveal whether an email exists.

#### FR-SYS-008 · Xác thực hai lớp / Multi-factor authentication
`Should` · `P1`

- **VI:** Hỗ trợ xác thực hai lớp bằng ứng dụng TOTP (Google Authenticator, Microsoft Authenticator). Bắt buộc với vai trò `ADM`, `CAC`, `CEO` (cấu hình được).
- **EN:** Support MFA with TOTP apps (Google Authenticator, Microsoft Authenticator). Mandatory for `ADM`, `CAC`, `CEO` roles (configurable).

#### FR-SYS-009 · Đăng nhập một lần / Single sign-on
`Could` · `P3`

- **VI:** Hỗ trợ đăng nhập bằng Google Workspace hoặc Microsoft Entra ID (OIDC).
- **EN:** Support sign-in via Google Workspace or Microsoft Entra ID (OIDC).

#### FR-SYS-010 · Quản lý phiên đăng nhập / Session management
`Should` · `P1`

- **VI:** Người dùng xem danh sách phiên đang hoạt động (thiết bị, IP, thời gian) và thu hồi phiên. Hệ thống tự đăng xuất sau 30 phút không hoạt động (cấu hình được).
- **EN:** Users view active sessions (device, IP, time) and can revoke them. The system signs out automatically after 30 minutes of inactivity (configurable).

### 2.3 Phân quyền / Authorization

#### FR-SYS-011 · Quản lý vai trò & quyền / Role & permission management
`Must` · `P1`

- **VI:** Quản trị viên tạo vai trò tùy chỉnh, sao chép vai trò có sẵn và gán quyền theo ma trận chức năng × hành động (xem [01 · Vai trò & phân quyền](01-roles-permissions.md)).
- **EN:** Administrators create custom roles, clone existing roles and grant permissions as a function × action matrix (see [01 · Roles & permissions](01-roles-permissions.md)).

#### FR-SYS-012 · Phạm vi dữ liệu / Data scope
`Must` · `P1`

- **VI:** Mỗi vai trò có phạm vi dữ liệu (của tôi, phòng ban, chi nhánh, kho / quỹ được gán, toàn công ty). Phạm vi áp dụng cho danh sách, tìm kiếm, báo cáo, xuất dữ liệu và API.
- **EN:** Each role has a data scope (own, department, branch, assigned warehouses / cash funds, whole company). Scope applies to lists, search, reports, exports and the API.

#### FR-SYS-013 · Quyền theo trường dữ liệu / Field-level permissions
`Should` · `P1`

- **VI:** Có thể ẩn các trường nhạy cảm (giá vốn, lãi gộp, giá mua, lương) theo vai trò trên màn hình, báo cáo, bản in và dữ liệu xuất.
- **EN:** Sensitive fields (cost, gross margin, purchase price, salary) can be hidden per role on screens, reports, printouts and exports.

#### FR-SYS-014 · Hạn mức theo vai trò / Role-based limits
`Should` · `P1`

- **VI:** Cấu hình hạn mức theo vai trò hoặc người dùng: % chiết khấu tối đa, giá trị đơn tối đa được tự xác nhận, giá trị duyệt tối đa.
- **EN:** Configure limits per role or user: maximum discount %, maximum order value that can be self-confirmed, maximum approval amount.

### 2.4 Luồng phê duyệt / Approval workflow

#### FR-SYS-015 · Cấu hình luồng duyệt / Configure approval flows
`Must` · `P1`

- **VI:** Cấu hình luồng duyệt theo loại chứng từ với điều kiện (giá trị, chi nhánh, phòng ban, % chiết khấu, loại chi phí) và nhiều cấp duyệt tuần tự. Người duyệt có thể là người dùng cụ thể, vai trò hoặc "quản lý trực tiếp". Duyệt song song (tất cả / bất kỳ) là `Should`, `P2`.
- **EN:** Configure approval flows per document type with conditions (amount, branch, department, discount %, expense type) and multiple sequential levels. Approvers can be a specific user, a role or "direct manager". Parallel approval (all / any) is `Should`, `P2`.

#### FR-SYS-016 · Thực hiện duyệt / Approve or reject
`Must` · `P1`

- **VI:** Người duyệt có thể duyệt, từ chối (bắt buộc nhập lý do) hoặc trả lại để sửa. Lịch sử duyệt (người, thời điểm, ý kiến) hiển thị trên chứng từ. Có màn hình "Chờ tôi duyệt" và duyệt hàng loạt.
- **EN:** Approvers can approve, reject (reason required) or return for revision. Approval history (who, when, comments) is shown on the document. There is a "Waiting for my approval" inbox and bulk approval.

#### FR-SYS-017 · Ủy quyền duyệt / Approval delegation
`Should` · `P2`

- **VI:** Người duyệt ủy quyền cho người khác trong một khoảng thời gian (ví dụ khi nghỉ phép). Chứng từ được duyệt theo ủy quyền ghi rõ "duyệt thay".
- **EN:** Approvers delegate to another user for a period (e.g. during leave). Documents approved under delegation are marked "approved on behalf of".

#### FR-SYS-018 · Nhắc duyệt & chuyển cấp / Reminders & escalation
`Could` · `P2`

- **VI:** Gửi nhắc khi chứng từ chờ duyệt quá N giờ; tùy chọn tự chuyển lên cấp trên.
- **EN:** Send reminders when a document has been pending for more than N hours; optionally escalate to the next level.

### 2.5 Cấu hình chung / General settings

#### FR-SYS-019 · Đánh số chứng từ / Document numbering
`Must` · `P1`

- **VI:** Cấu hình mẫu số chứng từ theo loại chứng từ và chi nhánh, gồm tiền tố, mã chi nhánh, năm/tháng và số tự tăng (ví dụ `SO-HN-2610-00001`); đặt lại bộ đếm theo năm hoặc tháng. Số chính thức được cấp khi chứng từ được xác nhận; số đã cấp không được tái sử dụng.
- **EN:** Configure numbering patterns per document type and branch, including prefix, branch code, year/month and sequence (e.g. `SO-HN-2610-00001`); reset counters yearly or monthly. The official number is assigned on confirmation; issued numbers are never reused.

#### FR-SYS-020 · Tham số hệ thống / System parameters
`Must` · `P1`

- **VI:** Cấu hình: ngôn ngữ mặc định, múi giờ (mặc định Asia/Ho_Chi_Minh), định dạng ngày và số, số chữ số thập phân cho số lượng / đơn giá / thành tiền / tỷ giá, cho phép xuất âm kho, phương pháp tính giá xuất kho, chính sách xuất hóa đơn mặc định.
- **EN:** Configure: default language, time zone (default Asia/Ho_Chi_Minh), date and number formats, decimal places for quantity / unit price / amount / exchange rate, negative stock policy, inventory costing method, default invoicing policy.

#### FR-SYS-021 · Mẫu in chứng từ / Print templates
`Must` · `P1`

- **VI:** Mỗi loại chứng từ có mẫu in mặc định (báo giá, đơn hàng, phiếu nhập/xuất kho, phiếu thu/chi, biên bản đối chiếu…) theo mẫu của chế độ kế toán áp dụng; cho phép chỉnh logo, chữ ký, chân trang, ngôn ngữ (VI, EN, song ngữ); hiển thị số tiền bằng chữ; xuất PDF.
- **EN:** Each document type has default print templates (quotation, order, goods receipt/issue, cash receipt/payment, reconciliation statement…) following the applicable accounting regime forms; logo, signatures, footer and language (VI, EN, bilingual) are customizable; amounts are spelled out in words; export to PDF.

#### FR-SYS-022 · Mẫu email / Email templates
`Should` · `P1`

- **VI:** Cấu hình mẫu email (tiêu đề, nội dung, biến động như tên khách hàng, số chứng từ) cho gửi báo giá, đơn hàng, hóa đơn, nhắc nợ, đặt lại mật khẩu.
- **EN:** Configure email templates (subject, body, variables such as customer name, document number) for quotations, orders, invoices, payment reminders and password reset.

### 2.6 Tiện ích dùng chung / Common utilities

#### FR-SYS-023 · Đính kèm tệp / Attachments
`Must` · `P1`

- **VI:** Đính kèm tệp (PDF, ảnh, Word, Excel, XML) vào mọi chứng từ và danh mục; tối đa 20 MB/tệp (cấu hình được); xem trước PDF và ảnh.
- **EN:** Attach files (PDF, images, Word, Excel, XML) to any document or master record; max 20 MB per file (configurable); preview PDFs and images.

#### FR-SYS-024 · Trao đổi trên chứng từ / Comments & mentions
`Should` · `P2`

- **VI:** Người dùng bình luận trên chứng từ, nhắc tên (@mention) đồng nghiệp để nhận thông báo.
- **EN:** Users comment on documents and @mention colleagues to notify them.

#### FR-SYS-025 · Thông báo / Notifications
`Must` · `P1`

- **VI:** Thông báo trong ứng dụng và qua email cho các sự kiện: chờ duyệt, được duyệt/từ chối, chứng từ được giao xử lý, hợp đồng/lô hàng sắp hết hạn, công nợ đến hạn. Người dùng tùy chọn kênh nhận cho từng loại.
- **EN:** In-app and email notifications for: pending approval, approved/rejected, document assigned, contract/lot nearing expiry, receivable/payable due. Users choose channels per notification type.

#### FR-SYS-026 · Nhập dữ liệu từ Excel / Excel import
`Must` · `P1`

- **VI:** Cung cấp mẫu Excel tải về cho danh mục và số dư đầu kỳ; kiểm tra dữ liệu và báo lỗi theo từng dòng; có chế độ chạy thử (không ghi dữ liệu) trước khi nhập thật; nhập là giao dịch toàn vẹn (lỗi thì không ghi dòng nào) hoặc bỏ qua dòng lỗi (tùy chọn).
- **EN:** Provide downloadable Excel templates for master data and opening balances; validate and report errors per row; offer a dry-run mode (no data written) before the real import; imports are all-or-nothing or skip-invalid-rows (selectable).

#### FR-SYS-027 · Xuất dữ liệu / Data export
`Must` · `P1`

- **VI:** Mọi danh sách xuất được ra Excel / CSV / PDF theo bộ lọc và cột đang hiển thị, tuân theo phân quyền dữ liệu và quyền theo trường.
- **EN:** Every list can be exported to Excel / CSV / PDF using the current filters and visible columns, respecting data scope and field-level permissions.

#### FR-SYS-028 · Tìm kiếm & bộ lọc / Search & filters
`Must` · `P1`

- **VI:** Tìm nhanh toàn cục theo mã/tên; bộ lọc nâng cao theo nhiều điều kiện; lưu bộ lọc cá nhân; chọn và sắp xếp cột hiển thị. Tìm kiếm tiếng Việt không phân biệt dấu (gõ "nguyen" tìm được "Nguyễn").
- **EN:** Global quick search by code/name; advanced multi-condition filters; saved personal filters; choose and reorder visible columns. Vietnamese search is accent-insensitive (typing "nguyen" finds "Nguyễn").

#### FR-SYS-029 · Nhật ký kiểm toán / Audit log
`Must` · `P1`

- **VI:** Ghi nhận mọi thao tác tạo, sửa, xóa, duyệt, hủy, in, xuất dữ liệu, đăng nhập (thành công/thất bại) với: người dùng, thời điểm, IP, giá trị trước – sau. Nhật ký không thể sửa hoặc xóa bởi bất kỳ người dùng nào; tra cứu theo chứng từ, người dùng, khoảng thời gian.
- **EN:** Record every create, update, delete, approve, cancel, print, export and login (success/failure) action with: user, timestamp, IP, before/after values. The log cannot be edited or deleted by any user; it is searchable by document, user and time range.

#### FR-SYS-030 · Xóa mềm & khôi phục / Soft delete & restore
`Should` · `P1`

- **VI:** Chứng từ nháp bị xóa được chuyển vào thùng rác và có thể khôi phục trong 30 ngày.
- **EN:** Deleted draft documents go to a recycle bin and can be restored within 30 days.

#### FR-SYS-031 · Chuyển đổi ngôn ngữ / Language switching
`Must` · `P1`

- **VI:** Người dùng chuyển ngôn ngữ giao diện VI/EN bất kỳ lúc nào; lựa chọn được lưu theo người dùng. Danh mục chính có trường tên tiếng Anh để in chứng từ tiếng Anh.
- **EN:** Users switch the UI language between VI and EN at any time; the choice is saved per user. Key master data has an English-name field for English printouts.

## 3. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) |
|---|---|---|
| BR-SYS-001 | Số chứng từ là duy nhất trong toàn hệ thống. | Document numbers are unique system-wide. |
| BR-SYS-002 | Danh mục đã phát sinh giao dịch không được xóa, chỉ được ngừng sử dụng. | Master data referenced by transactions cannot be deleted, only deactivated. |
| BR-SYS-003 | Khi người dùng bị khóa, mọi phiên đăng nhập hiện có bị thu hồi ngay lập tức. | When a user is locked, all existing sessions are revoked immediately. |
| BR-SYS-004 | Chứng từ đang chờ duyệt không được sửa; người tạo phải rút lại (recall) trước khi sửa. | Documents pending approval cannot be edited; the creator must recall them first. |
| BR-SYS-005 | Sửa chứng từ đã duyệt làm thay đổi giá trị trọng yếu (số tiền, số lượng, đối tác) sẽ đưa chứng từ về trạng thái chờ duyệt lại. | Editing an approved document's key values (amount, quantity, partner) sends it back for re-approval. |

## 4. Câu hỏi mở / Open questions

| # | Câu hỏi (VI) | Question (EN) |
|---|---|---|
| Q-SYS-01 | Mẫu đánh số chứng từ hiện tại của doanh nghiệp là gì, có cần giữ nguyên? | What numbering patterns are used today, and must they be kept? |
| Q-SYS-02 | Doanh nghiệp đang dùng Google Workspace hay Microsoft 365 (cho SSO và email)? | Does the company use Google Workspace or Microsoft 365 (for SSO and email)? |
