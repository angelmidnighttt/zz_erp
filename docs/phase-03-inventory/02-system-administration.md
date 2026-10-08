# 02 · Quản trị hệ thống / System Administration (SYS) — Giai đoạn 3 / Phase 3

[← Giai đoạn 3 · Kho cơ bản / Phase 3 · Basic inventory](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/02-system-administration.md) · [P2](../phase-02-organization-master-data/02-system-administration.md) · [P7](../phase-07-approvals-controls/02-system-administration.md) · [P8](../phase-08-operations-completion/02-system-administration.md) · [P9](../phase-09-accounting-einvoicing/02-system-administration.md) · [P10](../phase-10-expansion/02-system-administration.md) · [P11](../phase-11-advanced/02-system-administration.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Đánh số chứng từ, mẫu in mặc định.
- **EN:** Document numbering, default print templates.

## 1. Yêu cầu chức năng / Functional requirements

- **VI:** Từ P3 đến P6 chưa có luồng duyệt: người có quyền Tạo / Sửa xác nhận chứng từ trực tiếp (Nháp → Đã xác nhận). Các bước cần kiểm soát, ví dụ ghi sổ điều chỉnh kiểm kê (`BR-ROL-004`), chỉ người có quyền Duyệt trên chức năng đó thực hiện được; chưa có hộp chờ duyệt, lịch sử duyệt hay trả lại để sửa. Luồng duyệt (`FR-SYS-015`, `FR-SYS-016`) được bổ sung ở P7.
- **EN:** From P3 to P6 there are no approval flows: users with the Create / Edit permission confirm documents directly (Draft → Confirmed). Controlled steps, such as posting stock count adjustments (`BR-ROL-004`), can only be performed by users holding the Approve permission on that function; there is no approval inbox, approval history or return for revision yet. Approval flows (`FR-SYS-015`, `FR-SYS-016`) are added in P7.

**Cấu hình chung / General settings**

#### FR-SYS-019 · Đánh số chứng từ / Document numbering
`Must` · `P3`

- **VI:** Cấu hình mẫu số chứng từ theo loại chứng từ và chi nhánh, gồm tiền tố, mã chi nhánh, năm/tháng và số tự tăng (ví dụ `SO-HN-2610-00001`); đặt lại bộ đếm theo năm hoặc tháng. Số chính thức được cấp khi chứng từ được xác nhận; số đã cấp không được tái sử dụng.
- **EN:** Configure numbering patterns per document type and branch, including prefix, branch code, year/month and sequence (e.g. `SO-HN-2610-00001`); reset counters yearly or monthly. The official number is assigned on confirmation; issued numbers are never reused.

#### FR-SYS-021 · Mẫu in chứng từ / Print templates
`Must` · `P3` (mở rộng / extended: `P8`, `P9`)

- **VI:** Mỗi loại chứng từ có mẫu in mặc định (báo giá, đơn hàng, phiếu nhập/xuất kho, phiếu thu/chi…) theo mẫu của chế độ kế toán áp dụng, lấy logo và thông tin từ thông tin doanh nghiệp; hiển thị số tiền bằng chữ; xuất PDF.
- **EN:** Each document type has a default print template (quotation, order, goods receipt/issue, cash receipt/payment…) following the applicable accounting regime forms, using the logo and details from the company profile; amounts are spelled out in words; export to PDF.

## 2. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-SYS-001 | Số chứng từ là duy nhất trong toàn hệ thống. | Document numbers are unique system-wide. | P3 |
