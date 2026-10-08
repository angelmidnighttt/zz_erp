# 10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT) — Giai đoạn 11 / Phase 11

[← Giai đoạn 11 · Nâng cao / Phase 11 · Advanced](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/10-reporting.md) · [P4](../phase-04-purchasing/10-reporting.md) · [P5](../phase-05-sales/10-reporting.md) · [P6](../phase-06-receivables-payables-cash/10-reporting.md) · [P7](../phase-07-approvals-controls/10-reporting.md) · [P8](../phase-08-operations-completion/10-reporting.md) · [P9](../phase-09-accounting-einvoicing/10-reporting.md) · [P10](../phase-10-expansion/10-reporting.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Gửi báo cáo định kỳ; báo cáo tùy biến; kết nối công cụ BI.
- **EN:** Scheduled reports; custom report builder; BI connectivity.

## 1. Yêu cầu chức năng / Functional requirements

#### FR-RPT-007 · Gửi báo cáo định kỳ / Scheduled reports
`Could` · `P11`

- **VI:** Đặt lịch gửi báo cáo qua email (hằng ngày, tuần, tháng) dưới dạng Excel / PDF.
- **EN:** Schedule reports by email (daily, weekly, monthly) as Excel / PDF.

#### FR-RPT-008 · Báo cáo tùy biến / Custom report builder
`Could` · `P11`

- **VI:** Người dùng nghiệp vụ tự tạo báo cáo bằng cách chọn nguồn dữ liệu, cột, bộ lọc, nhóm và lưu thành mẫu dùng chung.
- **EN:** Business users build reports by choosing data sources, columns, filters and grouping, and save them as shared templates.

#### FR-RPT-009 · Kết nối công cụ BI / BI tool connectivity
`Could` · `P11`

- **VI:** Cung cấp kho dữ liệu hoặc bản sao chỉ đọc để kết nối Power BI, Metabase…, có kiểm soát truy cập.
- **EN:** Provide a data warehouse or read-only replica for Power BI, Metabase…, with access control.

## 2. Danh mục báo cáo chuẩn / Standard report catalog

| Mã / Code | Báo cáo (VI) | Report (EN) | Phân hệ / Module | Giai đoạn / Phase |
|---|---|---|---|---|
| R-SAL-05 | Thực hiện chỉ tiêu doanh số | Sales target achievement | SAL | P11 |
| R-ACC-13 | Ngân sách so với thực tế | Budget vs. actual | ACC | P11 |
