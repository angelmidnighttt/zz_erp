# 02 · Quản trị hệ thống / System Administration (SYS)

[← Mục lục / Index](../README.md)

---

## 1. Mục tiêu / Objectives

- **VI:** Cung cấp nền tảng dùng chung cho mọi phân hệ: cơ cấu tổ chức, người dùng, xác thực, phân quyền, luồng phê duyệt, đánh số chứng từ, mẫu in, thông báo, nhập/xuất dữ liệu và nhật ký kiểm toán.
- **EN:** Provide the shared foundation for all modules: organization structure, users, authentication, authorization, approval workflows, document numbering, print templates, notifications, data import/export and audit logging.

## 2. Yêu cầu chức năng / Functional requirements

| Giai đoạn / Phase | Nội dung (VI) | Scope (EN) |
|---|---|---|
| `P1` | Thông tin doanh nghiệp, chi nhánh, phòng ban; người dùng, đăng nhập, mật khẩu; vai trò & quyền (phạm vi: của tôi / toàn công ty); duyệt một cấp, bật / tắt theo loại chứng từ; đánh số chứng từ, tham số, mẫu in mặc định; đính kèm, nhập / xuất Excel, tìm kiếm, nhật ký kiểm toán, VI / EN. | Company profile, branches, departments; users, login, passwords; roles & permissions (scope: own / whole company); single-level approval, switched on / off per document type; document numbering, parameters, default print templates; attachments, Excel import / export, search, audit log, VI / EN. |
| `P2` | Xác thực hai lớp, quản lý phiên; phạm vi dữ liệu đầy đủ, quyền theo trường, hạn mức; luồng duyệt nhiều cấp; mẫu email, tùy chỉnh mẫu in; thông báo; thùng rác. | MFA, session management; full data scope, field-level permissions, limits; multi-level approval flows; email templates, print template customization; notifications; recycle bin. |
| `P3` | Ủy quyền duyệt; bình luận & nhắc tên; duyệt song song. | Approval delegation; comments & mentions; parallel approval. |
| `P4` | Đăng nhập một lần (SSO); nhắc duyệt & chuyển cấp. | Single sign-on; approval reminders & escalation. |

### 2.1 Giai đoạn 1 — Cơ bản / Phase 1 — Basic

**Cơ cấu tổ chức / Organization structure**

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

**Người dùng & xác thực / Users & authentication**

#### FR-SYS-004 · Quản lý người dùng / User management
`Must` · `P1` (mở rộng / extended: `P2`)

- **VI:** Quản trị viên tạo, sửa, khóa/mở khóa người dùng; gán vai trò; liên kết người dùng với hồ sơ nhân viên. Người dùng đã phát sinh dữ liệu không được xóa cứng.
- **EN:** Administrators create, edit, lock/unlock users; assign roles; link users to employee records. Users with existing data cannot be hard-deleted.

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

**Phân quyền / Authorization**

#### FR-SYS-011 · Quản lý vai trò & quyền / Role & permission management
`Must` · `P1`

- **VI:** Quản trị viên tạo vai trò tùy chỉnh, sao chép vai trò có sẵn và gán quyền theo ma trận chức năng × hành động (xem [01 · Vai trò & phân quyền](01-roles-permissions.md)).
- **EN:** Administrators create custom roles, clone existing roles and grant permissions as a function × action matrix (see [01 · Roles & permissions](01-roles-permissions.md)).

#### FR-SYS-012 · Phạm vi dữ liệu / Data scope
`Must` · `P1` (mở rộng / extended: `P2`)

- **VI:** Mỗi quyền có phạm vi dữ liệu: của tôi (chứng từ do mình phụ trách) hoặc toàn công ty. Phạm vi áp dụng cho danh sách, tìm kiếm, báo cáo, xuất dữ liệu và API.
- **EN:** Each permission has a data scope: own (documents the user is responsible for) or whole company. Scope applies to lists, search, reports, exports and the API.

**Luồng phê duyệt / Approval workflow**

#### FR-SYS-016 · Thực hiện duyệt / Approve or reject
`Must` · `P1` (mở rộng / extended: `P2`)

- **VI:** Mỗi loại chứng từ có cấu hình bật / tắt yêu cầu duyệt. Chứng từ cần duyệt chờ một người có quyền Duyệt trên chức năng đó; người duyệt duyệt hoặc từ chối (bắt buộc nhập lý do). Lịch sử duyệt (người, thời điểm, ý kiến) hiển thị trên chứng từ. Có màn hình "Chờ tôi duyệt".
- **EN:** Each document type has an on / off approval setting. Documents that require approval wait for one user holding the Approve permission on that function; the approver approves or rejects (reason required). Approval history (who, when, comments) is shown on the document. There is a "Waiting for my approval" inbox.

**Cấu hình chung / General settings**

#### FR-SYS-019 · Đánh số chứng từ / Document numbering
`Must` · `P1`

- **VI:** Cấu hình mẫu số chứng từ theo loại chứng từ và chi nhánh, gồm tiền tố, mã chi nhánh, năm/tháng và số tự tăng (ví dụ `SO-HN-2610-00001`); đặt lại bộ đếm theo năm hoặc tháng. Số chính thức được cấp khi chứng từ được xác nhận; số đã cấp không được tái sử dụng.
- **EN:** Configure numbering patterns per document type and branch, including prefix, branch code, year/month and sequence (e.g. `SO-HN-2610-00001`); reset counters yearly or monthly. The official number is assigned on confirmation; issued numbers are never reused.

#### FR-SYS-020 · Tham số hệ thống / System parameters
`Must` · `P1`

- **VI:** Cấu hình: ngôn ngữ mặc định, múi giờ (mặc định Asia/Ho_Chi_Minh), định dạng ngày và số, số chữ số thập phân cho số lượng / đơn giá / thành tiền / tỷ giá, cho phép xuất âm kho, phương pháp tính giá xuất kho, chính sách xuất hóa đơn mặc định.
- **EN:** Configure: default language, time zone (default Asia/Ho_Chi_Minh), date and number formats, decimal places for quantity / unit price / amount / exchange rate, negative stock policy, inventory costing method, default invoicing policy.

#### FR-SYS-021 · Mẫu in chứng từ / Print templates
`Must` · `P1` (mở rộng / extended: `P2`)

- **VI:** Mỗi loại chứng từ có mẫu in mặc định (báo giá, đơn hàng, phiếu nhập/xuất kho, phiếu thu/chi…) theo mẫu của chế độ kế toán áp dụng, lấy logo và thông tin từ thông tin doanh nghiệp; hiển thị số tiền bằng chữ; xuất PDF.
- **EN:** Each document type has a default print template (quotation, order, goods receipt/issue, cash receipt/payment…) following the applicable accounting regime forms, using the logo and details from the company profile; amounts are spelled out in words; export to PDF.

**Tiện ích dùng chung / Common utilities**

#### FR-SYS-023 · Đính kèm tệp / Attachments
`Must` · `P1`

- **VI:** Đính kèm tệp (PDF, ảnh, Word, Excel, XML) vào mọi chứng từ và danh mục; tối đa 20 MB/tệp (cấu hình được); xem trước PDF và ảnh.
- **EN:** Attach files (PDF, images, Word, Excel, XML) to any document or master record; max 20 MB per file (configurable); preview PDFs and images.

#### FR-SYS-026 · Nhập dữ liệu từ Excel / Excel import
`Must` · `P1` (mở rộng / extended: `P2`)

- **VI:** Cung cấp mẫu Excel tải về cho danh mục và số dư đầu kỳ; kiểm tra dữ liệu và báo lỗi theo từng dòng; nhập là giao dịch toàn vẹn (lỗi thì không ghi dòng nào).
- **EN:** Provide downloadable Excel templates for master data and opening balances; validate and report errors per row; imports are all-or-nothing.

#### FR-SYS-027 · Xuất dữ liệu / Data export
`Must` · `P1`

- **VI:** Mọi danh sách xuất được ra Excel / CSV / PDF theo bộ lọc và cột đang hiển thị, tuân theo phân quyền dữ liệu và quyền theo trường.
- **EN:** Every list can be exported to Excel / CSV / PDF using the current filters and visible columns, respecting data scope and field-level permissions.

#### FR-SYS-028 · Tìm kiếm & bộ lọc / Search & filters
`Must` · `P1` (mở rộng / extended: `P2`)

- **VI:** Tìm nhanh theo mã / tên; lọc theo các trường chính. Tìm kiếm tiếng Việt không phân biệt dấu (gõ "nguyen" tìm được "Nguyễn").
- **EN:** Quick search by code / name; filters on key fields. Vietnamese search is accent-insensitive (typing "nguyen" finds "Nguyễn").

#### FR-SYS-029 · Nhật ký kiểm toán / Audit log
`Must` · `P1`

- **VI:** Ghi nhận mọi thao tác tạo, sửa, xóa, duyệt, hủy, in, xuất dữ liệu, đăng nhập (thành công/thất bại) với: người dùng, thời điểm, IP, giá trị trước – sau. Nhật ký không thể sửa hoặc xóa bởi bất kỳ người dùng nào; tra cứu theo chứng từ, người dùng, khoảng thời gian.
- **EN:** Record every create, update, delete, approve, cancel, print, export and login (success/failure) action with: user, timestamp, IP, before/after values. The log cannot be edited or deleted by any user; it is searchable by document, user and time range.

#### FR-SYS-031 · Chuyển đổi ngôn ngữ / Language switching
`Must` · `P1`

- **VI:** Người dùng chuyển ngôn ngữ giao diện VI/EN bất kỳ lúc nào; lựa chọn được lưu theo người dùng. Danh mục chính có trường tên tiếng Anh để in chứng từ tiếng Anh.
- **EN:** Users switch the UI language between VI and EN at any time; the choice is saved per user. Key master data has an English-name field for English printouts.

### 2.2 Giai đoạn 2 — Hoàn thiện / Phase 2 — Completion

**Người dùng & xác thực / Users & authentication**

#### FR-SYS-008 · Xác thực hai lớp / Multi-factor authentication
`Should` · `P2`

- **VI:** Hỗ trợ xác thực hai lớp bằng ứng dụng TOTP (Google Authenticator, Microsoft Authenticator). Bắt buộc với vai trò `ADM`, `CAC`, `CEO` (cấu hình được).
- **EN:** Support MFA with TOTP apps (Google Authenticator, Microsoft Authenticator). Mandatory for `ADM`, `CAC`, `CEO` roles (configurable).

#### FR-SYS-010 · Quản lý phiên đăng nhập / Session management
`Should` · `P2`

- **VI:** Người dùng xem danh sách phiên đang hoạt động (thiết bị, IP, thời gian) và thu hồi phiên. Hệ thống tự đăng xuất sau 30 phút không hoạt động (cấu hình được).
- **EN:** Users view active sessions (device, IP, time) and can revoke them. The system signs out automatically after 30 minutes of inactivity (configurable).

**Phân quyền / Authorization**

#### FR-SYS-013 · Quyền theo trường dữ liệu / Field-level permissions
`Should` · `P2`

- **VI:** Có thể ẩn các trường nhạy cảm (giá vốn, lãi gộp, giá mua, lương) theo vai trò trên màn hình, báo cáo, bản in và dữ liệu xuất.
- **EN:** Sensitive fields (cost, gross margin, purchase price, salary) can be hidden per role on screens, reports, printouts and exports.

#### FR-SYS-014 · Hạn mức theo vai trò / Role-based limits
`Should` · `P2`

- **VI:** Cấu hình hạn mức theo vai trò hoặc người dùng: % chiết khấu tối đa, giá trị đơn tối đa được tự xác nhận, giá trị duyệt tối đa.
- **EN:** Configure limits per role or user: maximum discount %, maximum order value that can be self-confirmed, maximum approval amount.

**Luồng phê duyệt / Approval workflow**

#### FR-SYS-015 · Cấu hình luồng duyệt / Configure approval flows
`Must` · `P2`

- **VI:** Cấu hình luồng duyệt theo loại chứng từ với điều kiện (giá trị, chi nhánh, phòng ban, % chiết khấu, loại chi phí) và nhiều cấp duyệt tuần tự. Người duyệt có thể là người dùng cụ thể, vai trò hoặc "quản lý trực tiếp". Duyệt song song (tất cả / bất kỳ) là `Should`, `P3`.
- **EN:** Configure approval flows per document type with conditions (amount, branch, department, discount %, expense type) and multiple sequential levels. Approvers can be a specific user, a role or "direct manager". Parallel approval (all / any) is `Should`, `P3`.

**Cấu hình chung / General settings**

#### FR-SYS-022 · Mẫu email / Email templates
`Should` · `P2`

- **VI:** Cấu hình mẫu email (tiêu đề, nội dung, biến động như tên khách hàng, số chứng từ) cho gửi báo giá, đơn hàng, hóa đơn, nhắc nợ, đặt lại mật khẩu.
- **EN:** Configure email templates (subject, body, variables such as customer name, document number) for quotations, orders, invoices, payment reminders and password reset.

**Tiện ích dùng chung / Common utilities**

#### FR-SYS-025 · Thông báo / Notifications
`Must` · `P2`

- **VI:** Thông báo trong ứng dụng và qua email cho các sự kiện: chờ duyệt, được duyệt/từ chối, chứng từ được giao xử lý, hợp đồng/lô hàng sắp hết hạn, công nợ đến hạn. Người dùng tùy chọn kênh nhận cho từng loại.
- **EN:** In-app and email notifications for: pending approval, approved/rejected, document assigned, contract/lot nearing expiry, receivable/payable due. Users choose channels per notification type.

#### FR-SYS-030 · Xóa mềm & khôi phục / Soft delete & restore
`Should` · `P2`

- **VI:** Chứng từ nháp bị xóa được chuyển vào thùng rác và có thể khôi phục trong 30 ngày.
- **EN:** Deleted draft documents go to a recycle bin and can be restored within 30 days.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-SYS-004 | Gán chi nhánh, phòng ban, kho và quỹ được truy cập để áp dụng phạm vi dữ liệu (`FR-SYS-012`). | Assign accessible branches, departments, warehouses and cash funds to drive data scope (`FR-SYS-012`). |
| FR-SYS-012 | Bổ sung phạm vi phòng ban (kể cả phòng ban con), chi nhánh, kho / quỹ được gán. | Add department (including sub-departments), branch and assigned warehouse / cash fund scopes. |
| FR-SYS-016 | Trả lại để sửa; duyệt hàng loạt; duyệt theo luồng nhiều cấp có điều kiện (`FR-SYS-015`). | Return for revision; bulk approval; multi-level conditional flows (`FR-SYS-015`). |
| FR-SYS-021 | Tùy chỉnh mẫu in (chữ ký, chân trang); in tiếng Anh hoặc song ngữ; mẫu biên bản đối chiếu công nợ. | Customize templates (signatures, footer); print in English or bilingual; balance confirmation template. |
| FR-SYS-026 | Chế độ chạy thử (không ghi dữ liệu); tùy chọn bỏ qua dòng lỗi. | Dry-run mode (no data written); option to skip invalid rows. |
| FR-SYS-028 | Tìm nhanh toàn cục; bộ lọc nâng cao nhiều điều kiện; lưu bộ lọc cá nhân; chọn và sắp xếp cột hiển thị. | Global quick search; advanced multi-condition filters; saved personal filters; choose and reorder visible columns. |

### 2.3 Giai đoạn 3 — Mở rộng / Phase 3 — Expansion

**Luồng phê duyệt / Approval workflow**

#### FR-SYS-017 · Ủy quyền duyệt / Approval delegation
`Should` · `P3`

- **VI:** Người duyệt ủy quyền cho người khác trong một khoảng thời gian (ví dụ khi nghỉ phép). Chứng từ được duyệt theo ủy quyền ghi rõ "duyệt thay".
- **EN:** Approvers delegate to another user for a period (e.g. during leave). Documents approved under delegation are marked "approved on behalf of".

**Tiện ích dùng chung / Common utilities**

#### FR-SYS-024 · Trao đổi trên chứng từ / Comments & mentions
`Should` · `P3`

- **VI:** Người dùng bình luận trên chứng từ, nhắc tên (@mention) đồng nghiệp để nhận thông báo.
- **EN:** Users comment on documents and @mention colleagues to notify them.

### 2.4 Giai đoạn 4 — Nâng cao / Phase 4 — Advanced

**Người dùng & xác thực / Users & authentication**

#### FR-SYS-009 · Đăng nhập một lần / Single sign-on
`Could` · `P4`

- **VI:** Hỗ trợ đăng nhập bằng Google Workspace hoặc Microsoft Entra ID (OIDC).
- **EN:** Support sign-in via Google Workspace or Microsoft Entra ID (OIDC).

**Luồng phê duyệt / Approval workflow**

#### FR-SYS-018 · Nhắc duyệt & chuyển cấp / Reminders & escalation
`Could` · `P4`

- **VI:** Gửi nhắc khi chứng từ chờ duyệt quá N giờ; tùy chọn tự chuyển lên cấp trên.
- **EN:** Send reminders when a document has been pending for more than N hours; optionally escalate to the next level.

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
