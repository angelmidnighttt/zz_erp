# 04 · Bán hàng / Sales (SAL) — Giai đoạn 5 / Phase 5

[← Giai đoạn 5 · Bán hàng cơ bản / Phase 5 · Basic sales](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P7](../phase-07-approvals-controls/04-sales.md) · [P8](../phase-08-operations-completion/04-sales.md) · [P9](../phase-09-accounting-einvoicing/04-sales.md) · [P10](../phase-10-expansion/04-sales.md) · [P11](../phase-11-advanced/04-sales.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Báo giá (tạo, gửi PDF / email, chuyển thành đơn); đơn bán hàng lấy giá từ bảng giá, chiết khấu dòng, giá gồm / chưa gồm thuế; giao hàng nhiều lần; hóa đơn (ghi số HĐĐT phát hành trên cổng nhà cung cấp); trả hàng; báo cáo bán hàng cơ bản. Chưa có duyệt đơn: đơn được xác nhận trực tiếp.
- **EN:** Quotations (create, send PDF / email, convert to order); sales orders priced from price lists, line discounts, tax-inclusive / exclusive prices; partial deliveries; invoices (recording e-invoice numbers issued on the provider's portal); returns; basic sales reports. No order approval yet: orders are confirmed directly.

## 1. Mục tiêu / Objectives

- **VI:** Quản lý toàn bộ chu trình bán hàng từ báo giá đến giao hàng, xuất hóa đơn và xử lý trả hàng; kiểm soát giá, chiết khấu và công nợ; cung cấp thông tin tình trạng đơn hàng theo thời gian thực.
- **EN:** Manage the full sales cycle from quotation to delivery, invoicing and returns; control pricing, discounts and credit; provide real-time order status.

## 2. Phạm vi / Scope

| Trong phạm vi / In scope | Ngoài phạm vi / Out of scope |
|---|---|
| Báo giá, đơn bán hàng, giao hàng, hóa đơn, trả hàng, khuyến mãi (P10), hoa hồng (P11) / Quotations, sales orders, delivery, invoicing, returns, promotions (P10), commissions (P11) | Bán lẻ POS, website TMĐT, hợp đồng dịch vụ định kỳ phức tạp (subscription) / Retail POS, e-commerce storefront, complex subscription contracts |

## 3. Quy trình / Process flow

```mermaid
flowchart LR
  A[Báo giá<br/>Quotation] --> B[Đơn bán hàng<br/>Sales order]
  B --> C{Kiểm tra giá, công nợ<br/>Price & credit check}
  C -->|Vượt hạn mức<br/>Exceeds limit| D[Chờ duyệt<br/>Pending approval]
  C -->|Hợp lệ<br/>OK| E[Đã xác nhận<br/>Confirmed]
  D --> E
  E --> F[Phiếu xuất kho<br/>Goods issue]
  F --> G[Hóa đơn + HĐĐT<br/>Invoice + e-invoice]
  G --> H[Thu tiền<br/>Receipt]
  F -.-> I[Trả hàng<br/>Sales return]
  I -.-> J[HĐ điều chỉnh<br/>Adjustment invoice]
```

## 4. Yêu cầu chức năng / Functional requirements

**Báo giá / Quotations**

#### FR-SAL-001 · Tạo báo giá / Create quotation
`Must` · `P5` (mở rộng / extended: `P10`)

- **VI:** Nhân viên kinh doanh tạo báo giá gồm: khách hàng, người liên hệ, ngày báo giá, ngày hết hiệu lực, tiền tệ, điều khoản thanh toán, điều kiện giao hàng, các dòng sản phẩm (số lượng, đơn vị tính, đơn giá, chiết khấu, thuế suất), ghi chú, điều khoản kèm theo.
- **EN:** Sales staff create quotations with: customer, contact, quotation date, expiry date, currency, payment terms, delivery terms, product lines (quantity, UoM, unit price, discount, tax rate), notes and terms & conditions.

#### FR-SAL-003 · Gửi báo giá / Send quotation
`Must` · `P5`

- **VI:** Xuất báo giá ra PDF theo mẫu in (`FR-SYS-021`; bản EN / song ngữ từ P8) và gửi email trực tiếp từ hệ thống; ghi nhận thời điểm gửi và chuyển trạng thái "Đã gửi".
- **EN:** Export the quotation to PDF using the print template (`FR-SYS-021`; EN / bilingual from P8) and email it from the system; record the send time and set status to "Sent".

#### FR-SAL-004 · Chuyển báo giá thành đơn hàng / Convert quotation to order
`Must` · `P5`

- **VI:** Chuyển báo giá thành đơn bán hàng bằng một thao tác, cho phép chọn toàn bộ hoặc một phần dòng; đơn hàng giữ liên kết với báo giá gốc.
- **EN:** Convert a quotation to a sales order in one action, selecting all or some lines; the order keeps a link to the source quotation.

**Đơn bán hàng / Sales orders**

#### FR-SAL-006 · Tạo đơn bán hàng / Create sales order
`Must` · `P5`

- **VI:** Tạo đơn từ báo giá hoặc trực tiếp gồm: khách hàng, địa chỉ giao hàng, ngày giao dự kiến, kho xuất, nhân viên bán hàng, điều khoản thanh toán, tiền tệ và tỷ giá, dòng hàng, phí vận chuyển, ghi chú nội bộ và ghi chú cho khách.
- **EN:** Create an order from a quotation or directly with: customer, shipping address, expected delivery date, source warehouse, salesperson, payment terms, currency and rate, lines, shipping fee, internal and customer notes.

#### FR-SAL-007 · Tự động lấy giá / Automatic pricing
`Must` · `P5` (mở rộng / extended: `P8`)

- **VI:** Đơn giá được lấy tự động theo thứ tự ưu tiên: bảng giá riêng của khách hàng → bảng giá của nhóm khách hàng → bảng giá chung, theo thời gian hiệu lực. Người dùng có quyền mới được sửa giá.
- **EN:** Unit price is filled automatically by priority: customer-specific price list → customer group price list → general price list, by validity period. Only authorized users can override prices.

#### FR-SAL-008 · Chiết khấu / Discounts
`Must` · `P5` (mở rộng / extended: `P8`)

- **VI:** Chiết khấu theo dòng (% hoặc số tiền).
- **EN:** Line discounts (% or amount).

#### FR-SAL-009 · Giá gồm thuế hoặc chưa gồm thuế / Tax-inclusive or exclusive prices
`Must` · `P5`

- **VI:** Bảng giá và đơn hàng hỗ trợ cả giá đã gồm thuế GTGT và chưa gồm thuế; hệ thống tính ngược tiền hàng và tiền thuế khi giá đã gồm thuế.
- **EN:** Price lists and orders support both VAT-inclusive and VAT-exclusive prices; the system back-calculates net and tax amounts for inclusive prices.

#### FR-SAL-010 · Kiểm tra tồn kho khả dụng / Stock availability check
`Must` · `P5` (mở rộng / extended: `P8`)

- **VI:** Khi nhập dòng hàng, hiển thị tồn thực tế theo kho; cảnh báo nếu không đủ hàng.
- **EN:** When entering a line, show on-hand stock per warehouse; warn if insufficient.

#### FR-SAL-014 · Giao hàng nhiều lần / Partial deliveries
`Must` · `P5`

- **VI:** Một đơn có thể giao nhiều lần; hệ thống theo dõi số lượng đã giao, còn lại và cho phép đóng phần còn lại (không giao tiếp).
- **EN:** An order can be delivered in several shipments; the system tracks delivered and remaining quantities and allows closing the remaining balance.

#### FR-SAL-016 · Sửa và hủy đơn / Amend and cancel orders
`Must` · `P5`

- **VI:** Sửa đơn đã xác nhận cần quyền riêng; từ P7 có thể phải duyệt lại (`BR-SYS-005`). Chỉ hủy được đơn hoặc phần chưa giao; bắt buộc nhập lý do hủy.
- **EN:** Editing a confirmed order requires a specific permission; from P7 it may trigger re-approval (`BR-SYS-005`). Only orders or undelivered portions can be cancelled; a cancellation reason is mandatory.

#### FR-SAL-017 · Theo dõi tình trạng đơn / Order tracking
`Must` · `P5`

- **VI:** Trên mỗi đơn hiển thị tình trạng giao hàng, xuất hóa đơn, thanh toán và các chứng từ liên quan (phiếu xuất, hóa đơn, phiếu thu, trả hàng).
- **EN:** Each order shows delivery, invoicing and payment status plus related documents (goods issues, invoices, receipts, returns).

#### FR-SAL-018 · Bán dịch vụ / Selling services
`Must` · `P5` (mở rộng / extended: `P8`)

- **VI:** Dòng hàng là dịch vụ không qua kho và được xuất hóa đơn trực tiếp.
- **EN:** Service lines bypass the warehouse and are invoiced directly.

**Giao hàng / Delivery**

#### FR-SAL-019 · Yêu cầu xuất kho / Delivery request
`Must` · `P5`

- **VI:** Đơn đã xác nhận tự động tạo phiếu xuất kho ở trạng thái chờ để kho xử lý (xem `FR-INV-003`).
- **EN:** Confirmed orders automatically create pending goods issues for the warehouse to process (see `FR-INV-003`).

#### FR-SAL-020 · Phiếu giao hàng & xác nhận giao / Delivery note & proof of delivery
`Must` · `P5`

- **VI:** In phiếu giao hàng / biên bản bàn giao có chữ ký khách hàng; cập nhật trạng thái "Đã giao". Đính kèm ảnh xác nhận giao hàng từ điện thoại là `Could`, `P11`.
- **EN:** Print delivery notes / handover minutes for customer signature; update status to "Delivered". Attaching proof-of-delivery photos from a phone is `Could`, `P11`.

**Hóa đơn / Invoicing**

#### FR-SAL-021 · Tạo hóa đơn bán hàng / Create customer invoice
`Must` · `P5` (mở rộng / extended: `P9`)

- **VI:** Tạo hóa đơn từ đơn hàng hoặc phiếu xuất; gộp nhiều phiếu xuất của cùng khách hàng vào một hóa đơn; xuất hóa đơn một phần. Hóa đơn điện tử được phát hành trên cổng của nhà cung cấp HĐĐT; người dùng ghi nhận ký hiệu và số hóa đơn điện tử vào hóa đơn trên ERP.
- **EN:** Create invoices from orders or goods issues; combine several goods issues of the same customer into one invoice; invoice partially. E-invoices are issued on the e-invoice provider's portal; users record the e-invoice series and number on the ERP invoice.

#### FR-SAL-022 · Chính sách xuất hóa đơn / Invoicing policy
`Must` · `P5` (mở rộng / extended: `P8`)

- **VI:** Một chính sách chung cho doanh nghiệp (tham số hệ thống `FR-SYS-020`): xuất hóa đơn theo số lượng đặt hoặc theo số lượng đã giao.
- **EN:** One company-wide policy (system parameter `FR-SYS-020`): invoice on ordered quantity or on delivered quantity.

**Trả hàng & điều chỉnh / Returns & adjustments**

#### FR-SAL-024 · Trả hàng bán / Sales return
`Must` · `P5`

- **VI:** Tạo phiếu trả hàng từ hóa đơn hoặc phiếu xuất gốc; số lượng trả không vượt số lượng đã giao; chọn kho nhận lại (có thể là kho hàng lỗi); bắt buộc nhập lý do trả.
- **EN:** Create a return from the original invoice or goods issue; return quantity cannot exceed delivered quantity; choose the receiving warehouse (possibly a defective-goods warehouse); a return reason is mandatory.

**Báo cáo / Reports**

#### FR-SAL-030 · Báo cáo bán hàng / Sales reports
`Must` · `P5` (mở rộng / extended: `P7`, `P8`)

- **VI:** Doanh số theo khách hàng, sản phẩm, nhân viên, chi nhánh, thời gian; đơn chưa giao; hàng đã giao chưa xuất hóa đơn; lãi gộp theo đơn / sản phẩm (chỉ người được cấp quyền xem báo cáo này).
- **EN:** Revenue by customer, product, salesperson, branch and period; open (undelivered) orders; delivered-not-invoiced; gross margin by order / product (only for users granted access to this report).

## 5. Trạng thái chứng từ / Document statuses

| Chứng từ / Document | Trạng thái / Statuses |
|---|---|
| Báo giá / Quotation | Nháp / Draft → Đã gửi / Sent → Đã chấp nhận / Accepted · Từ chối / Rejected · Hết hạn / Expired · Đã hủy / Cancelled |
| Đơn bán hàng / Sales order | Nháp / Draft → Chờ duyệt / Pending approval → Đã xác nhận / Confirmed → Giao một phần / Partially delivered → Đã giao / Delivered → Hoàn tất / Done · Tạm giữ / On hold · Đã hủy / Cancelled |
| Hóa đơn bán / Customer invoice | Nháp / Draft → Đã ghi sổ / Posted → Thu một phần / Partially paid → Đã thu đủ / Paid · Đã hủy / Cancelled |
| Trả hàng / Sales return | Nháp / Draft → Chờ duyệt / Pending approval → Đã nhận hàng / Received → Đã điều chỉnh / Credited |

- **VI:** Trạng thái Chờ duyệt có từ P7; từ P5 đến P6, chứng từ chuyển thẳng từ Nháp sang trạng thái kế tiếp. Trạng thái Hết hạn của báo giá có từ P8 (`FR-SAL-005`).
- **EN:** The Pending approval status arrives in P7; from P5 to P6, documents move straight from Draft to the next status. The quotation Expired status arrives in P8 (`FR-SAL-005`).

## 6. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-SAL-001 | Không hủy đơn đã có phiếu xuất kho đã ghi sổ; phải lập phiếu trả hàng. | Orders with posted goods issues cannot be cancelled; a return must be created instead. | P5 |
| BR-SAL-002 | Số lượng xuất hóa đơn không vượt số lượng đã giao (chính sách theo giao hàng) hoặc số lượng đặt (chính sách theo đơn). | Invoiced quantity cannot exceed delivered quantity (delivery policy) or ordered quantity (order policy). | P5 |
| BR-SAL-004 | Thời điểm lập hóa đơn tuân theo quy định về hóa đơn điện tử; hệ thống cảnh báo phiếu xuất đã giao nhưng chưa lập hóa đơn quá N ngày. | Invoice timing follows e-invoice regulations; the system warns about delivered goods not invoiced after N days. | P5 |
| BR-SAL-005 | Doanh thu bằng ngoại tệ được quy đổi sang VND theo tỷ giá giao dịch thực tế tại thời điểm ghi nhận doanh thu. | Foreign-currency revenue is converted to VND at the actual transaction rate on the recognition date. | P5 |
| BR-SAL-006 | Thành tiền VND làm tròn đến đơn vị đồng; phương pháp làm tròn tiền thuế (theo dòng hoặc theo tổng) cấu hình được và phải khớp với nhà cung cấp HĐĐT. | VND amounts are rounded to whole đồng; tax rounding (per line or per total) is configurable and must match the e-invoice provider. | P5 |

## 7. Câu hỏi mở / Open questions

| # | Câu hỏi (VI) | Question (EN) |
|---|---|---|
| Q-SAL-01 | Khi vượt hạn mức công nợ: chặn hẳn hay chuyển duyệt? | When the credit limit is exceeded: block or route for approval? |
| Q-SAL-02 | Có bán hàng ký gửi (hàng gửi đại lý) không? | Is consignment selling (goods held at dealers) needed? |
| Q-SAL-03 | Các loại khuyến mãi đang áp dụng thực tế? | Which promotion types are actually used today? |
