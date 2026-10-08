# 03 · Dữ liệu danh mục / Master Data (MDM) — Giai đoạn 2 / Phase 2

[← Giai đoạn 2 · Tổ chức & danh mục / Phase 2 · Organization & master data](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P7](../phase-07-approvals-controls/03-master-data.md) · [P8](../phase-08-operations-completion/03-master-data.md) · [P9](../phase-09-accounting-einvoicing/03-master-data.md) · [P11](../phase-11-advanced/03-master-data.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Sản phẩm, nhóm sản phẩm, đơn vị tính; khách hàng, nhà cung cấp, nhóm đối tác; tiền tệ & tỷ giá (nhập tay), thuế suất, điều khoản & phương thức thanh toán, tài khoản ngân hàng; kho, nhân viên cơ bản; bảng giá bán đơn giản.
- **EN:** Products, categories, units of measure; customers, suppliers, partner groups; currencies & rates (manual), tax codes, payment terms & methods, bank accounts; warehouses, basic employees; simple sales price lists.

## 1. Mục tiêu / Objectives

- **VI:** Quản lý tập trung, nhất quán các danh mục dùng chung cho mọi phân hệ: sản phẩm, đối tác (khách hàng, nhà cung cấp), kho, tiền tệ, thuế, điều khoản và phương thức thanh toán. Dữ liệu danh mục sạch là điều kiện tiên quyết để báo cáo chính xác.
- **EN:** Centrally and consistently manage master data shared by all modules: products, business partners (customers, suppliers), warehouses, currencies, taxes, payment terms and methods. Clean master data is a prerequisite for accurate reporting.

## 2. Yêu cầu chức năng / Functional requirements

**Sản phẩm / Products**

#### FR-MDM-001 · Hồ sơ sản phẩm / Product record
`Must` · `P2`

- **VI:** Hồ sơ sản phẩm gồm: mã, tên tiếng Việt, tên tiếng Anh, loại (hàng tồn kho / vật tư tiêu hao / dịch vụ), nhóm sản phẩm, đơn vị tính cơ bản, mã vạch, thương hiệu, quy cách, trọng lượng, kích thước, hình ảnh, thuế suất GTGT mặc định, giá bán và giá mua tham khảo, trạng thái (đang dùng / ngừng dùng).
- **EN:** A product record includes: code, Vietnamese name, English name, type (stockable / consumable / service), category, base unit of measure, barcode, brand, specification, weight, dimensions, images, default VAT rate, reference sales and purchase prices, status (active / inactive).

#### FR-MDM-002 · Nhóm sản phẩm dạng cây / Product category tree
`Must` · `P2`

- **VI:** Nhóm sản phẩm tổ chức dạng cây nhiều cấp; sản phẩm kế thừa từ nhóm các thiết lập mặc định (tài khoản kế toán, thuế suất, phương thức theo dõi lô/serial) nếu không khai báo riêng.
- **EN:** Categories form a multi-level tree; products inherit category defaults (GL accounts, tax rate, lot/serial tracking) unless overridden.

#### FR-MDM-003 · Đơn vị tính & quy đổi / Units of measure & conversion
`Must` · `P2`

- **VI:** Mỗi sản phẩm có một đơn vị tính cơ bản và nhiều đơn vị quy đổi (ví dụ 1 thùng = 24 chai). Có thể mua theo thùng, bán theo chai; tồn kho luôn lưu theo đơn vị cơ bản. Mỗi đơn vị quy đổi có thể có mã vạch riêng.
- **EN:** Each product has one base UoM and multiple conversion UoMs (e.g. 1 carton = 24 bottles). Products can be bought by carton and sold by bottle; stock is always stored in the base UoM. Each conversion UoM may have its own barcode.

**Đối tác: khách hàng & nhà cung cấp / Business partners: customers & suppliers**

#### FR-MDM-009 · Đối tác dùng chung / Unified business partner
`Must` · `P2`

- **VI:** Một đối tác có thể đồng thời là khách hàng và nhà cung cấp, dùng chung thông tin pháp lý; công nợ phải thu và phải trả được theo dõi riêng nhưng có thể bù trừ.
- **EN:** A partner can be both customer and supplier, sharing legal information; receivables and payables are tracked separately but can be netted off.

#### FR-MDM-010 · Hồ sơ khách hàng / Customer record
`Must` · `P2`

- **VI:** Mã, tên, loại (tổ chức / cá nhân), mã số thuế, địa chỉ xuất hóa đơn, nhiều địa chỉ giao hàng, nhiều người liên hệ, email nhận hóa đơn điện tử, nhóm khách hàng, nhân viên phụ trách, bảng giá, điều khoản thanh toán, hạn mức công nợ, số ngày nợ tối đa, tài khoản công nợ, tiền tệ giao dịch.
- **EN:** Code, name, type (organization / individual), tax ID, billing address, multiple shipping addresses, multiple contacts, e-invoice email, customer group, assigned salesperson, price list, payment terms, credit limit, maximum overdue days, receivable account, transaction currency.

#### FR-MDM-011 · Hồ sơ nhà cung cấp / Supplier record
`Must` · `P2`

- **VI:** Tương tự khách hàng, bổ sung: nhiều tài khoản ngân hàng, thời gian giao hàng mặc định, điều kiện giao hàng (Incoterms cho hàng nhập khẩu), tài khoản công nợ phải trả.
- **EN:** Same as customers, plus: multiple bank accounts, default lead time, delivery terms (Incoterms for imports), payable account.

#### FR-MDM-012 · Kiểm tra mã số thuế / Tax ID validation
`Must` · `P2`

- **VI:** Kiểm tra định dạng mã số thuế: 10 chữ số (doanh nghiệp), 10-3 chữ số (chi nhánh / đơn vị phụ thuộc), 12 chữ số (số định danh cá nhân dùng làm mã số thuế cá nhân). Tra cứu tên và địa chỉ từ mã số thuế qua dịch vụ bên ngoài là `Should`, `P10`.
- **EN:** Validate tax ID format: 10 digits (enterprise), 10-3 digits (branch / dependent unit), 12 digits (personal identification number used as personal tax ID). Looking up name and address by tax ID via an external service is `Should`, `P10`.

#### FR-MDM-014 · Nhóm đối tác / Partner groups
`Must` · `P2`

- **VI:** Phân nhóm khách hàng và nhà cung cấp (ví dụ đại lý, bán lẻ, dự án) để áp bảng giá, chính sách công nợ, báo cáo.
- **EN:** Group customers and suppliers (e.g. dealer, retail, project) to drive price lists, credit policies and reporting.

**Danh mục tài chính / Financial master data**

#### FR-MDM-016 · Tiền tệ & tỷ giá / Currencies & exchange rates
`Must` · `P2`

- **VI:** Khai báo tiền tệ (mã ISO, ký hiệu, số chữ số thập phân, cách đọc bằng chữ). Tỷ giá theo ngày, gồm tỷ giá mua, bán, chuyển khoản; nhập tay hoặc nhập từ file. Lấy tỷ giá tự động từ ngân hàng là `Could`, `P11`.
- **EN:** Define currencies (ISO code, symbol, decimals, amount-in-words wording). Daily exchange rates with buying, selling and transfer rates; entered manually or imported from file. Automatic rate retrieval from banks is `Could`, `P11`.

#### FR-MDM-017 · Thuế suất / Tax codes
`Must` · `P2`

- **VI:** Danh mục thuế GTGT: 0%, 5%, 8%, 10%, không chịu thuế (KCT), không kê khai tính nộp thuế (KKKNT) và các mức khác theo quy định; mỗi thuế suất có ngày hiệu lực và tài khoản thuế đầu vào / đầu ra.
- **EN:** VAT codes: 0%, 5%, 8%, 10%, not subject to VAT (KCT), not declared (KKKNT) and other legal rates; each code has validity dates and input / output tax accounts.

#### FR-MDM-018 · Điều khoản thanh toán / Payment terms
`Must` · `P2` (mở rộng / extended: `P8`)

- **VI:** Hỗ trợ: thanh toán ngay, sau N ngày, cuối tháng + N ngày. Hạn thanh toán được tính tự động trên hóa đơn.
- **EN:** Support: immediate, net N days, end of month + N days. Due dates are computed automatically on invoices.

#### FR-MDM-019 · Phương thức thanh toán / Payment methods
`Must` · `P2`

- **VI:** Tiền mặt, chuyển khoản, thẻ, bù trừ công nợ; mỗi phương thức gắn với tài khoản tiền mặc định.
- **EN:** Cash, bank transfer, card, netting; each method maps to a default cash/bank account.

#### FR-MDM-020 · Tài khoản ngân hàng của công ty / Company bank accounts
`Must` · `P2`

- **VI:** Số tài khoản, ngân hàng, chi nhánh ngân hàng, tiền tệ, tài khoản kế toán tương ứng (TK 112x).
- **EN:** Account number, bank, bank branch, currency, mapped GL account (112x).

**Kho & danh mục khác / Warehouses & other master data**

#### FR-MDM-021 · Kho & vị trí / Warehouses & locations
`Must` · `P2` (mở rộng / extended: `P8`)

- **VI:** Kho có mã, tên, chi nhánh, địa chỉ, thủ kho, loại (thường / hàng đi đường / hàng gửi bán / hàng lỗi).
- **EN:** Warehouses have code, name, branch, address, keeper, type (normal / in-transit / consignment / defective).

#### FR-MDM-022 · Nhân viên cơ bản / Basic employee data
`Must` · `P2`

- **VI:** Danh mục nhân viên tối thiểu (mã, tên, phòng ban, chức danh, email, điện thoại) dùng cho nhân viên bán hàng, người nhận hàng, tạm ứng… Hồ sơ đầy đủ quản lý ở phân hệ Nhân sự (P10).
- **EN:** Minimal employee list (code, name, department, title, email, phone) used for salespeople, recipients, advances… Full records are managed in the HR module (P10).

**Bảng giá / Price lists**

#### FR-MDM-025 · Bảng giá bán / Sales price lists
`Must` · `P2` (mở rộng / extended: `P7`, `P8`)

- **VI:** Tạo nhiều bảng giá bán, áp dụng cho khách hàng hoặc nhóm khách hàng; mỗi dòng giá có sản phẩm, đơn vị tính, giá (gồm hoặc chưa gồm thuế), ngày hiệu lực từ – đến.
- **EN:** Create multiple sales price lists assigned to customers or customer groups; each price line has product, UoM, price (tax-inclusive or exclusive) and validity from – to.

## 3. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-MDM-001 | Mã sản phẩm và mã đối tác là duy nhất trong hệ thống và không được sửa sau khi đã phát sinh giao dịch. | Product and partner codes are unique system-wide and cannot change once used in transactions. | P2 |
| BR-MDM-002 | Không được đổi đơn vị tính cơ bản hoặc phương thức theo dõi lô/serial khi sản phẩm còn tồn kho hoặc đã có giao dịch. | Base UoM and lot/serial tracking cannot change while the product has stock or transactions. | P2 |
| BR-MDM-003 | Danh mục đã phát sinh giao dịch chỉ được ngừng sử dụng, không được xóa. | Master data used in transactions can only be deactivated, not deleted. | P2 |
| BR-MDM-005 | Nếu không có tỷ giá cho ngày chứng từ, hệ thống dùng tỷ giá gần nhất trước đó và hiển thị cảnh báo. | If no rate exists for the document date, the most recent prior rate is used and a warning is shown. | P2 |
| BR-MDM-006 | Sản phẩm loại dịch vụ không phát sinh tồn kho. | Service-type products never carry stock. | P2 |

## 4. Câu hỏi mở / Open questions

| # | Câu hỏi (VI) | Question (EN) |
|---|---|---|
| Q-MDM-01 | Quy tắc đặt mã sản phẩm và mã đối tác hiện tại? Có cần sinh mã tự động? | Current product and partner coding rules? Should codes be auto-generated? |
| Q-MDM-02 | Khoảng bao nhiêu sản phẩm và đối tác cần chuyển đổi? | Roughly how many products and partners must be migrated? |
| Q-MDM-03 | Có sản phẩm cần biến thể (kích cỡ, màu) ngay từ P2 không? | Are product variants (size, color) needed from P2? |
