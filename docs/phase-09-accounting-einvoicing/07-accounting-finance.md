# 07 · Kế toán – Tài chính / Accounting & Finance (ACC) — Giai đoạn 9 / Phase 9

[← Giai đoạn 9 · Kế toán đầy đủ & HĐĐT / Phase 9 · Full accounting & e-invoicing](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/07-accounting-finance.md) · [P6](../phase-06-receivables-payables-cash/07-accounting-finance.md) · [P10](../phase-10-expansion/07-accounting-finance.md) · [P11](../phase-11-advanced/07-accounting-finance.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Hệ thống tài khoản, cấu hình hạch toán & bút toán tự động, bút toán thủ công / định kỳ / đảo, kết chuyển, khóa sổ; chiều phân tích; chênh lệch tỷ giá; đối chiếu & bù trừ công nợ; đề nghị thanh toán, lịch thanh toán, tạm ứng; ủy nhiệm chi, sao kê & đối chiếu ngân hàng; thuế GTGT, quản lý hóa đơn đầu ra; BCTC, sổ kế toán, báo cáo quản trị.
- **EN:** Chart of accounts, posting configuration & automatic entries, manual / recurring / reversal entries, closing entries, period lock; analytical dimensions; FX differences; balance confirmations & netting; payment requests, payment schedule, employee advances; transfer orders, bank statements & reconciliation; VAT, output invoice management; financial statements, books, management reports.

## 1. Hạch toán tự động mẫu / Sample automatic postings

> Hạch toán tự động áp dụng từ P9. Số hiệu tài khoản chỉ mang tính minh họa; hệ thống cho phép cấu hình theo chế độ kế toán áp dụng.
> Automatic posting applies from P9. Account numbers are illustrative; the system allows configuration per the applicable regime.

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

## 2. Yêu cầu chức năng / Functional requirements

**Thiết lập / Setup**

#### FR-ACC-001 · Hệ thống tài khoản / Chart of accounts
`Must` · `P9`

- **VI:** Nạp sẵn hệ thống tài khoản theo chế độ kế toán được chọn; cho phép mở tài khoản chi tiết nhiều cấp. Thuộc tính tài khoản: tên VI/EN, tính chất (dư Nợ / dư Có / lưỡng tính), có theo dõi đối tượng (khách hàng, nhà cung cấp, nhân viên), theo dõi ngoại tệ, được phép hạch toán hay không.
- **EN:** Preload the chart of accounts for the selected regime; allow multi-level sub-accounts. Account attributes: VI/EN names, nature (debit / credit / both), partner tracking (customer, supplier, employee), foreign-currency tracking, postable or not.

#### FR-ACC-003 · Chiều phân tích / Analytical dimensions
`Should` · `P9`

- **VI:** Gắn chiều phân tích lên dòng bút toán: chi nhánh, phòng ban, khoản mục chi phí, vụ việc / hợp đồng, sản phẩm; dùng cho báo cáo quản trị.
- **EN:** Tag journal lines with analytical dimensions: branch, department, expense category, case / contract, product; used for management reporting.

#### FR-ACC-005 · Cấu hình hạch toán tự động / Posting configuration
`Must` · `P9`

- **VI:** Cấu hình tài khoản hạch toán cho từng loại nghiệp vụ theo sản phẩm / nhóm sản phẩm / kho / nhóm đối tác / thuế suất.
- **EN:** Configure posting accounts for each transaction type by product / category / warehouse / partner group / tax code.

**Sổ cái / General ledger**

#### FR-ACC-006 · Bút toán thủ công / Manual journal entries
`Must` · `P9`

- **VI:** Lập chứng từ nghiệp vụ khác với nhiều dòng Nợ / Có, đối tượng, chiều phân tích, ngoại tệ, diễn giải, đính kèm; hệ thống kiểm tra cân đối trước khi ghi sổ. Bút toán thủ công có thể yêu cầu duyệt.
- **EN:** Create general journal entries with multiple debit / credit lines, partner, dimensions, currency, description and attachments; the system checks balance before posting. Manual entries may require approval.

#### FR-ACC-007 · Bút toán tự động từ các phân hệ / Automatic entries from modules
`Must` · `P9`

- **VI:** Chứng từ bán hàng, mua hàng, kho, tiền, lương tự động sinh bút toán khi được xác nhận / ghi sổ. Từ bút toán xem được chứng từ gốc và ngược lại (drill-down).
- **EN:** Sales, purchasing, inventory, cash and payroll documents generate entries automatically when confirmed / posted. Users can drill from an entry to its source document and back.

#### FR-ACC-008 · Bút toán định kỳ & phân bổ / Recurring entries & allocations
`Should` · `P9`

- **VI:** Thiết lập bút toán định kỳ (chi phí thuê, phân bổ chi phí trả trước…) theo lịch; hệ thống tạo bút toán nháp mỗi kỳ để kế toán xác nhận.
- **EN:** Set up recurring entries (rent, prepaid expense amortization…) on a schedule; the system creates draft entries each period for review.

#### FR-ACC-009 · Bút toán đảo / Reversal entries
`Must` · `P9`

- **VI:** Đảo một bút toán đã ghi sổ bằng một thao tác (cùng kỳ hoặc kỳ sau); bút toán gốc và bút toán đảo liên kết với nhau.
- **EN:** Reverse a posted entry in one action (same or next period); original and reversal are linked.

#### FR-ACC-010 · Kết chuyển cuối kỳ / Period-end closing entries
`Must` · `P9`

- **VI:** Thiết lập và chạy các bước kết chuyển: doanh thu, giảm trừ doanh thu, giá vốn, chi phí → xác định kết quả kinh doanh → lợi nhuận chưa phân phối; xem trước kết quả trước khi ghi.
- **EN:** Configure and run closing steps: revenue, revenue deductions, COGS, expenses → profit and loss determination → retained earnings; preview results before posting.

#### FR-ACC-011 · Khóa sổ / Period lock
`Must` · `P9`

- **VI:** Khóa kỳ theo từng phân hệ hoặc toàn bộ; mở lại kỳ đã khóa chỉ dành cho kế toán trưởng, bắt buộc ghi lý do và được ghi nhật ký.
- **EN:** Lock periods per module or globally; only the chief accountant can reopen a locked period, with a mandatory reason that is logged.

**Công nợ phải thu / Accounts receivable**

#### FR-ACC-016 · Đối chiếu công nợ / Balance confirmation
`Must` · `P9`

- **VI:** In và gửi email biên bản đối chiếu công nợ (song ngữ tùy chọn) cho khách hàng tại một thời điểm.
- **EN:** Print and email balance confirmation statements (optionally bilingual) to customers as at a date.

#### FR-ACC-017 · Bù trừ công nợ / Netting
`Should` · `P9`

- **VI:** Bù trừ công nợ phải thu và phải trả của cùng một đối tác, có chứng từ bù trừ và phê duyệt.
- **EN:** Net receivables and payables of the same partner with a netting document and approval.

**Công nợ phải trả / Accounts payable**

#### FR-ACC-021 · Đề nghị thanh toán / Payment requests
`Must` · `P9`

- **VI:** Lập đề nghị thanh toán từ hóa đơn đến hạn (một hoặc nhiều hóa đơn); duyệt theo ngưỡng giá trị; sau khi duyệt, kế toán / thủ quỹ lập phiếu chi hoặc ủy nhiệm chi.
- **EN:** Create payment requests from due bills (one or many); approve by amount threshold; once approved, accounting / cashier creates the cash payment or bank transfer order.

#### FR-ACC-022 · Lịch thanh toán / Payment schedule
`Should` · `P9`

- **VI:** Dự báo các khoản phải trả theo ngày đến hạn để lập kế hoạch dòng tiền.
- **EN:** Forecast payables by due date for cash planning.

#### FR-ACC-023 · Tạm ứng & hoàn ứng / Employee advances
`Must` · `P9`

- **VI:** Nhân viên lập đề nghị tạm ứng; sau khi duyệt và chi tiền, nhân viên lập đề nghị thanh toán tạm ứng kèm chứng từ chi tiêu; hệ thống theo dõi số dư tạm ứng theo nhân viên.
- **EN:** Employees request advances; after approval and payout, they submit an advance settlement with expense receipts; the system tracks advance balances per employee.

**Tiền mặt & ngân hàng / Cash & bank**

#### FR-ACC-027 · Nhập sao kê & đối chiếu ngân hàng / Bank statement import & reconciliation
`Should` · `P9`

- **VI:** Nhập sao kê ngân hàng (Excel, CSV); tự động gợi ý khớp giao dịch với chứng từ (theo số tiền, ngày, nội dung chứa số chứng từ); tạo chứng từ cho giao dịch chưa có; báo cáo đối chiếu số dư sổ – ngân hàng.
- **EN:** Import bank statements (Excel, CSV); auto-suggest matches with documents (by amount, date, description containing document number); create documents for unmatched lines; book-to-bank reconciliation report.

**Thuế / Tax**

#### FR-ACC-029 · Thuế GTGT đầu vào & đầu ra / Input & output VAT
`Must` · `P9`

- **VI:** Tự động tổng hợp thuế GTGT từ hóa đơn mua và bán; bảng kê hóa đơn hàng hóa, dịch vụ mua vào / bán ra theo kỳ kê khai (tháng / quý).
- **EN:** Aggregate VAT from purchase and sales invoices automatically; input / output invoice listings per filing period (monthly / quarterly).

#### FR-ACC-030 · Tờ khai thuế GTGT / VAT return
`Should` · `P9`

- **VI:** Lập số liệu tờ khai thuế GTGT theo mẫu hiện hành; xuất file XML để nộp qua phần mềm hỗ trợ kê khai / cổng thuế điện tử.
- **EN:** Prepare VAT return figures in the current form; export XML for submission via the tax filing software / e-tax portal.

#### FR-ACC-031 · Quản lý hóa đơn đầu ra / Output invoice management
`Must` · `P9`

- **VI:** Theo dõi trạng thái hóa đơn điện tử đã phát hành; xử lý hủy, điều chỉnh, thay thế và lập thông báo hóa đơn có sai sót theo quy định hiện hành (qua `FR-INT-001`).
- **EN:** Track status of issued e-invoices; handle cancellation, adjustment, replacement and erroneous-invoice notifications per current regulations (via `FR-INT-001`).

**Báo cáo tài chính & sổ sách / Financial statements & books**

#### FR-ACC-038 · Báo cáo tài chính / Financial statements
`Must` · `P9`

- **VI:** Lập báo cáo tình hình tài chính (bảng cân đối kế toán), báo cáo kết quả hoạt động kinh doanh, báo cáo lưu chuyển tiền tệ (trực tiếp và gián tiếp) theo mẫu của chế độ kế toán áp dụng, có số liệu kỳ trước để so sánh. Thuyết minh báo cáo tài chính là `Should`.
- **EN:** Produce the statement of financial position (balance sheet), income statement and cash flow statement (direct and indirect) in the applicable regime's format with prior-period comparatives. Notes to the financial statements are `Should`.

#### FR-ACC-039 · Sổ kế toán / Accounting books
`Must` · `P9`

- **VI:** Sổ nhật ký chung, sổ cái tài khoản, sổ chi tiết tài khoản, bảng cân đối số phát sinh (bảng cân đối tài khoản), sổ chi tiết công nợ theo đối tượng.
- **EN:** General journal, general ledger by account, account detail ledger, trial balance, partner sub-ledgers.

#### FR-ACC-040 · Báo cáo quản trị tài chính / Management financial reports
`Should` · `P9`

- **VI:** Kết quả kinh doanh theo chi nhánh, phòng ban, nhóm sản phẩm; báo cáo dòng tiền thực tế và dự báo; chi phí theo khoản mục.
- **EN:** P&L by branch, department and product group; actual and forecast cash flow; expenses by category.

#### FR-ACC-041 · Xuất & in sổ sách / Export & print books
`Must` · `P9`

- **VI:** Xuất sổ sách và báo cáo ra Excel / PDF với phần ký của người lập, kế toán trưởng, giám đốc; đáp ứng yêu cầu in sổ lưu trữ cuối năm.
- **EN:** Export books and reports to Excel / PDF with signature blocks (preparer, chief accountant, director); support year-end printing for archiving.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-ACC-002 | Trạng thái mở / khóa theo từng phân hệ (`FR-ACC-011`). | Open / locked status per module (`FR-ACC-011`). |
| FR-ACC-004 | Số dư đầu kỳ tài khoản kế toán; tồn kho đầu kỳ theo lô; kiểm tra cân đối và khớp giữa số dư tổng hợp và chi tiết. | Opening GL account balances; opening stock by lot; checks that balances are balanced and that summary and detail agree. |
| FR-ACC-012 | Tính tỷ giá ghi sổ (bình quân gia quyền di động hoặc đích danh) khi thanh toán; tự động hạch toán chênh lệch tỷ giá đã thực hiện; đánh giá lại số dư khoản mục tiền tệ có gốc ngoại tệ cuối kỳ. | Compute the book rate (moving weighted average or specific) on settlement; auto-post realized FX differences; revalue foreign-currency monetary balances at period end. |
| FR-ACC-020 | Biên bản đối chiếu công nợ phải trả (`FR-ACC-016`). | AP balance confirmations (`FR-ACC-016`). |
| FR-ACC-025 | Lập và in ủy nhiệm chi theo mẫu của từng ngân hàng. | Create and print transfer orders in each bank's format. |

## 3. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-ACC-001 | Mọi bút toán phải cân đối: tổng Nợ = tổng Có (theo VND). | Every entry must balance: total debit = total credit (in VND). | P9 |
| BR-ACC-002 | Không ghi sổ vào kỳ đã khóa. | No posting into locked periods. | P9 |
| BR-ACC-003 | Bút toán đã ghi sổ không được sửa hoặc xóa; điều chỉnh bằng bút toán đảo hoặc bút toán điều chỉnh. | Posted entries cannot be edited or deleted; corrections use reversal or adjustment entries. | P9 |
| BR-ACC-004 | Bút toán sinh từ phân hệ khác không được sửa trực tiếp ở sổ cái; phải sửa trên chứng từ gốc. | Entries generated by other modules cannot be edited in the GL; the source document must be changed. | P9 |
| BR-ACC-005 | Chỉ được hạch toán vào tài khoản chi tiết nhất (tài khoản không có tài khoản con). | Postings are only allowed on leaf accounts. | P9 |
| BR-ACC-006 | Tài khoản có theo dõi đối tượng bắt buộc nhập đối tượng trên dòng bút toán. | Partner-tracked accounts require a partner on the journal line. | P9 |
| BR-ACC-007 | Thứ tự khóa sổ: tính giá xuất kho → khấu hao, phân bổ → đánh giá lại ngoại tệ → kết chuyển → khóa kỳ. Hệ thống có danh sách kiểm tra khóa sổ. | Closing order: inventory costing → depreciation, allocations → FX revaluation → closing entries → period lock. The system provides a closing checklist. | P9 |
