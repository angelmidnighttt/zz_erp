# 10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT) — Giai đoạn 9 / Phase 9

[← Giai đoạn 9 · Kế toán đầy đủ & HĐĐT / Phase 9 · Full accounting & e-invoicing](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/10-reporting.md) · [P4](../phase-04-purchasing/10-reporting.md) · [P5](../phase-05-sales/10-reporting.md) · [P6](../phase-06-receivables-payables-cash/10-reporting.md) · [P7](../phase-07-approvals-controls/10-reporting.md) · [P8](../phase-08-operations-completion/10-reporting.md) · [P10](../phase-10-expansion/10-reporting.md) · [P11](../phase-11-advanced/10-reporting.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Dashboard theo vai trò.
- **EN:** Role-based dashboards.

## 1. Yêu cầu chức năng / Functional requirements

#### FR-RPT-001 · Dashboard theo vai trò / Role-based dashboards
`Must` · `P9` (mở rộng / extended: `P10`)

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

## 2. Danh mục báo cáo chuẩn / Standard report catalog

| Mã / Code | Báo cáo (VI) | Report (EN) | Phân hệ / Module | Giai đoạn / Phase |
|---|---|---|---|---|
| R-ACC-01 | Sổ nhật ký chung | General journal | ACC | P9 |
| R-ACC-02 | Sổ cái, sổ chi tiết tài khoản | General ledger, account detail ledger | ACC | P9 |
| R-ACC-03 | Bảng cân đối số phát sinh | Trial balance | ACC | P9 |
| R-ACC-05 | Biên bản đối chiếu công nợ | Balance confirmation statement | ACC | P9 |
| R-ACC-07 | Bảng kê hóa đơn mua vào / bán ra | Purchase / sales invoice listing | ACC | P9 |
| R-ACC-08 | Báo cáo tình hình tài chính | Statement of financial position | ACC | P9 |
| R-ACC-09 | Báo cáo kết quả hoạt động kinh doanh | Income statement | ACC | P9 |
| R-ACC-10 | Báo cáo lưu chuyển tiền tệ | Cash flow statement | ACC | P9 |
| R-ACC-11 | Kết quả kinh doanh theo chi nhánh / phòng ban | P&L by branch / department | ACC | P9 |
