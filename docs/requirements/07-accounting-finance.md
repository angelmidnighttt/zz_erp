# 07 · Kế toán – Tài chính / Accounting & Finance (ACC)

[← Mục lục / Index](../README.md)

---

## 1. Mục tiêu / Objectives

- **VI:** Ghi nhận đầy đủ, chính xác mọi nghiệp vụ kinh tế phát sinh theo chế độ kế toán Việt Nam; tự động hóa hạch toán từ các phân hệ; quản lý công nợ, tiền và thuế; lập sổ sách và báo cáo tài chính trực tiếp từ hệ thống; rút ngắn thời gian khóa sổ.
- **EN:** Record all business transactions completely and accurately under Vietnamese accounting standards; automate postings from all modules; manage receivables, payables, cash and tax; produce books and financial statements directly from the system; shorten the closing cycle.

## 2. Phạm vi & chế độ kế toán / Scope & accounting regime

| Phân hệ con / Sub-module | Giai đoạn / Phase |
|---|---|
| Sổ cái / General ledger (GL) | P1 |
| Công nợ phải thu / Accounts receivable (AR) | P1 |
| Công nợ phải trả / Accounts payable (AP) | P1 |
| Tiền mặt & ngân hàng / Cash & bank | P1 |
| Thuế / Tax | P1 |
| Báo cáo tài chính & sổ sách / Financial statements & books | P1 |
| Tài sản cố định & công cụ dụng cụ / Fixed assets & tools | P2 |
| Ngân sách / Budgeting | P2 |

- **VI:** Hệ thống hỗ trợ chế độ kế toán doanh nghiệp theo Thông tư 99/2025/TT-BTC (thay thế Thông tư 200/2014/TT-BTC từ 01/01/2026) và Thông tư 133/2016/TT-BTC cho doanh nghiệp nhỏ và vừa; chọn trong thông tin doanh nghiệp (FR-SYS-001). Hệ thống tài khoản, mẫu chứng từ, mẫu sổ và mẫu báo cáo phải theo chế độ được chọn và cập nhật được khi quy định thay đổi.
- **EN:** The system supports the enterprise accounting regime under Circular 99/2025/TT-BTC (replacing Circular 200/2014/TT-BTC from 2026-01-01) and Circular 133/2016/TT-BTC for SMEs, selected in the company profile (FR-SYS-001). Chart of accounts, document forms, book formats and report templates follow the selected regime and must be updatable when regulations change.

> Các tham chiếu pháp lý cần được kế toán trưởng xác nhận lại trước khi triển khai.
> Legal references must be re-validated by the chief accountant before implementation.

## 3. Hạch toán tự động mẫu / Sample automatic postings

> Số hiệu tài khoản chỉ mang tính minh họa; hệ thống cho phép cấu hình theo chế độ kế toán áp dụng.
> Account numbers are illustrative; the system allows configuration per the applicable regime.

| Nghiệp vụ (VI) | Transaction (EN) | Nợ / Debit | Có / Credit |
|---|---|---|---|
| Nhập kho hàng mua trong nước | Domestic purchase receipt | 156 (152, 153), 1331 | 331 |
| Thuế nhập khẩu hàng mua | Import duty | 156 | 3333 |
| Thuế GTGT hàng nhập khẩu | Import VAT | 1331 | 33312 |
| Xuất kho bán hàng (giá vốn) | Goods issue for sale (COGS) | 632 | 156 |
| Hóa đơn bán hàng | Customer invoice | 131 | 511, 33311 |
| Hàng bán bị trả lại | Sales return | TK giảm trừ doanh thu / revenue deduction account, 33311 | 131 |
| Nhập lại kho hàng bị trả | Returned goods back to stock | 156 | 632 |
| Thu tiền khách hàng | Customer receipt | 111, 112 | 131 |
| Thanh toán nhà cung cấp | Supplier payment | 331 | 111, 112 |
| Xuất dùng nội bộ | Internal consumption | 641, 642 | 152, 153, 156 |
| Kiểm kê thiếu chờ xử lý | Count shortage pending resolution | 1381 | 156 |
| Kiểm kê thừa chờ xử lý | Count surplus pending resolution | 156 | 3381 |
| Tạm ứng nhân viên | Employee advance | 141 | 111, 112 |
| Khấu hao TSCĐ | Fixed-asset depreciation | 641, 642 | 214 |
| Lãi chênh lệch tỷ giá đã thực hiện | Realized FX gain | TK tiền / công nợ liên quan / Related cash or AR/AP account | 515 |
| Lỗ chênh lệch tỷ giá đã thực hiện | Realized FX loss | 635 | TK tiền / công nợ liên quan / Related cash or AR/AP account |

## 4. Yêu cầu chức năng / Functional requirements

### 4.1 Thiết lập / Setup

#### FR-ACC-001 · Hệ thống tài khoản / Chart of accounts
`Must` · `P1`

- **VI:** Nạp sẵn hệ thống tài khoản theo chế độ kế toán được chọn; cho phép mở tài khoản chi tiết nhiều cấp. Thuộc tính tài khoản: tên VI/EN, tính chất (dư Nợ / dư Có / lưỡng tính), có theo dõi đối tượng (khách hàng, nhà cung cấp, nhân viên), theo dõi ngoại tệ, được phép hạch toán hay không.
- **EN:** Preload the chart of accounts for the selected regime; allow multi-level sub-accounts. Account attributes: VI/EN names, nature (debit / credit / both), partner tracking (customer, supplier, employee), foreign-currency tracking, postable or not.

#### FR-ACC-002 · Năm tài chính & kỳ kế toán / Fiscal years & periods
`Must` · `P1`

- **VI:** Khai báo năm tài chính (có thể khác năm dương lịch), kỳ kế toán theo tháng; mỗi kỳ có trạng thái mở / khóa theo từng phân hệ.
- **EN:** Define fiscal years (may differ from the calendar year) with monthly periods; each period has an open / locked status per module.

#### FR-ACC-003 · Chiều phân tích / Analytical dimensions
`Should` · `P1`

- **VI:** Gắn chiều phân tích lên dòng bút toán: chi nhánh, phòng ban, khoản mục chi phí, vụ việc / hợp đồng, sản phẩm; dùng cho báo cáo quản trị.
- **EN:** Tag journal lines with analytical dimensions: branch, department, expense category, case / contract, product; used for management reporting.

#### FR-ACC-004 · Số dư đầu kỳ / Opening balances
`Must` · `P1`

- **VI:** Nhập số dư đầu kỳ tài khoản; công nợ đầu kỳ chi tiết theo từng hóa đơn (số, ngày, hạn thanh toán, ngoại tệ); tồn kho đầu kỳ theo kho, lô và giá trị. Hệ thống kiểm tra cân đối và khớp giữa số dư tổng hợp và chi tiết.
- **EN:** Import opening account balances; opening AR/AP detailed per invoice (number, date, due date, currency); opening stock by warehouse, lot and value. The system checks balancing and that summary and detail balances agree.

#### FR-ACC-005 · Cấu hình hạch toán tự động / Posting configuration
`Must` · `P1`

- **VI:** Cấu hình tài khoản hạch toán cho từng loại nghiệp vụ theo sản phẩm / nhóm sản phẩm / kho / nhóm đối tác / thuế suất.
- **EN:** Configure posting accounts for each transaction type by product / category / warehouse / partner group / tax code.

### 4.2 Sổ cái / General ledger

#### FR-ACC-006 · Bút toán thủ công / Manual journal entries
`Must` · `P1`

- **VI:** Lập chứng từ nghiệp vụ khác với nhiều dòng Nợ / Có, đối tượng, chiều phân tích, ngoại tệ, diễn giải, đính kèm; hệ thống kiểm tra cân đối trước khi ghi sổ. Bút toán thủ công có thể yêu cầu duyệt.
- **EN:** Create general journal entries with multiple debit / credit lines, partner, dimensions, currency, description and attachments; the system checks balance before posting. Manual entries may require approval.

#### FR-ACC-007 · Bút toán tự động từ các phân hệ / Automatic entries from modules
`Must` · `P1`

- **VI:** Chứng từ bán hàng, mua hàng, kho, tiền, lương tự động sinh bút toán khi được xác nhận / ghi sổ. Từ bút toán xem được chứng từ gốc và ngược lại (drill-down).
- **EN:** Sales, purchasing, inventory, cash and payroll documents generate entries automatically when confirmed / posted. Users can drill from an entry to its source document and back.

#### FR-ACC-008 · Bút toán định kỳ & phân bổ / Recurring entries & allocations
`Should` · `P1`

- **VI:** Thiết lập bút toán định kỳ (chi phí thuê, phân bổ chi phí trả trước…) theo lịch; hệ thống tạo bút toán nháp mỗi kỳ để kế toán xác nhận.
- **EN:** Set up recurring entries (rent, prepaid expense amortization…) on a schedule; the system creates draft entries each period for review.

#### FR-ACC-009 · Bút toán đảo / Reversal entries
`Must` · `P1`

- **VI:** Đảo một bút toán đã ghi sổ bằng một thao tác (cùng kỳ hoặc kỳ sau); bút toán gốc và bút toán đảo liên kết với nhau.
- **EN:** Reverse a posted entry in one action (same or next period); original and reversal are linked.

#### FR-ACC-010 · Kết chuyển cuối kỳ / Period-end closing entries
`Must` · `P1`

- **VI:** Thiết lập và chạy các bước kết chuyển: doanh thu, giảm trừ doanh thu, giá vốn, chi phí → xác định kết quả kinh doanh → lợi nhuận chưa phân phối; xem trước kết quả trước khi ghi.
- **EN:** Configure and run closing steps: revenue, revenue deductions, COGS, expenses → profit and loss determination → retained earnings; preview results before posting.

#### FR-ACC-011 · Khóa sổ / Period lock
`Must` · `P1`

- **VI:** Khóa kỳ theo từng phân hệ hoặc toàn bộ; mở lại kỳ đã khóa chỉ dành cho kế toán trưởng, bắt buộc ghi lý do và được ghi nhật ký.
- **EN:** Lock periods per module or globally; only the chief accountant can reopen a locked period, with a mandatory reason that is logged.

#### FR-ACC-012 · Ngoại tệ / Foreign currency
`Must` · `P1`

- **VI:** Ghi nhận nghiệp vụ ngoại tệ theo tỷ giá giao dịch thực tế; tính tỷ giá ghi sổ (bình quân gia quyền di động hoặc đích danh) khi thanh toán; tự động hạch toán chênh lệch tỷ giá đã thực hiện; đánh giá lại số dư khoản mục tiền tệ có gốc ngoại tệ cuối kỳ.
- **EN:** Record foreign-currency transactions at the actual transaction rate; compute the book rate (moving weighted average or specific) on settlement; auto-post realized FX differences; revalue foreign-currency monetary balances at period end.

### 4.3 Công nợ phải thu / Accounts receivable

#### FR-ACC-013 · Công nợ theo chứng từ / Open-item receivables
`Must` · `P1`

- **VI:** Theo dõi công nợ phải thu theo khách hàng và từng hóa đơn (số tiền, đã thu, còn lại, hạn thanh toán), cả nguyên tệ và VND.
- **EN:** Track receivables per customer and per invoice (amount, paid, outstanding, due date) in both transaction currency and VND.

#### FR-ACC-014 · Thu tiền & cấn trừ / Receipts & allocation
`Must` · `P1`

- **VI:** Phân bổ một khoản thu cho một hoặc nhiều hóa đơn (tự động theo hạn cũ nhất hoặc chọn tay); khoản thu thừa ghi nhận là trả trước và cấn trừ sau.
- **EN:** Allocate a receipt to one or more invoices (automatically oldest-due-first or manually); overpayments become prepayments to be offset later.

#### FR-ACC-015 · Phân tích tuổi nợ / Aging analysis
`Must` · `P1`

- **VI:** Báo cáo tuổi nợ phải thu theo khoảng ngày cấu hình (mặc định: chưa đến hạn, 1–30, 31–60, 61–90, > 90 ngày), theo khách hàng, nhân viên bán hàng, chi nhánh.
- **EN:** AR aging by configurable buckets (default: not due, 1–30, 31–60, 61–90, > 90 days), by customer, salesperson and branch.

#### FR-ACC-016 · Đối chiếu công nợ / Balance confirmation
`Must` · `P1`

- **VI:** In và gửi email biên bản đối chiếu công nợ (song ngữ tùy chọn) cho khách hàng tại một thời điểm.
- **EN:** Print and email balance confirmation statements (optionally bilingual) to customers as at a date.

#### FR-ACC-017 · Bù trừ công nợ / Netting
`Should` · `P1`

- **VI:** Bù trừ công nợ phải thu và phải trả của cùng một đối tác, có chứng từ bù trừ và phê duyệt.
- **EN:** Net receivables and payables of the same partner with a netting document and approval.

#### FR-ACC-018 · Nhắc nợ / Payment reminders
`Should` · `P2`

- **VI:** Tự động gửi email nhắc nợ trước và sau hạn thanh toán theo lịch cấu hình.
- **EN:** Automatically email payment reminders before and after due dates on a configurable schedule.

#### FR-ACC-019 · Dự phòng nợ phải thu khó đòi / Doubtful debt provision
`Could` · `P2`

- **VI:** Hỗ trợ lập dự phòng nợ khó đòi theo tuổi nợ và tỷ lệ cấu hình; người dùng có thể điều chỉnh từng khoản.
- **EN:** Support doubtful-debt provisions by aging and configurable rates; users can adjust individual items.

### 4.4 Công nợ phải trả / Accounts payable

#### FR-ACC-020 · Công nợ phải trả theo chứng từ / Open-item payables
`Must` · `P1`

- **VI:** Theo dõi công nợ phải trả theo nhà cung cấp và từng hóa đơn, cả nguyên tệ và VND; báo cáo tuổi nợ phải trả và biên bản đối chiếu.
- **EN:** Track payables per supplier and per bill in transaction currency and VND; AP aging and balance confirmations.

#### FR-ACC-021 · Đề nghị thanh toán / Payment requests
`Must` · `P1`

- **VI:** Lập đề nghị thanh toán từ hóa đơn đến hạn (một hoặc nhiều hóa đơn); duyệt theo ngưỡng giá trị; sau khi duyệt, kế toán / thủ quỹ lập phiếu chi hoặc ủy nhiệm chi.
- **EN:** Create payment requests from due bills (one or many); approve by amount threshold; once approved, accounting / cashier creates the cash payment or bank transfer order.

#### FR-ACC-022 · Lịch thanh toán / Payment schedule
`Should` · `P1`

- **VI:** Dự báo các khoản phải trả theo ngày đến hạn để lập kế hoạch dòng tiền.
- **EN:** Forecast payables by due date for cash planning.

#### FR-ACC-023 · Tạm ứng & hoàn ứng / Employee advances
`Must` · `P1`

- **VI:** Nhân viên lập đề nghị tạm ứng; sau khi duyệt và chi tiền, nhân viên lập đề nghị thanh toán tạm ứng kèm chứng từ chi tiêu; hệ thống theo dõi số dư tạm ứng theo nhân viên.
- **EN:** Employees request advances; after approval and payout, they submit an advance settlement with expense receipts; the system tracks advance balances per employee.

### 4.5 Tiền mặt & ngân hàng / Cash & bank

#### FR-ACC-024 · Phiếu thu, phiếu chi / Cash receipts & payments
`Must` · `P1`

- **VI:** Lập phiếu thu / chi theo mẫu của chế độ kế toán, có số tiền bằng chữ, người nộp / nhận, lý do, liên kết đối tượng và hóa đơn; hỗ trợ nhiều quỹ.
- **EN:** Create cash receipts / payments in the regime's format with amount in words, payer / payee, reason, linked partner and invoices; supports multiple cash funds.

#### FR-ACC-025 · Giao dịch ngân hàng / Bank transactions
`Must` · `P1`

- **VI:** Ghi nhận báo có, báo nợ; lập và in ủy nhiệm chi theo mẫu của từng ngân hàng.
- **EN:** Record bank credits and debits; create and print transfer orders in each bank's format.

#### FR-ACC-026 · Chuyển tiền nội bộ / Internal transfers
`Must` · `P1`

- **VI:** Chuyển tiền giữa quỹ và ngân hàng, giữa các tài khoản ngân hàng, qua tài khoản tiền đang chuyển khi cần.
- **EN:** Transfer between cash and bank and between bank accounts, via a cash-in-transit account when needed.

#### FR-ACC-027 · Nhập sao kê & đối chiếu ngân hàng / Bank statement import & reconciliation
`Should` · `P1`

- **VI:** Nhập sao kê ngân hàng (Excel, CSV); tự động gợi ý khớp giao dịch với chứng từ (theo số tiền, ngày, nội dung chứa số chứng từ); tạo chứng từ cho giao dịch chưa có; báo cáo đối chiếu số dư sổ – ngân hàng.
- **EN:** Import bank statements (Excel, CSV); auto-suggest matches with documents (by amount, date, description containing document number); create documents for unmatched lines; book-to-bank reconciliation report.

#### FR-ACC-028 · Sổ quỹ & sổ tiền gửi / Cash book & bank book
`Must` · `P1`

- **VI:** Sổ quỹ tiền mặt, sổ tiền gửi ngân hàng theo từng tài khoản, có số dư lũy kế theo ngày. Biên bản kiểm kê quỹ là `Should`.
- **EN:** Cash book and bank book per account with running daily balance. Cash count minutes are `Should`.

### 4.6 Thuế / Tax

#### FR-ACC-029 · Thuế GTGT đầu vào & đầu ra / Input & output VAT
`Must` · `P1`

- **VI:** Tự động tổng hợp thuế GTGT từ hóa đơn mua và bán; bảng kê hóa đơn hàng hóa, dịch vụ mua vào / bán ra theo kỳ kê khai (tháng / quý).
- **EN:** Aggregate VAT from purchase and sales invoices automatically; input / output invoice listings per filing period (monthly / quarterly).

#### FR-ACC-030 · Tờ khai thuế GTGT / VAT return
`Should` · `P1`

- **VI:** Lập số liệu tờ khai thuế GTGT theo mẫu hiện hành; xuất file XML để nộp qua phần mềm hỗ trợ kê khai / cổng thuế điện tử.
- **EN:** Prepare VAT return figures in the current form; export XML for submission via the tax filing software / e-tax portal.

#### FR-ACC-031 · Quản lý hóa đơn đầu ra / Output invoice management
`Must` · `P1`

- **VI:** Theo dõi trạng thái hóa đơn điện tử đã phát hành; xử lý hủy, điều chỉnh, thay thế và lập thông báo hóa đơn có sai sót theo quy định hiện hành (qua `FR-INT-001`).
- **EN:** Track status of issued e-invoices; handle cancellation, adjustment, replacement and erroneous-invoice notifications per current regulations (via `FR-INT-001`).

#### FR-ACC-032 · Hỗ trợ thuế thu nhập doanh nghiệp / Corporate income tax support
`Could` · `P2`

- **VI:** Đánh dấu chi phí không được trừ khi tính thuế TNDN; báo cáo hỗ trợ tạm tính và quyết toán thuế TNDN.
- **EN:** Flag non-deductible expenses; reports supporting provisional and annual CIT calculation.

### 4.7 Tài sản cố định & công cụ dụng cụ / Fixed assets & tools

#### FR-ACC-033 · Sổ tài sản cố định / Fixed-asset register
`Should` · `P2`

- **VI:** Quản lý TSCĐ hữu hình và vô hình: mã, tên, nhóm, nguyên giá, nguồn vốn, ngày đưa vào sử dụng, bộ phận sử dụng, tài khoản nguyên giá / khấu hao / chi phí, thời gian khấu hao; ghi tăng từ hóa đơn mua.
- **EN:** Manage tangible and intangible fixed assets: code, name, group, cost, funding source, in-service date, using department, cost / depreciation / expense accounts, useful life; capitalize from vendor bills.

#### FR-ACC-034 · Khấu hao tự động / Automatic depreciation
`Should` · `P2`

- **VI:** Tính khấu hao hằng tháng theo phương pháp đường thẳng (mặc định), số dư giảm dần có điều chỉnh hoặc theo số lượng sản phẩm; phân bổ chi phí khấu hao theo bộ phận và sinh bút toán.
- **EN:** Compute monthly depreciation using straight-line (default), declining balance with adjustment, or units-of-production; allocate depreciation by department and generate entries.

#### FR-ACC-035 · Biến động tài sản / Asset changes
`Should` · `P2`

- **VI:** Ghi nhận điều chuyển bộ phận, đánh giá lại, nâng cấp, thanh lý / nhượng bán, ngừng khấu hao; lịch sử biến động theo từng tài sản.
- **EN:** Record transfers between departments, revaluation, upgrades, disposal / sale, depreciation suspension; full history per asset.

#### FR-ACC-036 · Công cụ dụng cụ / Tools & supplies
`Should` · `P2`

- **VI:** Ghi tăng công cụ dụng cụ, phân bổ dần chi phí qua nhiều kỳ, theo dõi bộ phận sử dụng, báo hỏng / mất.
- **EN:** Record tools & supplies, amortize their cost over several periods, track the using department, record damage / loss.

#### FR-ACC-037 · Kiểm kê tài sản / Asset count
`Could` · `P2`

- **VI:** Lập kỳ kiểm kê tài sản, ghi nhận tình trạng thực tế (có QR code trên nhãn tài sản là `Could`).
- **EN:** Run asset counts and record physical condition (QR-code asset labels are `Could`).

### 4.8 Báo cáo tài chính & sổ sách / Financial statements & books

#### FR-ACC-038 · Báo cáo tài chính / Financial statements
`Must` · `P1`

- **VI:** Lập báo cáo tình hình tài chính (bảng cân đối kế toán), báo cáo kết quả hoạt động kinh doanh, báo cáo lưu chuyển tiền tệ (trực tiếp và gián tiếp) theo mẫu của chế độ kế toán áp dụng, có số liệu kỳ trước để so sánh. Thuyết minh báo cáo tài chính là `Should`.
- **EN:** Produce the statement of financial position (balance sheet), income statement and cash flow statement (direct and indirect) in the applicable regime's format with prior-period comparatives. Notes to the financial statements are `Should`.

#### FR-ACC-039 · Sổ kế toán / Accounting books
`Must` · `P1`

- **VI:** Sổ nhật ký chung, sổ cái tài khoản, sổ chi tiết tài khoản, bảng cân đối số phát sinh (bảng cân đối tài khoản), sổ chi tiết công nợ theo đối tượng.
- **EN:** General journal, general ledger by account, account detail ledger, trial balance, partner sub-ledgers.

#### FR-ACC-040 · Báo cáo quản trị tài chính / Management financial reports
`Should` · `P1`

- **VI:** Kết quả kinh doanh theo chi nhánh, phòng ban, nhóm sản phẩm; báo cáo dòng tiền thực tế và dự báo; chi phí theo khoản mục.
- **EN:** P&L by branch, department and product group; actual and forecast cash flow; expenses by category.

#### FR-ACC-041 · Xuất & in sổ sách / Export & print books
`Must` · `P1`

- **VI:** Xuất sổ sách và báo cáo ra Excel / PDF với phần ký của người lập, kế toán trưởng, giám đốc; đáp ứng yêu cầu in sổ lưu trữ cuối năm.
- **EN:** Export books and reports to Excel / PDF with signature blocks (preparer, chief accountant, director); support year-end printing for archiving.

### 4.9 Ngân sách / Budgeting

#### FR-ACC-042 · Lập & kiểm soát ngân sách / Budget planning & control
`Could` · `P2`

- **VI:** Lập ngân sách theo tài khoản / khoản mục, phòng ban và tháng; so sánh thực tế với ngân sách; cảnh báo hoặc chặn khi đề nghị mua / đơn mua vượt ngân sách còn lại.
- **EN:** Plan budgets by account / category, department and month; compare actual vs. budget; warn or block when purchase requests / POs exceed the remaining budget.

## 5. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) |
|---|---|---|
| BR-ACC-001 | Mọi bút toán phải cân đối: tổng Nợ = tổng Có (theo VND). | Every entry must balance: total debit = total credit (in VND). |
| BR-ACC-002 | Không ghi sổ vào kỳ đã khóa. | No posting into locked periods. |
| BR-ACC-003 | Bút toán đã ghi sổ không được sửa hoặc xóa; điều chỉnh bằng bút toán đảo hoặc bút toán điều chỉnh. | Posted entries cannot be edited or deleted; corrections use reversal or adjustment entries. |
| BR-ACC-004 | Bút toán sinh từ phân hệ khác không được sửa trực tiếp ở sổ cái; phải sửa trên chứng từ gốc. | Entries generated by other modules cannot be edited in the GL; the source document must be changed. |
| BR-ACC-005 | Chỉ được hạch toán vào tài khoản chi tiết nhất (tài khoản không có tài khoản con). | Postings are only allowed on leaf accounts. |
| BR-ACC-006 | Tài khoản có theo dõi đối tượng bắt buộc nhập đối tượng trên dòng bút toán. | Partner-tracked accounts require a partner on the journal line. |
| BR-ACC-007 | Thứ tự khóa sổ: tính giá xuất kho → khấu hao, phân bổ → đánh giá lại ngoại tệ → kết chuyển → khóa kỳ. Hệ thống có danh sách kiểm tra khóa sổ. | Closing order: inventory costing → depreciation, allocations → FX revaluation → closing entries → period lock. The system provides a closing checklist. |
| BR-ACC-008 | Dữ liệu và chứng từ kế toán được lưu trữ tối thiểu 10 năm, không xóa vật lý. | Accounting data and documents are retained for at least 10 years and never physically deleted. |
| BR-ACC-009 | Số tiền lưu bằng kiểu số thập phân chính xác, không dùng số thực dấu phẩy động. | Amounts are stored as exact decimals, never floating point. |

## 6. Câu hỏi mở / Open questions

| # | Câu hỏi (VI) | Question (EN) |
|---|---|---|
| Q-ACC-01 | Kỳ kê khai thuế GTGT là tháng hay quý? | Is VAT filed monthly or quarterly? |
| Q-ACC-02 | Các chi nhánh hạch toán độc lập hay phụ thuộc? Có kê khai thuế riêng? | Do branches keep independent or dependent books? Do they file tax separately? |
| Q-ACC-03 | Ngân hàng nào đang sử dụng và định dạng sao kê? | Which banks are used and in what statement formats? |
| Q-ACC-04 | TSCĐ có cần đưa lên P1 không (số lượng tài sản hiện có)? | Should fixed assets move to P1 (how many assets exist)? |
