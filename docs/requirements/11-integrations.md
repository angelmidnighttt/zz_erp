# 11 · Tích hợp / Integrations (INT)

[← Mục lục / Index](../README.md)

---

## 1. Mục tiêu / Objectives

- **VI:** Kết nối ERP với các hệ thống bên ngoài bắt buộc (hóa đơn điện tử, ngân hàng, email) và các kênh kinh doanh; giảm nhập liệu thủ công; bảo đảm dữ liệu trao đổi an toàn, không trùng lặp và truy vết được.
- **EN:** Connect the ERP to mandatory external systems (e-invoicing, banks, email) and business channels; reduce manual data entry; ensure exchanged data is secure, deduplicated and traceable.

## 2. Tổng quan tích hợp / Integration overview

| Mã / ID | Hệ thống (VI) | System (EN) | Hướng / Direction | Ưu tiên / Priority | Giai đoạn / Phase |
|---|---|---|---|---|---|
| FR-INT-001 | Nhà cung cấp hóa đơn điện tử | E-invoice provider | ERP → NCC / provider | Must | P1 |
| FR-INT-002 | Hóa đơn điện tử đầu vào | Inbound e-invoices | Ngoài / External → ERP | Should | P1 |
| FR-INT-003 | Sao kê ngân hàng (file) | Bank statements (file) | Ngân hàng / Bank → ERP | Should | P1 |
| FR-INT-004 | Open API ngân hàng | Bank Open API | Hai chiều / Two-way | Could | P3 |
| FR-INT-005 | Mã QR chuyển khoản (VietQR) | Payment QR codes (VietQR) | ERP → chứng từ / documents | Should | P2 |
| FR-INT-006 | Email | Email | ERP → Ngoài / External | Must | P1 |
| FR-INT-007 | Zalo ZNS / SMS | Zalo ZNS / SMS | ERP → Ngoài / External | Could | P3 |
| FR-INT-008 | Tỷ giá ngân hàng | Bank exchange rates | Ngoài / External → ERP | Could | P2 |
| FR-INT-009 | Tra cứu mã số thuế | Tax ID lookup | Ngoài / External → ERP | Should | P2 |
| FR-INT-010 | Máy chấm công | Time clocks | Thiết bị / Device → ERP | Should | P2 |
| FR-INT-011 | Sàn thương mại điện tử | E-commerce marketplaces | Hai chiều / Two-way | Could | P3 |
| FR-INT-012 | Đơn vị vận chuyển | Shipping carriers | Hai chiều / Two-way | Could | P3 |
| FR-INT-013 | Kê khai thuế (XML) | Tax filing (XML) | ERP → file | Should | P1 |
| FR-INT-014 | REST API công khai | Public REST API | Hai chiều / Two-way | Should | P2 |
| FR-INT-015 | Webhook | Webhooks | ERP → Ngoài / External | Could | P2 |
| FR-INT-016 | Chữ ký số | Digital signatures | ERP ↔ dịch vụ ký / signing service | Could | P2 |
| FR-INT-017 | Lưu trữ tệp | File storage | ERP → kho lưu trữ / storage | Must | P1 |

## 3. Yêu cầu chức năng / Functional requirements

### 3.1 Hóa đơn điện tử / E-invoicing

#### FR-INT-001 · Tích hợp nhà cung cấp hóa đơn điện tử / E-invoice provider integration
`Must` · `P1`

- **VI:** Tích hợp qua API với ít nhất một nhà cung cấp dịch vụ hóa đơn điện tử; thiết kế theo mô hình adapter để thay hoặc thêm nhà cung cấp mà không sửa nghiệp vụ. Hỗ trợ: phát hành hóa đơn (có mã / không có mã của cơ quan thuế), ký số, gửi khách hàng, tra cứu trạng thái, hủy, điều chỉnh, thay thế, thông báo hóa đơn có sai sót, phiếu xuất kho kiêm vận chuyển nội bộ điện tử; lưu bản XML và PDF trên ERP.
- **EN:** Integrate via API with at least one e-invoice provider; use an adapter pattern so providers can be replaced or added without changing business logic. Support: issuing invoices (with / without tax authority code), digital signing, sending to customers, status lookup, cancellation, adjustment, replacement, erroneous-invoice notification, electronic internal transfer notes; store XML and PDF copies in the ERP.

#### FR-INT-002 · Hóa đơn điện tử đầu vào / Inbound e-invoices
`Should` · `P1`

- **VI:** Nhận hóa đơn đầu vào qua email hoặc tải file XML; đồng bộ danh sách hóa đơn mua vào từ cổng hóa đơn điện tử của cơ quan thuế (trực tiếp hoặc qua nhà cung cấp, tùy khả năng kỹ thuật và pháp lý); đối chiếu với hóa đơn đã ghi nhận để phát hiện hóa đơn thiếu hoặc sai lệch.
- **EN:** Receive inbound invoices via email or XML upload; sync the list of purchase invoices from the tax authority's e-invoice portal (directly or via a provider, subject to technical and legal feasibility); reconcile with recorded bills to detect missing or mismatched invoices.

### 3.2 Ngân hàng & thanh toán / Banking & payments

#### FR-INT-003 · Nhập sao kê ngân hàng / Bank statement import
`Should` · `P1`

- **VI:** Nhập sao kê theo định dạng của từng ngân hàng (Excel, CSV, MT940) với bộ ánh xạ cột cấu hình được; phục vụ đối chiếu ngân hàng (`FR-ACC-027`).
- **EN:** Import statements in each bank's format (Excel, CSV, MT940) with configurable column mappings; feeds bank reconciliation (`FR-ACC-027`).

#### FR-INT-004 · Open API ngân hàng / Bank Open API
`Could` · `P3`

- **VI:** Với ngân hàng hỗ trợ: nhận thông báo biến động số dư theo thời gian thực, tự động khớp khoản thu; tạo lệnh chi từ đề nghị thanh toán đã duyệt (có xác thực bổ sung).
- **EN:** For supporting banks: receive real-time balance notifications and auto-match receipts; initiate payments from approved payment requests (with additional authentication).

#### FR-INT-005 · Mã QR chuyển khoản / Payment QR codes
`Should` · `P2`

- **VI:** In mã QR chuyển khoản theo chuẩn VietQR trên báo giá, hóa đơn, thông báo nợ, với nội dung chuyển khoản chứa số chứng từ để tự động đối soát.
- **EN:** Print VietQR transfer codes on quotations, invoices and statements, with the transfer description containing the document number for automatic matching.

### 3.3 Thông báo / Notifications

#### FR-INT-006 · Email / Email
`Must` · `P1`

- **VI:** Gửi email qua SMTP hoặc dịch vụ email giao dịch; cấu hình tên miền gửi (SPF, DKIM); theo dõi trạng thái gửi và gửi lại khi lỗi.
- **EN:** Send email via SMTP or a transactional email service; configure the sending domain (SPF, DKIM); track delivery status and retry on failure.

#### FR-INT-007 · Zalo ZNS / SMS
`Could` · `P3`

- **VI:** Gửi thông báo đơn hàng, giao hàng, nhắc nợ qua Zalo ZNS hoặc SMS theo mẫu đã đăng ký.
- **EN:** Send order, delivery and payment-reminder notifications via Zalo ZNS or SMS using registered templates.

### 3.4 Dữ liệu tham chiếu / Reference data

#### FR-INT-008 · Tỷ giá tự động / Automatic exchange rates
`Could` · `P2`

- **VI:** Lấy tỷ giá hằng ngày từ nguồn ngân hàng được chọn và lưu vào bảng tỷ giá (`FR-MDM-016`).
- **EN:** Fetch daily rates from a selected bank source into the rate table (`FR-MDM-016`).

#### FR-INT-009 · Tra cứu mã số thuế / Tax ID lookup
`Should` · `P2`

- **VI:** Tra cứu tên, địa chỉ, trạng thái hoạt động của doanh nghiệp theo mã số thuế qua dịch vụ hợp pháp; tự điền vào hồ sơ đối tác.
- **EN:** Look up company name, address and operating status by tax ID through a lawful service; pre-fill partner records.

### 3.5 Thiết bị & kênh kinh doanh / Devices & sales channels

#### FR-INT-010 · Máy chấm công / Time clocks
`Should` · `P2`

- **VI:** Nhập dữ liệu chấm công từ máy chấm công (qua file hoặc SDK / API của hãng) vào phân hệ Nhân sự.
- **EN:** Import attendance data from time clocks (via file or vendor SDK / API) into the HR module.

#### FR-INT-011 · Sàn thương mại điện tử / E-commerce marketplaces
`Could` · `P3`

- **VI:** Đồng bộ đơn hàng từ các sàn (ví dụ Shopee, Lazada, TikTok Shop) về ERP, đẩy tồn kho khả dụng lên sàn, đối soát doanh thu và phí sàn.
- **EN:** Sync orders from marketplaces (e.g. Shopee, Lazada, TikTok Shop) into the ERP, push available stock to the marketplaces, reconcile payouts and fees.

#### FR-INT-012 · Đơn vị vận chuyển / Shipping carriers
`Could` · `P3`

- **VI:** Tạo vận đơn với đơn vị vận chuyển (ví dụ GHN, GHTK, Viettel Post), theo dõi hành trình, đối soát tiền thu hộ (COD).
- **EN:** Create shipments with carriers (e.g. GHN, GHTK, Viettel Post), track deliveries, reconcile cash-on-delivery (COD) remittances.

### 3.6 Thuế, API & hạ tầng / Tax, API & infrastructure

#### FR-INT-013 · Xuất dữ liệu kê khai thuế / Tax filing export
`Should` · `P1`

- **VI:** Xuất tờ khai và bảng kê theo định dạng XML của phần mềm hỗ trợ kê khai thuế hiện hành (`FR-ACC-030`).
- **EN:** Export returns and listings in the XML format of the current tax filing software (`FR-ACC-030`).

#### FR-INT-014 · REST API công khai / Public REST API
`Should` · `P2`

- **VI:** Cung cấp REST API có phiên bản (`/api/v1`), tài liệu OpenAPI; xác thực bằng OAuth2 client credentials hoặc API key; phân quyền theo phạm vi (scope); giới hạn tần suất gọi.
- **EN:** Provide a versioned REST API (`/api/v1`) with OpenAPI docs; authenticate via OAuth2 client credentials or API keys; scope-based authorization; rate limiting.

#### FR-INT-015 · Webhook / Webhooks
`Could` · `P2`

- **VI:** Gửi sự kiện (đơn hàng được tạo / xác nhận, hóa đơn phát hành, thanh toán ghi nhận…) tới URL đăng ký, có chữ ký HMAC và cơ chế gửi lại.
- **EN:** Deliver events (order created / confirmed, invoice issued, payment recorded…) to registered URLs, signed with HMAC and with retries.

#### FR-INT-016 · Chữ ký số / Digital signatures
`Could` · `P2`

- **VI:** Ký số chứng từ PDF (hợp đồng, biên bản đối chiếu) bằng chữ ký số USB token hoặc dịch vụ ký số từ xa.
- **EN:** Digitally sign PDF documents (contracts, balance confirmations) using USB-token certificates or remote signing services.

#### FR-INT-017 · Lưu trữ tệp / File storage
`Must` · `P1`

- **VI:** Lưu tệp đính kèm, XML / PDF hóa đơn, bản in trên kho lưu trữ đối tượng tương thích S3, có mã hóa và sao lưu.
- **EN:** Store attachments, invoice XML / PDF and printouts on S3-compatible object storage with encryption and backup.

## 4. Yêu cầu chung cho tích hợp / General integration requirements

| Mã / ID | Yêu cầu (VI) | Requirement (EN) | Ưu tiên / Priority |
|---|---|---|---|
| FR-INT-018 | Nhật ký tích hợp: lưu yêu cầu / phản hồi (che dữ liệu nhạy cảm), trạng thái, số lần thử; màn hình theo dõi và xử lý lỗi. | Integration log: store requests / responses (sensitive data masked), status, attempts; monitoring and error-handling screen. | Must · P1 |
| FR-INT-019 | Chống trùng lặp (idempotency): một chứng từ không bao giờ được phát hành hai lần khi gửi lại. | Idempotency: a document must never be issued twice on retry. | Must · P1 |
| FR-INT-020 | Xử lý bất đồng bộ qua hàng đợi, thử lại có giãn cách tăng dần; thông báo cho người phụ trách khi lỗi kéo dài. | Asynchronous processing via queues, retries with exponential backoff; alert the owner on persistent failures. | Must · P1 |
| FR-INT-021 | Thông tin xác thực của bên thứ ba được lưu mã hóa, không hiển thị lại sau khi nhập. | Third-party credentials are stored encrypted and never displayed after entry. | Must · P1 |

## 5. Câu hỏi mở / Open questions

| # | Câu hỏi (VI) | Question (EN) |
|---|---|---|
| Q-INT-01 | Nhà cung cấp HĐĐT hiện tại và tài liệu API của họ? | Current e-invoice provider and its API documentation? |
| Q-INT-02 | Doanh nghiệp đang bán trên những sàn TMĐT nào, sản lượng đơn / ngày? | Which marketplaces are used, and how many orders per day? |
| Q-INT-03 | Có hệ thống nội bộ nào khác cần kết nối (website, phần mềm cũ)? | Any other internal systems to connect (website, legacy software)? |
