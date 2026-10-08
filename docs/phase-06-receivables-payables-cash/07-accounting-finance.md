# 07 · Kế toán – Tài chính / Accounting & Finance (ACC) — Giai đoạn 6 / Phase 6

[← Giai đoạn 6 · Công nợ & thu chi / Phase 6 · Receivables, payables & cash](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/07-accounting-finance.md) · [P9](../phase-09-accounting-einvoicing/07-accounting-finance.md) · [P10](../phase-10-expansion/07-accounting-finance.md) · [P11](../phase-11-advanced/07-accounting-finance.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Số dư đầu kỳ công nợ, tồn kho, tiền; công nợ phải thu / phải trả theo hóa đơn, thu tiền & cấn trừ, tuổi nợ; phiếu thu / chi, giao dịch ngân hàng, chuyển tiền nội bộ, sổ quỹ & sổ tiền gửi; ghi nhận ngoại tệ theo tỷ giá giao dịch. Sổ cái, thuế, BCTC tạm thời vẫn làm trên phần mềm kế toán hiện tại.
- **EN:** Opening AR/AP, stock and cash balances; open-item AR / AP, receipts & allocation, aging; cash receipts / payments, bank transactions, internal transfers, cash & bank books; foreign-currency recording at transaction rates. GL, tax and financial statements stay in the current accounting software for now.

## 1. Mục tiêu / Objectives

- **VI:** Ghi nhận đầy đủ, chính xác mọi nghiệp vụ kinh tế phát sinh theo chế độ kế toán Việt Nam; tự động hóa hạch toán từ các phân hệ; quản lý công nợ, tiền và thuế; lập sổ sách và báo cáo tài chính trực tiếp từ hệ thống; rút ngắn thời gian khóa sổ.
- **EN:** Record all business transactions completely and accurately under Vietnamese accounting standards; automate postings from all modules; manage receivables, payables, cash and tax; produce books and financial statements directly from the system; shorten the closing cycle.

## 2. Phạm vi & chế độ kế toán / Scope & accounting regime

| Phân hệ con / Sub-module | Giai đoạn / Phase |
|---|---|
| Công nợ phải thu / Accounts receivable (AR) | P6 |
| Công nợ phải trả / Accounts payable (AP) | P6 |
| Tiền mặt & ngân hàng / Cash & bank | P6 |
| Sổ cái / General ledger (GL) | P9 |
| Thuế / Tax | P9 |
| Báo cáo tài chính & sổ sách / Financial statements & books | P9 |
| Tài sản cố định & công cụ dụng cụ / Fixed assets & tools | P10 |
| Ngân sách / Budgeting | P11 |

- **VI:** Năm tài chính và kỳ kế toán được khai báo từ P2. Từ P6 (go-live vận hành), công nợ và thu chi chạy trên ERP; sổ cái, thuế và BCTC vẫn làm trên phần mềm kế toán hiện tại, dùng dữ liệu xuất từ ERP (`Q-ACC-05`), cho đến khi P9 hoàn thành.
- **EN:** Fiscal years and periods are set up from P2. From P6 (operations go-live), receivables, payables and cash run in the ERP; GL, tax and financial statements stay in the current accounting software, fed by data exported from the ERP (`Q-ACC-05`), until P9 is delivered.

- **VI:** Hệ thống hỗ trợ chế độ kế toán doanh nghiệp theo Thông tư 99/2025/TT-BTC (thay thế Thông tư 200/2014/TT-BTC từ 01/01/2026) và Thông tư 133/2016/TT-BTC cho doanh nghiệp nhỏ và vừa; chọn trong thông tin doanh nghiệp (FR-SYS-001). Hệ thống tài khoản, mẫu chứng từ, mẫu sổ và mẫu báo cáo phải theo chế độ được chọn và cập nhật được khi quy định thay đổi.
- **EN:** The system supports the enterprise accounting regime under Circular 99/2025/TT-BTC (replacing Circular 200/2014/TT-BTC from 2026-01-01) and Circular 133/2016/TT-BTC for SMEs, selected in the company profile (FR-SYS-001). Chart of accounts, document forms, book formats and report templates follow the selected regime and must be updatable when regulations change.

> Các tham chiếu pháp lý cần được kế toán trưởng xác nhận lại trước khi triển khai.
> Legal references must be re-validated by the chief accountant before implementation.

## 3. Yêu cầu chức năng / Functional requirements

**Thiết lập / Setup**

#### FR-ACC-004 · Số dư đầu kỳ / Opening balances
`Must` · `P6` (mở rộng / extended: `P9`)

- **VI:** Nhập công nợ đầu kỳ chi tiết theo từng hóa đơn (số, ngày, hạn thanh toán, ngoại tệ); tồn kho đầu kỳ theo kho và giá trị; số dư đầu kỳ của quỹ tiền mặt và tài khoản ngân hàng.
- **EN:** Import opening AR/AP detailed per invoice (number, date, due date, currency); opening stock by warehouse and value; opening cash fund and bank account balances.

**Sổ cái / General ledger**

#### FR-ACC-012 · Ngoại tệ / Foreign currency
`Must` · `P6` (mở rộng / extended: `P9`)

- **VI:** Ghi nhận công nợ, thu chi bằng ngoại tệ theo tỷ giá giao dịch thực tế; theo dõi cả nguyên tệ và VND.
- **EN:** Record foreign-currency receivables, payables, receipts and payments at the actual transaction rate; track both transaction currency and VND.

**Công nợ phải thu / Accounts receivable**

#### FR-ACC-013 · Công nợ theo chứng từ / Open-item receivables
`Must` · `P6`

- **VI:** Theo dõi công nợ phải thu theo khách hàng và từng hóa đơn (số tiền, đã thu, còn lại, hạn thanh toán), cả nguyên tệ và VND.
- **EN:** Track receivables per customer and per invoice (amount, paid, outstanding, due date) in both transaction currency and VND.

#### FR-ACC-014 · Thu tiền & cấn trừ / Receipts & allocation
`Must` · `P6`

- **VI:** Phân bổ một khoản thu cho một hoặc nhiều hóa đơn (tự động theo hạn cũ nhất hoặc chọn tay); khoản thu thừa ghi nhận là trả trước và cấn trừ sau.
- **EN:** Allocate a receipt to one or more invoices (automatically oldest-due-first or manually); overpayments become prepayments to be offset later.

#### FR-ACC-015 · Phân tích tuổi nợ / Aging analysis
`Must` · `P6`

- **VI:** Báo cáo tuổi nợ phải thu theo khoảng ngày cấu hình (mặc định: chưa đến hạn, 1–30, 31–60, 61–90, > 90 ngày), theo khách hàng, nhân viên bán hàng, chi nhánh.
- **EN:** AR aging by configurable buckets (default: not due, 1–30, 31–60, 61–90, > 90 days), by customer, salesperson and branch.

**Công nợ phải trả / Accounts payable**

#### FR-ACC-020 · Công nợ phải trả theo chứng từ / Open-item payables
`Must` · `P6` (mở rộng / extended: `P9`)

- **VI:** Theo dõi công nợ phải trả theo nhà cung cấp và từng hóa đơn, cả nguyên tệ và VND; báo cáo tuổi nợ phải trả.
- **EN:** Track payables per supplier and per bill in transaction currency and VND; AP aging.

**Tiền mặt & ngân hàng / Cash & bank**

#### FR-ACC-024 · Phiếu thu, phiếu chi / Cash receipts & payments
`Must` · `P6`

- **VI:** Lập phiếu thu / chi theo mẫu của chế độ kế toán, có số tiền bằng chữ, người nộp / nhận, lý do, liên kết đối tượng và hóa đơn; hỗ trợ nhiều quỹ.
- **EN:** Create cash receipts / payments in the regime's format with amount in words, payer / payee, reason, linked partner and invoices; supports multiple cash funds.

#### FR-ACC-025 · Giao dịch ngân hàng / Bank transactions
`Must` · `P6` (mở rộng / extended: `P9`)

- **VI:** Ghi nhận báo có, báo nợ, liên kết đối tượng và hóa đơn.
- **EN:** Record bank credits and debits, linked to partners and invoices.

#### FR-ACC-026 · Chuyển tiền nội bộ / Internal transfers
`Must` · `P6`

- **VI:** Chuyển tiền giữa quỹ và ngân hàng, giữa các tài khoản ngân hàng, qua tài khoản tiền đang chuyển khi cần.
- **EN:** Transfer between cash and bank and between bank accounts, via a cash-in-transit account when needed.

#### FR-ACC-028 · Sổ quỹ & sổ tiền gửi / Cash book & bank book
`Must` · `P6`

- **VI:** Sổ quỹ tiền mặt, sổ tiền gửi ngân hàng theo từng tài khoản, có số dư lũy kế theo ngày. Biên bản kiểm kê quỹ là `Should`.
- **EN:** Cash book and bank book per account with running daily balance. Cash count minutes are `Should`.

## 4. Câu hỏi mở / Open questions

| # | Câu hỏi (VI) | Question (EN) |
|---|---|---|
| Q-ACC-01 | Kỳ kê khai thuế GTGT là tháng hay quý? | Is VAT filed monthly or quarterly? |
| Q-ACC-02 | Các chi nhánh hạch toán độc lập hay phụ thuộc? Có kê khai thuế riêng? | Do branches keep independent or dependent books? Do they file tax separately? |
| Q-ACC-03 | Ngân hàng nào đang sử dụng và định dạng sao kê? | Which banks are used and in what statement formats? |
| Q-ACC-04 | TSCĐ có cần làm sớm hơn P10 không (số lượng tài sản hiện có)? | Should fixed assets come earlier than P10 (how many assets exist)? |
| Q-ACC-05 | Từ P6 đến P9, phần mềm kế toán hiện tại cần ERP xuất những dữ liệu nào (hóa đơn, phiếu thu chi, nhập xuất kho…) và theo định dạng nào? | From P6 to P9, which data (invoices, cash vouchers, stock movements…) must the ERP export for the current accounting software, and in what format? |
