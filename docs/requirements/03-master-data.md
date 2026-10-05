# 03 · Dữ liệu danh mục / Master Data (MDM)

[← Mục lục / Index](../README.md)

---

## 1. Mục tiêu / Objectives

- **VI:** Quản lý tập trung, nhất quán các danh mục dùng chung cho mọi phân hệ: sản phẩm, đối tác (khách hàng, nhà cung cấp), kho, tiền tệ, thuế, điều khoản và phương thức thanh toán. Dữ liệu danh mục sạch là điều kiện tiên quyết để báo cáo chính xác.
- **EN:** Centrally and consistently manage master data shared by all modules: products, business partners (customers, suppliers), warehouses, currencies, taxes, payment terms and methods. Clean master data is a prerequisite for accurate reporting.

## 2. Yêu cầu chức năng / Functional requirements

### 2.1 Sản phẩm / Products

#### FR-MDM-001 · Hồ sơ sản phẩm / Product record
`Must` · `P1`

- **VI:** Hồ sơ sản phẩm gồm: mã, tên tiếng Việt, tên tiếng Anh, loại (hàng tồn kho / vật tư tiêu hao / dịch vụ), nhóm sản phẩm, đơn vị tính cơ bản, mã vạch, thương hiệu, quy cách, trọng lượng, kích thước, hình ảnh, thuế suất GTGT mặc định, giá bán và giá mua tham khảo, trạng thái (đang dùng / ngừng dùng).
- **EN:** A product record includes: code, Vietnamese name, English name, type (stockable / consumable / service), category, base unit of measure, barcode, brand, specification, weight, dimensions, images, default VAT rate, reference sales and purchase prices, status (active / inactive).

#### FR-MDM-002 · Nhóm sản phẩm dạng cây / Product category tree
`Must` · `P1`

- **VI:** Nhóm sản phẩm tổ chức dạng cây nhiều cấp; sản phẩm kế thừa từ nhóm các thiết lập mặc định (tài khoản kế toán, thuế suất, phương thức theo dõi lô/serial) nếu không khai báo riêng.
- **EN:** Categories form a multi-level tree; products inherit category defaults (GL accounts, tax rate, lot/serial tracking) unless overridden.

#### FR-MDM-003 · Đơn vị tính & quy đổi / Units of measure & conversion
`Must` · `P1`

- **VI:** Mỗi sản phẩm có một đơn vị tính cơ bản và nhiều đơn vị quy đổi (ví dụ 1 thùng = 24 chai). Có thể mua theo thùng, bán theo chai; tồn kho luôn lưu theo đơn vị cơ bản. Mỗi đơn vị quy đổi có thể có mã vạch riêng.
- **EN:** Each product has one base UoM and multiple conversion UoMs (e.g. 1 carton = 24 bottles). Products can be bought by carton and sold by bottle; stock is always stored in the base UoM. Each conversion UoM may have its own barcode.

#### FR-MDM-004 · Phương thức theo dõi lô / serial / Lot & serial tracking setting
`Must` · `P1`

- **VI:** Cấu hình theo sản phẩm: không theo dõi, theo lô (kèm ngày sản xuất, hạn sử dụng), hoặc theo số serial.
- **EN:** Configure per product: no tracking, by lot (with manufacturing date, expiry date), or by serial number.

#### FR-MDM-005 · Biến thể sản phẩm / Product variants
`Could` · `P2`

- **VI:** Sản phẩm mẫu có các thuộc tính (kích cỡ, màu sắc…) sinh ra các biến thể, mỗi biến thể có mã, mã vạch, giá và tồn kho riêng.
- **EN:** Product templates with attributes (size, color…) generate variants, each with its own code, barcode, price and stock.

#### FR-MDM-006 · Tài khoản kế toán mặc định / Default GL accounts
`Must` · `P1`

- **VI:** Khai báo theo nhóm hoặc sản phẩm: tài khoản kho, doanh thu, giá vốn, giảm trừ doanh thu / hàng bán bị trả lại, chi phí (cho vật tư tiêu hao và dịch vụ mua vào).
- **EN:** Define per category or product: inventory, revenue, COGS, revenue deduction / sales return, and expense accounts (for consumables and purchased services).

#### FR-MDM-007 · Tham số tồn kho / Stock parameters
`Should` · `P1`

- **VI:** Tồn tối thiểu, tồn tối đa, điểm đặt hàng lại, số lượng đặt tối thiểu, nhà cung cấp ưu tiên, thời gian giao hàng (lead time) — theo sản phẩm và kho.
- **EN:** Minimum stock, maximum stock, reorder point, minimum order quantity, preferred supplier, lead time — per product and warehouse.

#### FR-MDM-008 · Mã hàng của đối tác / Partner item codes
`Could` · `P2`

- **VI:** Lưu mã và tên hàng mà khách hàng / nhà cung cấp sử dụng để in trên chứng từ gửi cho họ.
- **EN:** Store the item codes and names used by customers / suppliers so they can be printed on documents sent to them.

### 2.2 Đối tác: khách hàng & nhà cung cấp / Business partners: customers & suppliers

#### FR-MDM-009 · Đối tác dùng chung / Unified business partner
`Must` · `P1`

- **VI:** Một đối tác có thể đồng thời là khách hàng và nhà cung cấp, dùng chung thông tin pháp lý; công nợ phải thu và phải trả được theo dõi riêng nhưng có thể bù trừ.
- **EN:** A partner can be both customer and supplier, sharing legal information; receivables and payables are tracked separately but can be netted off.

#### FR-MDM-010 · Hồ sơ khách hàng / Customer record
`Must` · `P1`

- **VI:** Mã, tên, loại (tổ chức / cá nhân), mã số thuế, địa chỉ xuất hóa đơn, nhiều địa chỉ giao hàng, nhiều người liên hệ, email nhận hóa đơn điện tử, nhóm khách hàng, nhân viên phụ trách, bảng giá, điều khoản thanh toán, hạn mức công nợ, số ngày nợ tối đa, tài khoản công nợ, tiền tệ giao dịch.
- **EN:** Code, name, type (organization / individual), tax ID, billing address, multiple shipping addresses, multiple contacts, e-invoice email, customer group, assigned salesperson, price list, payment terms, credit limit, maximum overdue days, receivable account, transaction currency.

#### FR-MDM-011 · Hồ sơ nhà cung cấp / Supplier record
`Must` · `P1`

- **VI:** Tương tự khách hàng, bổ sung: nhiều tài khoản ngân hàng, thời gian giao hàng mặc định, điều kiện giao hàng (Incoterms cho hàng nhập khẩu), tài khoản công nợ phải trả.
- **EN:** Same as customers, plus: multiple bank accounts, default lead time, delivery terms (Incoterms for imports), payable account.

#### FR-MDM-012 · Kiểm tra mã số thuế / Tax ID validation
`Must` · `P1`

- **VI:** Kiểm tra định dạng mã số thuế: 10 chữ số (doanh nghiệp), 10-3 chữ số (chi nhánh / đơn vị phụ thuộc), 12 chữ số (số định danh cá nhân dùng làm mã số thuế cá nhân). Tra cứu tên và địa chỉ từ mã số thuế qua dịch vụ bên ngoài là `Should`, `P2`.
- **EN:** Validate tax ID format: 10 digits (enterprise), 10-3 digits (branch / dependent unit), 12 digits (personal identification number used as personal tax ID). Looking up name and address by tax ID via an external service is `Should`, `P2`.

#### FR-MDM-013 · Phát hiện trùng lặp / Duplicate detection
`Should` · `P1`

- **VI:** Cảnh báo khi tạo đối tác trùng mã số thuế, số điện thoại hoặc email với đối tác đã có; cho phép gộp hai hồ sơ trùng (người có quyền).
- **EN:** Warn when a new partner shares a tax ID, phone or email with an existing one; allow authorized users to merge duplicates.

#### FR-MDM-014 · Nhóm đối tác / Partner groups
`Must` · `P1`

- **VI:** Phân nhóm khách hàng và nhà cung cấp (ví dụ đại lý, bán lẻ, dự án) để áp bảng giá, chính sách công nợ, báo cáo.
- **EN:** Group customers and suppliers (e.g. dealer, retail, project) to drive price lists, credit policies and reporting.

#### FR-MDM-015 · Duyệt thay đổi thông tin nhạy cảm / Approval of sensitive changes
`Should` · `P1`

- **VI:** Thay đổi tài khoản ngân hàng nhà cung cấp hoặc tăng hạn mức công nợ khách hàng phải được duyệt trước khi có hiệu lực.
- **EN:** Changes to supplier bank accounts or increases to customer credit limits require approval before taking effect.

### 2.3 Danh mục tài chính / Financial master data

#### FR-MDM-016 · Tiền tệ & tỷ giá / Currencies & exchange rates
`Must` · `P1`

- **VI:** Khai báo tiền tệ (mã ISO, ký hiệu, số chữ số thập phân, cách đọc bằng chữ). Tỷ giá theo ngày, gồm tỷ giá mua, bán, chuyển khoản; nhập tay hoặc nhập từ file. Lấy tỷ giá tự động từ ngân hàng là `Could`, `P2`.
- **EN:** Define currencies (ISO code, symbol, decimals, amount-in-words wording). Daily exchange rates with buying, selling and transfer rates; entered manually or imported from file. Automatic rate retrieval from banks is `Could`, `P2`.

#### FR-MDM-017 · Thuế suất / Tax codes
`Must` · `P1`

- **VI:** Danh mục thuế GTGT: 0%, 5%, 8%, 10%, không chịu thuế (KCT), không kê khai tính nộp thuế (KKKNT) và các mức khác theo quy định; mỗi thuế suất có ngày hiệu lực và tài khoản thuế đầu vào / đầu ra.
- **EN:** VAT codes: 0%, 5%, 8%, 10%, not subject to VAT (KCT), not declared (KKKNT) and other legal rates; each code has validity dates and input / output tax accounts.

#### FR-MDM-018 · Điều khoản thanh toán / Payment terms
`Must` · `P1`

- **VI:** Hỗ trợ: thanh toán ngay, sau N ngày, cuối tháng + N ngày, nhiều đợt (ví dụ 30% đặt cọc, 70% sau 30 ngày). Hạn thanh toán được tính tự động trên hóa đơn.
- **EN:** Support: immediate, net N days, end of month + N days, installments (e.g. 30% deposit, 70% after 30 days). Due dates are computed automatically on invoices.

#### FR-MDM-019 · Phương thức thanh toán / Payment methods
`Must` · `P1`

- **VI:** Tiền mặt, chuyển khoản, thẻ, bù trừ công nợ; mỗi phương thức gắn với tài khoản tiền mặc định.
- **EN:** Cash, bank transfer, card, netting; each method maps to a default cash/bank account.

#### FR-MDM-020 · Tài khoản ngân hàng của công ty / Company bank accounts
`Must` · `P1`

- **VI:** Số tài khoản, ngân hàng, chi nhánh ngân hàng, tiền tệ, tài khoản kế toán tương ứng (TK 112x).
- **EN:** Account number, bank, bank branch, currency, mapped GL account (112x).

### 2.4 Kho & danh mục khác / Warehouses & other master data

#### FR-MDM-021 · Kho & vị trí / Warehouses & locations
`Must` · `P1`

- **VI:** Kho có mã, tên, chi nhánh, địa chỉ, thủ kho, loại (thường / hàng đi đường / hàng gửi bán / hàng lỗi). Vị trí trong kho dạng cây (khu – dãy – kệ – ô) là tùy chọn theo kho.
- **EN:** Warehouses have code, name, branch, address, keeper, type (normal / in-transit / consignment / defective). Locations within a warehouse form an optional tree (zone – aisle – rack – bin).

#### FR-MDM-022 · Nhân viên cơ bản / Basic employee data
`Must` · `P1`

- **VI:** Danh mục nhân viên tối thiểu (mã, tên, phòng ban, chức danh, email, điện thoại) dùng cho nhân viên bán hàng, người nhận hàng, tạm ứng… Hồ sơ đầy đủ quản lý ở phân hệ Nhân sự (P2).
- **EN:** Minimal employee list (code, name, department, title, email, phone) used for salespeople, recipients, advances… Full records are managed in the HR module (P2).

#### FR-MDM-023 · Địa chỉ hành chính / Administrative addresses
`Should` · `P1`

- **VI:** Danh mục đơn vị hành chính theo mô hình hai cấp (tỉnh/thành phố – xã/phường) áp dụng từ 01/07/2025; vẫn lưu và hiển thị được địa chỉ cũ trên dữ liệu lịch sử.
- **EN:** Administrative units follow the two-level model (province/city – commune/ward) effective 2025-07-01; historical data keeps and displays legacy addresses.

#### FR-MDM-024 · Lịch sử thay đổi danh mục / Master data change history
`Must` · `P1`

- **VI:** Xem lịch sử thay đổi của từng bản ghi danh mục (ai, khi nào, trường nào, giá trị trước – sau) — dùng chung nhật ký kiểm toán `FR-SYS-029`.
- **EN:** View the change history of each master record (who, when, which field, before/after) — uses the shared audit log `FR-SYS-029`.

### 2.5 Bảng giá / Price lists

#### FR-MDM-025 · Bảng giá bán / Sales price lists
`Must` · `P1`

- **VI:** Tạo nhiều bảng giá bán theo tiền tệ, áp dụng cho khách hàng, nhóm khách hàng hoặc chi nhánh; mỗi dòng giá có sản phẩm, đơn vị tính, bậc số lượng, giá (gồm hoặc chưa gồm thuế), ngày hiệu lực từ – đến. Thay đổi bảng giá phải được duyệt.
- **EN:** Create multiple sales price lists per currency, assigned to customers, customer groups or branches; each price line has product, UoM, quantity tier, price (tax-inclusive or exclusive) and validity from – to. Price list changes require approval.

#### FR-MDM-026 · Giá bán tối thiểu / Minimum selling price
`Should` · `P1`

- **VI:** Khai báo giá bán tối thiểu theo sản phẩm (giá cố định hoặc % trên giá vốn); bán dưới mức này phải được duyệt (`BR-SAL-003`).
- **EN:** Define a minimum selling price per product (fixed or % over cost); selling below it requires approval (`BR-SAL-003`).

#### FR-MDM-027 · Bảng giá mua của nhà cung cấp / Supplier price lists
`Should` · `P1`

- **VI:** Lưu giá mua theo nhà cung cấp, sản phẩm, bậc số lượng, tiền tệ và thời gian hiệu lực; dùng để gợi ý giá khi lập đơn mua.
- **EN:** Store purchase prices per supplier, product, quantity tier, currency and validity; used to suggest prices on purchase orders.

## 3. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) |
|---|---|---|
| BR-MDM-001 | Mã sản phẩm và mã đối tác là duy nhất trong công ty và không được sửa sau khi đã phát sinh giao dịch. | Product and partner codes are unique within a company and cannot change once used in transactions. |
| BR-MDM-002 | Không được đổi đơn vị tính cơ bản hoặc phương thức theo dõi lô/serial khi sản phẩm còn tồn kho hoặc đã có giao dịch. | Base UoM and lot/serial tracking cannot change while the product has stock or transactions. |
| BR-MDM-003 | Danh mục đã phát sinh giao dịch chỉ được ngừng sử dụng, không được xóa. | Master data used in transactions can only be deactivated, not deleted. |
| BR-MDM-004 | Thay đổi tài khoản ngân hàng nhà cung cấp phải được duyệt và thông báo cho kế toán trưởng. | Supplier bank-account changes require approval and are notified to the chief accountant. |
| BR-MDM-005 | Nếu không có tỷ giá cho ngày chứng từ, hệ thống dùng tỷ giá gần nhất trước đó và hiển thị cảnh báo. | If no rate exists for the document date, the most recent prior rate is used and a warning is shown. |
| BR-MDM-006 | Sản phẩm loại dịch vụ không phát sinh tồn kho. | Service-type products never carry stock. |

## 4. Câu hỏi mở / Open questions

| # | Câu hỏi (VI) | Question (EN) |
|---|---|---|
| Q-MDM-01 | Quy tắc đặt mã sản phẩm và mã đối tác hiện tại? Có cần sinh mã tự động? | Current product and partner coding rules? Should codes be auto-generated? |
| Q-MDM-02 | Khoảng bao nhiêu sản phẩm và đối tác cần chuyển đổi? | Roughly how many products and partners must be migrated? |
| Q-MDM-03 | Có sản phẩm cần biến thể (kích cỡ, màu) ngay từ P1 không? | Are product variants (size, color) needed in P1? |
