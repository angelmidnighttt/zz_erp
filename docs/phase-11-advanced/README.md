# Giai đoạn 11 — Nâng cao / Phase 11 — Advanced

[← Mục lục / Index](../README.md) · [← P10](../phase-10-expansion/README.md)

---

## 1. Mục tiêu & phạm vi / Goal & scope

- **VI:** Open API ngân hàng, sàn TMĐT, đơn vị vận chuyển, báo cáo tùy biến / BI, ngân sách, cổng nhân viên, ứng dụng di động và các tính năng "có thì tốt".
- **EN:** Bank Open API, marketplaces, carriers, custom reports / BI, budgeting, employee portal, mobile app and other nice-to-have features.
- **VI:** Cần hoàn thành P10 trước.
- **EN:** Requires P10 to be finished.

## 2. Tài liệu trong giai đoạn / Documents in this phase

| Tài liệu / Document | Nội dung (VI) | Yêu cầu / Requirements |
|---|---|---|
| [02 · Quản trị hệ thống / System Administration (SYS)](02-system-administration.md) | Đăng nhập một lần (SSO); nhắc duyệt & chuyển cấp. | FR-SYS-009, FR-SYS-018 |
| [03 · Dữ liệu danh mục / Master Data (MDM)](03-master-data.md) | Biến thể sản phẩm; mã hàng của đối tác; lấy tỷ giá tự động. | FR-MDM-005, FR-MDM-008 |
| [04 · Bán hàng / Sales (SAL)](04-sales.md) | Hoa hồng, chỉ tiêu doanh số; ảnh xác nhận giao hàng. | FR-SAL-028, FR-SAL-029 |
| [05 · Mua hàng / Purchasing (PUR)](05-purchasing.md) | Hợp đồng khung; kiểm tra chất lượng khi nhận; đánh giá nhà cung cấp. | FR-PUR-012, FR-PUR-016, FR-PUR-025 |
| [06 · Kho / Inventory (INV)](06-inventory.md) | Soạn hàng & đóng gói; dự phòng giảm giá hàng tồn kho. | FR-INV-005, FR-INV-022 |
| [07 · Kế toán – Tài chính / Accounting & Finance (ACC)](07-accounting-finance.md) | Dự phòng nợ khó đòi; hỗ trợ thuế TNDN; kiểm kê tài sản; ngân sách. | FR-ACC-019, FR-ACC-032, FR-ACC-037, FR-ACC-042 |
| [08 · Nhân sự – Tiền lương / HR & Payroll (HRM)](08-hr-payroll.md) | Sơ đồ tổ chức, quá trình công tác; cổng nhân viên tự phục vụ; chấm công bằng điện thoại. | FR-HRM-002, FR-HRM-004, FR-HRM-017 |
| [09 · Quản lý quan hệ khách hàng / CRM](09-crm.md) | Thu thập lead tự động; khiếu nại & chăm sóc khách hàng; phân khúc khách hàng. | FR-CRM-002, FR-CRM-008, FR-CRM-009 |
| [10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT)](10-reporting.md) | Gửi báo cáo định kỳ; báo cáo tùy biến; kết nối công cụ BI. | FR-RPT-007, FR-RPT-008, FR-RPT-009; R-SAL-05, R-ACC-13 |
| [11 · Tích hợp / Integrations (INT)](11-integrations.md) | Open API ngân hàng; Zalo ZNS / SMS; tỷ giá tự động; sàn TMĐT; đơn vị vận chuyển; webhook; chữ ký số. | FR-INT-004, FR-INT-007, FR-INT-008, FR-INT-011, FR-INT-012, FR-INT-015, FR-INT-016 |

## 3. NFR bắt đầu áp dụng / NFRs starting in this phase

- **VI:** `NFR-USA-006` — xem [12 · Yêu cầu phi chức năng](../common/12-non-functional.md).
- **EN:** `NFR-USA-006` — see [12 · Non-functional requirements](../common/12-non-functional.md).

## 4. Điều kiện hoàn thành / Exit criteria

- **VI:** Theo kế hoạch chi tiết từng hạng mục.
- **EN:** Per item plan.
