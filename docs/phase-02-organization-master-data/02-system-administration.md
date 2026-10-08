# 02 · Quản trị hệ thống / System Administration (SYS) — Giai đoạn 2 / Phase 2

[← Giai đoạn 2 · Tổ chức & danh mục / Phase 2 · Organization & master data](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/02-system-administration.md) · [P3](../phase-03-inventory/02-system-administration.md) · [P7](../phase-07-approvals-controls/02-system-administration.md) · [P8](../phase-08-operations-completion/02-system-administration.md) · [P9](../phase-09-accounting-einvoicing/02-system-administration.md) · [P10](../phase-10-expansion/02-system-administration.md) · [P11](../phase-11-advanced/02-system-administration.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Thông tin doanh nghiệp, chi nhánh, phòng ban; liên kết người dùng với nhân viên; tham số hệ thống; tên tiếng Anh trên danh mục; đính kèm, nhập / xuất Excel, tìm kiếm.
- **EN:** Company profile, branches, departments; linking users to employees; system parameters; English names on master data; attachments, Excel import / export, search.
- **VI:** Chuyển sang [P7](../phase-07-approvals-controls/02-system-administration.md): quên mật khẩu (`FR-SYS-007`), khóa tài khoản & lịch sử mật khẩu, đăng xuất mọi thiết bị, sao chép vai trò, nhật ký kiểm toán (`FR-SYS-029`), chuyển ngôn ngữ giao diện theo người dùng.
- **EN:** Moved to [P7](../phase-07-approvals-controls/02-system-administration.md): forgot password (`FR-SYS-007`), lockout & password history, sign-out from all devices, role cloning, audit log (`FR-SYS-029`), per-user UI language switching.

## 1. Mục tiêu / Objectives

- **VI:** Cung cấp nền tảng dùng chung cho mọi phân hệ: cơ cấu tổ chức, người dùng, xác thực, phân quyền, luồng phê duyệt, đánh số chứng từ, mẫu in, thông báo, nhập/xuất dữ liệu và nhật ký kiểm toán.
- **EN:** Provide the shared foundation for all modules: organization structure, users, authentication, authorization, approval workflows, document numbering, print templates, notifications, data import/export and audit logging.

## 2. Yêu cầu chức năng / Functional requirements

**Cơ cấu tổ chức / Organization structure**

#### FR-SYS-001 · Thông tin doanh nghiệp / Company profile
`Must` · `P2`

- **VI:** Hệ thống chỉ phục vụ một công ty (một pháp nhân); không có chức năng thêm, xóa hay chuyển đổi giữa các công ty. Quản trị viên cấu hình thông tin doanh nghiệp: tên, tên tiếng Anh, mã số thuế, địa chỉ, người đại diện pháp luật, logo, đồng tiền hạch toán, chế độ kế toán, năm tài chính. Thông tin này được dùng cho mẫu in, hóa đơn điện tử và báo cáo.
- **EN:** The system serves a single company (one legal entity); there is no function to add, delete or switch between companies. Administrators configure the company profile: name, English name, tax ID, address, legal representative, logo, functional currency, accounting regime and fiscal year. This profile is used on print templates, e-invoices and reports.

#### FR-SYS-002 · Quản lý chi nhánh / Manage branches
`Must` · `P2`

- **VI:** Doanh nghiệp có nhiều chi nhánh (mã, tên, địa chỉ, mã số thuế chi nhánh dạng 10-3 số nếu có, giám đốc chi nhánh). Chứng từ luôn gắn với một chi nhánh.
- **EN:** The company has multiple branches (code, name, address, branch tax ID in 10-3 format if any, branch manager). Every document belongs to one branch.

#### FR-SYS-003 · Quản lý phòng ban / Manage departments
`Must` · `P2`

- **VI:** Phòng ban được tổ chức dạng cây không giới hạn cấp, có trưởng bộ phận. Phòng ban dùng cho phân quyền dữ liệu, luồng duyệt và chiều phân tích chi phí.
- **EN:** Departments form an unlimited-depth tree with a department head. Departments drive data scope, approval routing and cost analysis dimensions.

**Cấu hình chung / General settings**

#### FR-SYS-020 · Tham số hệ thống / System parameters
`Must` · `P2`

- **VI:** Cấu hình: ngôn ngữ mặc định, múi giờ (mặc định Asia/Ho_Chi_Minh), định dạng ngày và số, số chữ số thập phân cho số lượng / đơn giá / thành tiền / tỷ giá, cho phép xuất âm kho, phương pháp tính giá xuất kho, chính sách xuất hóa đơn mặc định.
- **EN:** Configure: default language, time zone (default Asia/Ho_Chi_Minh), date and number formats, decimal places for quantity / unit price / amount / exchange rate, negative stock policy, inventory costing method, default invoicing policy.

**Tiện ích dùng chung / Common utilities**

#### FR-SYS-023 · Đính kèm tệp / Attachments
`Must` · `P2`

- **VI:** Đính kèm tệp (PDF, ảnh, Word, Excel, XML) vào mọi chứng từ và danh mục; tối đa 20 MB/tệp (cấu hình được); xem trước PDF và ảnh.
- **EN:** Attach files (PDF, images, Word, Excel, XML) to any document or master record; max 20 MB per file (configurable); preview PDFs and images.

#### FR-SYS-026 · Nhập dữ liệu từ Excel / Excel import
`Must` · `P2` (mở rộng / extended: `P8`)

- **VI:** Cung cấp mẫu Excel tải về cho danh mục và số dư đầu kỳ; kiểm tra dữ liệu và báo lỗi theo từng dòng; nhập là giao dịch toàn vẹn (lỗi thì không ghi dòng nào).
- **EN:** Provide downloadable Excel templates for master data and opening balances; validate and report errors per row; imports are all-or-nothing.

#### FR-SYS-027 · Xuất dữ liệu / Data export
`Must` · `P2`

- **VI:** Mọi danh sách xuất được ra Excel / CSV / PDF theo bộ lọc và cột đang hiển thị; người xuất phải có quyền Xem trên chức năng đó. Phạm vi dữ liệu và quyền theo trường áp dụng từ P7.
- **EN:** Every list can be exported to Excel / CSV / PDF using the current filters and visible columns; the user needs View on that function. Data scope and field-level permissions apply from P7.

#### FR-SYS-028 · Tìm kiếm & bộ lọc / Search & filters
`Must` · `P2` (mở rộng / extended: `P8`)

- **VI:** Tìm nhanh theo mã / tên; lọc theo các trường chính. Tìm kiếm tiếng Việt không phân biệt dấu (gõ "nguyen" tìm được "Nguyễn").
- **EN:** Quick search by code / name; filters on key fields. Vietnamese search is accent-insensitive (typing "nguyen" finds "Nguyễn").

#### FR-SYS-031 · Ngôn ngữ VI / EN / VI / EN language
`Must` · `P2` (mở rộng / extended: `P7`)

- **VI:** Danh mục chính (sản phẩm, đối tác, đơn vị tính, kho, thuế suất, phương thức thanh toán…) có trường tên tiếng Anh để in chứng từ tiếng Anh. Giao diện hiển thị theo ngôn ngữ mặc định trong tham số hệ thống (`FR-SYS-020`).
- **EN:** Key master data (products, partners, units of measure, warehouses, tax codes, payment methods…) has an English-name field for English printouts. The UI is shown in the default language from the system parameters (`FR-SYS-020`).

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-SYS-004 | Liên kết người dùng với hồ sơ nhân viên (`FR-MDM-022`). | Link users to employee records (`FR-MDM-022`). |

## 3. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-SYS-002 | Danh mục đã phát sinh giao dịch không được xóa, chỉ được ngừng sử dụng. | Master data referenced by transactions cannot be deleted, only deactivated. | P2 |

## 4. Câu hỏi mở / Open questions

| # | Câu hỏi (VI) | Question (EN) |
|---|---|---|
| Q-SYS-01 | Mẫu đánh số chứng từ hiện tại của doanh nghiệp là gì, có cần giữ nguyên? | What numbering patterns are used today, and must they be kept? |
| Q-SYS-02 | Doanh nghiệp đang dùng Google Workspace hay Microsoft 365 (cho SSO và email)? | Does the company use Google Workspace or Microsoft 365 (for SSO and email)? |
