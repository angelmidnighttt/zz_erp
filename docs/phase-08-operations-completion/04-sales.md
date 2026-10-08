# 04 · Bán hàng / Sales (SAL) — Giai đoạn 8 / Phase 8

[← Giai đoạn 8 · Hoàn thiện mua – bán – kho / Phase 8 · Operations completion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P5](../phase-05-sales/04-sales.md) · [P7](../phase-07-approvals-controls/04-sales.md) · [P9](../phase-09-accounting-einvoicing/04-sales.md) · [P10](../phase-10-expansion/04-sales.md) · [P11](../phase-11-advanced/04-sales.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Phiên bản & hết hạn báo giá; giữ hàng, tồn khả dụng; tiền đặt cọc; chiết khấu tổng đơn; giá theo bậc số lượng, tiền tệ, chi nhánh; chính sách xuất hóa đơn theo sản phẩm / khách hàng; xuất hóa đơn dịch vụ theo tiến độ; so sánh kỳ.
- **EN:** Quotation revisions & expiry; stock reservation, available stock; deposits; order-level discounts; quantity-tier, currency and branch pricing; invoicing policy per product / customer; milestone service invoicing; period comparison.

## 1. Yêu cầu chức năng / Functional requirements

**Báo giá / Quotations**

#### FR-SAL-002 · Phiên bản báo giá / Quotation revisions
`Should` · `P8`

- **VI:** Sửa báo giá đã gửi khách sẽ tạo phiên bản mới (ví dụ `QT-0001-R2`); các phiên bản cũ được giữ lại để tra cứu.
- **EN:** Editing a quotation already sent creates a new revision (e.g. `QT-0001-R2`); previous revisions are kept for reference.

#### FR-SAL-005 · Hết hạn báo giá / Quotation expiry
`Should` · `P8`

- **VI:** Báo giá quá ngày hiệu lực tự động chuyển trạng thái "Hết hạn"; nhân viên được nhắc trước N ngày.
- **EN:** Quotations past their expiry date move to "Expired" automatically; salespeople are reminded N days before.

**Đơn bán hàng / Sales orders**

#### FR-SAL-011 · Giữ hàng / Stock reservation
`Should` · `P8`

- **VI:** Đơn đã xác nhận tự động giữ hàng trong kho xuất; giữ hàng được giải phóng khi đơn bị hủy, đóng hoặc sau khi xuất kho.
- **EN:** Confirmed orders automatically reserve stock in the source warehouse; reservations are released when the order is cancelled, closed or delivered.

#### FR-SAL-015 · Tiền đặt cọc / Customer deposits
`Should` · `P8`

- **VI:** Ghi nhận tiền đặt cọc / trả trước gắn với đơn hàng; tự động cấn trừ khi xuất hóa đơn.
- **EN:** Record deposits / prepayments linked to an order; automatically offset them when invoicing.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-SAL-007 | Giá theo bậc số lượng, theo tiền tệ và chi nhánh (`FR-MDM-025`). | Quantity-tier, currency and branch pricing (`FR-MDM-025`). |
| FR-SAL-008 | Chiết khấu tổng đơn, được phân bổ xuống từng dòng để tính thuế và doanh thu chính xác. | Order-level discounts, allocated to lines so tax and revenue are computed correctly. |
| FR-SAL-010 | Hiển thị tồn khả dụng (tồn thực tế − đã giữ) và số lượng đang về. | Show available stock (on hand − reserved) and incoming quantity. |
| FR-SAL-018 | Xuất hóa đơn dịch vụ theo tiến độ hoàn thành. | Invoice services by completion milestones. |
| FR-SAL-022 | Cấu hình chính sách theo sản phẩm hoặc khách hàng. | Configure the policy per product or customer. |
| FR-SAL-030 | So sánh với kỳ trước. | Comparison with prior periods. |
