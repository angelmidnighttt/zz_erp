# 11 · Tích hợp / Integrations (INT) — Giai đoạn 11 / Phase 11

[← Giai đoạn 11 · Nâng cao / Phase 11 · Advanced](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/11-integrations.md) · [P7](../phase-07-approvals-controls/11-integrations.md) · [P9](../phase-09-accounting-einvoicing/11-integrations.md) · [P10](../phase-10-expansion/11-integrations.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Open API ngân hàng; Zalo ZNS / SMS; tỷ giá tự động; sàn TMĐT; đơn vị vận chuyển; webhook; chữ ký số.
- **EN:** Bank Open API; Zalo ZNS / SMS; automatic exchange rates; marketplaces; carriers; webhooks; digital signatures.

## 1. Tổng quan tích hợp / Integration overview

| Mã / ID | Hệ thống (VI) | System (EN) | Hướng / Direction | Ưu tiên / Priority | Giai đoạn / Phase |
|---|---|---|---|---|---|
| FR-INT-004 | Open API ngân hàng | Bank Open API | Hai chiều / Two-way | Could | P11 |
| FR-INT-007 | Zalo ZNS / SMS | Zalo ZNS / SMS | ERP → Ngoài / External | Could | P11 |
| FR-INT-008 | Tỷ giá ngân hàng | Bank exchange rates | Ngoài / External → ERP | Could | P11 |
| FR-INT-011 | Sàn thương mại điện tử | E-commerce marketplaces | Hai chiều / Two-way | Could | P11 |
| FR-INT-012 | Đơn vị vận chuyển | Shipping carriers | Hai chiều / Two-way | Could | P11 |
| FR-INT-015 | Webhook | Webhooks | ERP → Ngoài / External | Could | P11 |
| FR-INT-016 | Chữ ký số | Digital signatures | ERP ↔ dịch vụ ký / signing service | Could | P11 |

## 2. Yêu cầu chức năng / Functional requirements

**Ngân hàng & thanh toán / Banking & payments**

#### FR-INT-004 · Open API ngân hàng / Bank Open API
`Could` · `P11`

- **VI:** Với ngân hàng hỗ trợ: nhận thông báo biến động số dư theo thời gian thực, tự động khớp khoản thu; tạo lệnh chi từ đề nghị thanh toán đã duyệt (có xác thực bổ sung).
- **EN:** For supporting banks: receive real-time balance notifications and auto-match receipts; initiate payments from approved payment requests (with additional authentication).

**Thông báo / Notifications**

#### FR-INT-007 · Zalo ZNS / SMS
`Could` · `P11`

- **VI:** Gửi thông báo đơn hàng, giao hàng, nhắc nợ qua Zalo ZNS hoặc SMS theo mẫu đã đăng ký.
- **EN:** Send order, delivery and payment-reminder notifications via Zalo ZNS or SMS using registered templates.

**Dữ liệu tham chiếu / Reference data**

#### FR-INT-008 · Tỷ giá tự động / Automatic exchange rates
`Could` · `P11`

- **VI:** Lấy tỷ giá hằng ngày từ nguồn ngân hàng được chọn và lưu vào bảng tỷ giá (`FR-MDM-016`).
- **EN:** Fetch daily rates from a selected bank source into the rate table (`FR-MDM-016`).

**Thiết bị & kênh kinh doanh / Devices & sales channels**

#### FR-INT-011 · Sàn thương mại điện tử / E-commerce marketplaces
`Could` · `P11`

- **VI:** Đồng bộ đơn hàng từ các sàn (ví dụ Shopee, Lazada, TikTok Shop) về ERP, đẩy tồn kho khả dụng lên sàn, đối soát doanh thu và phí sàn.
- **EN:** Sync orders from marketplaces (e.g. Shopee, Lazada, TikTok Shop) into the ERP, push available stock to the marketplaces, reconcile payouts and fees.

#### FR-INT-012 · Đơn vị vận chuyển / Shipping carriers
`Could` · `P11`

- **VI:** Tạo vận đơn với đơn vị vận chuyển (ví dụ GHN, GHTK, Viettel Post), theo dõi hành trình, đối soát tiền thu hộ (COD).
- **EN:** Create shipments with carriers (e.g. GHN, GHTK, Viettel Post), track deliveries, reconcile cash-on-delivery (COD) remittances.

**Thuế, API & hạ tầng / Tax, API & infrastructure**

#### FR-INT-015 · Webhook / Webhooks
`Could` · `P11`

- **VI:** Gửi sự kiện (đơn hàng được tạo / xác nhận, hóa đơn phát hành, thanh toán ghi nhận…) tới URL đăng ký, có chữ ký HMAC và cơ chế gửi lại.
- **EN:** Deliver events (order created / confirmed, invoice issued, payment recorded…) to registered URLs, signed with HMAC and with retries.

#### FR-INT-016 · Chữ ký số / Digital signatures
`Could` · `P11`

- **VI:** Ký số chứng từ PDF (hợp đồng, biên bản đối chiếu) bằng chữ ký số USB token hoặc dịch vụ ký số từ xa.
- **EN:** Digitally sign PDF documents (contracts, balance confirmations) using USB-token certificates or remote signing services.
