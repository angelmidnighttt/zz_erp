# 02 · Quản trị hệ thống / System Administration (SYS) — Giai đoạn 8 / Phase 8

[← Giai đoạn 8 · Hoàn thiện mua – bán – kho / Phase 8 · Operations completion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/02-system-administration.md) · [P2](../phase-02-organization-master-data/02-system-administration.md) · [P3](../phase-03-inventory/02-system-administration.md) · [P7](../phase-07-approvals-controls/02-system-administration.md) · [P9](../phase-09-accounting-einvoicing/02-system-administration.md) · [P10](../phase-10-expansion/02-system-administration.md) · [P11](../phase-11-advanced/02-system-administration.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Mẫu email, tùy chỉnh mẫu in; nhập dữ liệu chạy thử; tìm kiếm & bộ lọc nâng cao; thùng rác.
- **EN:** Email templates, print template customization; import dry-run; advanced search & filters; recycle bin.

## 1. Yêu cầu chức năng / Functional requirements

**Cấu hình chung / General settings**

#### FR-SYS-022 · Mẫu email / Email templates
`Should` · `P8`

- **VI:** Cấu hình mẫu email (tiêu đề, nội dung, biến động như tên khách hàng, số chứng từ) cho gửi báo giá, đơn hàng, hóa đơn, nhắc nợ, đặt lại mật khẩu.
- **EN:** Configure email templates (subject, body, variables such as customer name, document number) for quotations, orders, invoices, payment reminders and password reset.

**Tiện ích dùng chung / Common utilities**

#### FR-SYS-030 · Xóa mềm & khôi phục / Soft delete & restore
`Should` · `P8`

- **VI:** Chứng từ nháp bị xóa được chuyển vào thùng rác và có thể khôi phục trong 30 ngày.
- **EN:** Deleted draft documents go to a recycle bin and can be restored within 30 days.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-SYS-021 | Tùy chỉnh mẫu in (chữ ký, chân trang); in tiếng Anh hoặc song ngữ. | Customize templates (signatures, footer); print in English or bilingual. |
| FR-SYS-026 | Chế độ chạy thử (không ghi dữ liệu); tùy chọn bỏ qua dòng lỗi. | Dry-run mode (no data written); option to skip invalid rows. |
| FR-SYS-028 | Tìm nhanh toàn cục; bộ lọc nâng cao nhiều điều kiện; lưu bộ lọc cá nhân; chọn và sắp xếp cột hiển thị. | Global quick search; advanced multi-condition filters; saved personal filters; choose and reorder visible columns. |
