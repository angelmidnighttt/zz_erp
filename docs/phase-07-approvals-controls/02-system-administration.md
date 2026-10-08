# 02 · Quản trị hệ thống / System Administration (SYS) — Giai đoạn 7 / Phase 7

[← Giai đoạn 7 · Phê duyệt & kiểm soát / Phase 7 · Approvals & controls](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/02-system-administration.md) · [P2](../phase-02-organization-master-data/02-system-administration.md) · [P3](../phase-03-inventory/02-system-administration.md) · [P8](../phase-08-operations-completion/02-system-administration.md) · [P9](../phase-09-accounting-einvoicing/02-system-administration.md) · [P10](../phase-10-expansion/02-system-administration.md) · [P11](../phase-11-advanced/02-system-administration.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Xác thực hai lớp, quản lý phiên; phạm vi dữ liệu, quyền theo trường, hạn mức; duyệt một cấp và luồng duyệt nhiều cấp; thông báo.
- **EN:** MFA, session management; data scope, field-level permissions, limits; single-level approval and multi-level approval flows; notifications.

## 1. Yêu cầu chức năng / Functional requirements

**Người dùng & xác thực / Users & authentication**

#### FR-SYS-008 · Xác thực hai lớp / Multi-factor authentication
`Should` · `P7`

- **VI:** Hỗ trợ xác thực hai lớp bằng ứng dụng TOTP (Google Authenticator, Microsoft Authenticator). Bắt buộc với vai trò `ADM`, `CAC`, `CEO` (cấu hình được).
- **EN:** Support MFA with TOTP apps (Google Authenticator, Microsoft Authenticator). Mandatory for `ADM`, `CAC`, `CEO` roles (configurable).

#### FR-SYS-010 · Quản lý phiên đăng nhập / Session management
`Should` · `P7`

- **VI:** Người dùng xem danh sách phiên đang hoạt động (thiết bị, IP, thời gian) và thu hồi phiên. Hệ thống tự đăng xuất sau 30 phút không hoạt động (cấu hình được).
- **EN:** Users view active sessions (device, IP, time) and can revoke them. The system signs out automatically after 30 minutes of inactivity (configurable).

**Phân quyền / Authorization**

#### FR-SYS-012 · Phạm vi dữ liệu / Data scope
`Must` · `P7`

- **VI:** Mỗi quyền có phạm vi dữ liệu: của tôi (chứng từ do mình phụ trách), toàn công ty, phòng ban (kể cả phòng ban con), chi nhánh, kho / quỹ được gán. Phạm vi áp dụng cho danh sách, tìm kiếm, báo cáo, xuất dữ liệu và API.
- **EN:** Each permission has a data scope: own (documents the user is responsible for), whole company, department (including sub-departments), branch, assigned warehouse / cash fund. Scope applies to lists, search, reports, exports and the API.

#### FR-SYS-013 · Quyền theo trường dữ liệu / Field-level permissions
`Should` · `P7`

- **VI:** Có thể ẩn các trường nhạy cảm (giá vốn, lãi gộp, giá mua, lương) theo vai trò trên màn hình, báo cáo, bản in và dữ liệu xuất.
- **EN:** Sensitive fields (cost, gross margin, purchase price, salary) can be hidden per role on screens, reports, printouts and exports.

#### FR-SYS-014 · Hạn mức theo vai trò / Role-based limits
`Should` · `P7`

- **VI:** Cấu hình hạn mức theo vai trò hoặc người dùng: % chiết khấu tối đa, giá trị đơn tối đa được tự xác nhận, giá trị duyệt tối đa.
- **EN:** Configure limits per role or user: maximum discount %, maximum order value that can be self-confirmed, maximum approval amount.

**Luồng phê duyệt / Approval workflow**

#### FR-SYS-015 · Cấu hình luồng duyệt / Configure approval flows
`Must` · `P7`

- **VI:** Cấu hình luồng duyệt theo loại chứng từ với điều kiện (giá trị, chi nhánh, phòng ban, % chiết khấu, loại chi phí) và nhiều cấp duyệt tuần tự. Người duyệt có thể là người dùng cụ thể, vai trò hoặc "quản lý trực tiếp". Duyệt song song (tất cả / bất kỳ) là `Should`, `P10`.
- **EN:** Configure approval flows per document type with conditions (amount, branch, department, discount %, expense type) and multiple sequential levels. Approvers can be a specific user, a role or "direct manager". Parallel approval (all / any) is `Should`, `P10`.

#### FR-SYS-016 · Thực hiện duyệt / Approve or reject
`Must` · `P7`

- **VI:** Mỗi loại chứng từ có cấu hình bật / tắt yêu cầu duyệt. Chứng từ cần duyệt chờ một người có quyền Duyệt trên chức năng đó (duyệt một cấp) hoặc đi theo luồng duyệt nhiều cấp có điều kiện (`FR-SYS-015`); người duyệt duyệt, từ chối (bắt buộc nhập lý do) hoặc trả lại để sửa; hỗ trợ duyệt hàng loạt. Lịch sử duyệt (người, thời điểm, ý kiến) hiển thị trên chứng từ. Có màn hình "Chờ tôi duyệt".
- **EN:** Each document type has an on / off approval setting. Documents that require approval wait for one user holding the Approve permission on that function (single-level) or follow a multi-level conditional flow (`FR-SYS-015`); the approver approves, rejects (reason required) or returns the document for revision; bulk approval is supported. Approval history (who, when, comments) is shown on the document. There is a "Waiting for my approval" inbox.

**Tiện ích dùng chung / Common utilities**

#### FR-SYS-025 · Thông báo / Notifications
`Must` · `P7`

- **VI:** Thông báo trong ứng dụng và qua email cho các sự kiện: chờ duyệt, được duyệt/từ chối, chứng từ được giao xử lý, hợp đồng/lô hàng sắp hết hạn, công nợ đến hạn. Người dùng tùy chọn kênh nhận cho từng loại.
- **EN:** In-app and email notifications for: pending approval, approved/rejected, document assigned, contract/lot nearing expiry, receivable/payable due. Users choose channels per notification type.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-SYS-004 | Gán chi nhánh, phòng ban, kho và quỹ được truy cập để áp dụng phạm vi dữ liệu (`FR-SYS-012`). | Assign accessible branches, departments, warehouses and cash funds to drive data scope (`FR-SYS-012`). |

## 2. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-SYS-004 | Chứng từ đang chờ duyệt không được sửa; người tạo phải rút lại (recall) trước khi sửa. | Documents pending approval cannot be edited; the creator must recall them first. | P7 |
| BR-SYS-005 | Sửa chứng từ đã duyệt làm thay đổi giá trị trọng yếu (số tiền, số lượng, đối tác) sẽ đưa chứng từ về trạng thái chờ duyệt lại. | Editing an approved document's key values (amount, quantity, partner) sends it back for re-approval. | P7 |
