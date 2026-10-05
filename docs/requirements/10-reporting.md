# 10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT)

[← Mục lục / Index](../README.md)

---

## 1. Mục tiêu / Objectives

- **VI:** Cung cấp thông tin kịp thời, chính xác cho từng cấp quản lý; mọi con số đều truy ngược được về chứng từ gốc; tuân thủ phân quyền dữ liệu.
- **EN:** Deliver timely, accurate information to each management level; every figure can be traced back to source documents; data permissions are always respected.

## 2. Yêu cầu chức năng / Functional requirements

| Giai đoạn / Phase | Nội dung (VI) | Scope (EN) |
|---|---|---|
| `P1` | Bộ lọc & nhóm dữ liệu; xuất Excel / PDF; phân quyền báo cáo; các báo cáo chuẩn của phân hệ P1 (mục 3). | Filters & grouping; Excel / PDF export; report permissions; the standard reports of P1 modules (section 3). |
| `P2` | Dashboard theo vai trò; truy ngược chứng từ; so sánh kỳ. | Role-based dashboards; drill-down; period comparison. |
| `P3` | Dashboard nâng cao. | Advanced dashboards. |
| `P4` | Gửi báo cáo định kỳ; báo cáo tùy biến; kết nối công cụ BI. | Scheduled reports; custom report builder; BI connectivity. |

### 2.1 Giai đoạn 1 — Cơ bản / Phase 1 — Basic

#### FR-RPT-002 · Bộ lọc & nhóm dữ liệu / Filters & grouping
`Must` · `P1`

- **VI:** Mọi báo cáo có bộ lọc theo kỳ, chi nhánh, kho, khách hàng, nhà cung cấp, sản phẩm, nhân viên… và cho phép nhóm, tính tổng phụ.
- **EN:** Every report filters by period, branch, warehouse, customer, supplier, product, employee… and supports grouping and subtotals.

#### FR-RPT-004 · Xuất & in báo cáo / Export & print
`Must` · `P1`

- **VI:** Xuất Excel (giữ định dạng số, không gộp ô gây khó xử lý), PDF và in; tiêu đề báo cáo theo ngôn ngữ người dùng.
- **EN:** Export to Excel (numeric formats kept, no merged cells that hinder processing), PDF and print; report titles follow the user's language.

#### FR-RPT-006 · Phân quyền báo cáo / Report permissions
`Must` · `P1` (mở rộng / extended: `P2`)

- **VI:** Quyền xem từng báo cáo theo vai trò; dữ liệu trong báo cáo tuân theo phạm vi dữ liệu (`FR-SYS-012`).
- **EN:** Report access is granted per role; report data respects data scope (`FR-SYS-012`).

### 2.2 Giai đoạn 2 — Hoàn thiện / Phase 2 — Completion

#### FR-RPT-001 · Dashboard theo vai trò / Role-based dashboards
`Must` · `P2` (mở rộng / extended: `P3`)

- **VI:** Mỗi vai trò có dashboard mặc định:
  - Ban giám đốc: doanh thu, lãi gộp, số dư tiền, phải thu / phải trả, giá trị tồn kho, top khách hàng và sản phẩm.
  - Kinh doanh: doanh số so với chỉ tiêu, đơn chờ duyệt, đơn chưa giao, công nợ khách hàng của tôi.
  - Mua hàng: đề nghị chờ xử lý, đơn mua trễ hạn, hàng đã nhận chưa có hóa đơn.
  - Kho: chứng từ chờ xử lý, hàng dưới tồn tối thiểu, lô sắp hết hạn.
  - Kế toán: công nợ đến hạn, số dư quỹ và ngân hàng, tình trạng khóa sổ.
- **EN:** Each role has a default dashboard:
  - Executive: revenue, gross margin, cash balance, receivables / payables, stock value, top customers and products.
  - Sales: revenue vs. target, orders pending approval, undelivered orders, my customers' receivables.
  - Purchasing: pending requests, late POs, received-not-billed.
  - Warehouse: pending stock documents, items below minimum, lots nearing expiry.
  - Accounting: due receivables / payables, cash and bank balances, closing status.

#### FR-RPT-003 · Truy ngược chứng từ / Drill-down
`Must` · `P2`

- **VI:** Từ số tổng hợp trên báo cáo hoặc dashboard, người dùng nhấp để xem chi tiết đến chứng từ gốc.
- **EN:** From any summary figure on a report or dashboard, users click through to the details and source documents.

#### FR-RPT-005 · So sánh kỳ / Period comparison
`Should` · `P2`

- **VI:** So sánh với kỳ trước và cùng kỳ năm trước, hiển thị chênh lệch tuyệt đối và %.
- **EN:** Compare with the previous period and the same period last year, showing absolute and % variance.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-RPT-006 | Dữ liệu trong báo cáo tuân theo quyền theo trường (`FR-SYS-013`). | Report data respects field-level permissions (`FR-SYS-013`). |

### 2.3 Giai đoạn 3 — Mở rộng / Phase 3 — Expansion

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-RPT-001 | Dashboard nâng cao: người dùng tùy chỉnh thành phần hiển thị; biểu đồ xu hướng theo thời gian. | Advanced dashboards: user-customizable widgets; trend charts over time. |

### 2.4 Giai đoạn 4 — Nâng cao / Phase 4 — Advanced

#### FR-RPT-007 · Gửi báo cáo định kỳ / Scheduled reports
`Could` · `P4`

- **VI:** Đặt lịch gửi báo cáo qua email (hằng ngày, tuần, tháng) dưới dạng Excel / PDF.
- **EN:** Schedule reports by email (daily, weekly, monthly) as Excel / PDF.

#### FR-RPT-008 · Báo cáo tùy biến / Custom report builder
`Could` · `P4`

- **VI:** Người dùng nghiệp vụ tự tạo báo cáo bằng cách chọn nguồn dữ liệu, cột, bộ lọc, nhóm và lưu thành mẫu dùng chung.
- **EN:** Business users build reports by choosing data sources, columns, filters and grouping, and save them as shared templates.

#### FR-RPT-009 · Kết nối công cụ BI / BI tool connectivity
`Could` · `P4`

- **VI:** Cung cấp kho dữ liệu hoặc bản sao chỉ đọc để kết nối Power BI, Metabase…, có kiểm soát truy cập.
- **EN:** Provide a data warehouse or read-only replica for Power BI, Metabase…, with access control.

## 3. Danh mục báo cáo chuẩn / Standard report catalog

| Mã / Code | Báo cáo (VI) | Report (EN) | Phân hệ / Module | Giai đoạn / Phase |
|---|---|---|---|---|
| R-SAL-01 | Doanh số theo khách hàng / sản phẩm / nhân viên | Sales by customer / product / salesperson | SAL | P1 |
| R-SAL-02 | Đơn hàng chưa giao | Open (undelivered) sales orders | SAL | P1 |
| R-SAL-03 | Hàng đã giao chưa xuất hóa đơn | Delivered not invoiced | SAL | P1 |
| R-SAL-04 | Lãi gộp theo đơn hàng / sản phẩm | Gross margin by order / product | SAL | P1 |
| R-SAL-05 | Thực hiện chỉ tiêu doanh số | Sales target achievement | SAL | P4 |
| R-PUR-01 | Giá trị mua theo nhà cung cấp / sản phẩm | Purchases by supplier / product | PUR | P1 |
| R-PUR-02 | Đơn mua chưa nhận đủ | Open purchase orders | PUR | P1 |
| R-PUR-03 | Hàng đã nhận chưa có hóa đơn | Received not billed | PUR | P1 |
| R-PUR-04 | Lịch sử giá mua | Purchase price history | PUR | P1 |
| R-INV-01 | Thẻ kho | Stock card | INV | P1 |
| R-INV-02 | Nhập – xuất – tồn (số lượng & giá trị) | Stock movement summary (qty & value) | INV | P1 |
| R-INV-03 | Tồn kho theo lô / hạn dùng | Stock by lot / expiry | INV | P2 |
| R-INV-04 | Hàng chậm luân chuyển, tuổi tồn kho | Slow-moving stock, stock aging | INV | P2 |
| R-INV-05 | Chênh lệch kiểm kê | Stock count variance | INV | P1 |
| R-ACC-01 | Sổ nhật ký chung | General journal | ACC | P2 |
| R-ACC-02 | Sổ cái, sổ chi tiết tài khoản | General ledger, account detail ledger | ACC | P2 |
| R-ACC-03 | Bảng cân đối số phát sinh | Trial balance | ACC | P2 |
| R-ACC-04 | Tuổi nợ phải thu / phải trả | AR / AP aging | ACC | P1 |
| R-ACC-05 | Biên bản đối chiếu công nợ | Balance confirmation statement | ACC | P2 |
| R-ACC-06 | Sổ quỹ tiền mặt, sổ tiền gửi ngân hàng | Cash book, bank book | ACC | P1 |
| R-ACC-07 | Bảng kê hóa đơn mua vào / bán ra | Purchase / sales invoice listing | ACC | P2 |
| R-ACC-08 | Báo cáo tình hình tài chính | Statement of financial position | ACC | P2 |
| R-ACC-09 | Báo cáo kết quả hoạt động kinh doanh | Income statement | ACC | P2 |
| R-ACC-10 | Báo cáo lưu chuyển tiền tệ | Cash flow statement | ACC | P2 |
| R-ACC-11 | Kết quả kinh doanh theo chi nhánh / phòng ban | P&L by branch / department | ACC | P2 |
| R-ACC-12 | Sổ tài sản cố định, bảng tính khấu hao | Fixed-asset register, depreciation schedule | ACC | P3 |
| R-ACC-13 | Ngân sách so với thực tế | Budget vs. actual | ACC | P4 |
| R-HRM-01 | Bảng lương tổng hợp | Payroll summary | HRM | P3 |
| R-HRM-02 | Báo cáo bảo hiểm, thuế TNCN | Insurance and PIT reports | HRM | P3 |
| R-CRM-01 | Phễu bán hàng, dự báo doanh số | Sales funnel, revenue forecast | CRM | P3 |

## 4. Câu hỏi mở / Open questions

| # | Câu hỏi (VI) | Question (EN) |
|---|---|---|
| Q-RPT-01 | Ban giám đốc đang theo dõi những chỉ số nào hằng ngày / tuần? | Which KPIs does management track daily / weekly today? |
| Q-RPT-02 | Có mẫu báo cáo quản trị Excel hiện hành cần giữ nguyên định dạng? | Are there existing Excel management reports whose layout must be kept? |
