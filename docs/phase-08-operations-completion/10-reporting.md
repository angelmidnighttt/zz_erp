# 10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT) — Giai đoạn 8 / Phase 8

[← Giai đoạn 8 · Hoàn thiện mua – bán – kho / Phase 8 · Operations completion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/10-reporting.md) · [P4](../phase-04-purchasing/10-reporting.md) · [P5](../phase-05-sales/10-reporting.md) · [P6](../phase-06-receivables-payables-cash/10-reporting.md) · [P7](../phase-07-approvals-controls/10-reporting.md) · [P9](../phase-09-accounting-einvoicing/10-reporting.md) · [P10](../phase-10-expansion/10-reporting.md) · [P11](../phase-11-advanced/10-reporting.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Truy ngược chứng từ; so sánh kỳ.
- **EN:** Drill-down; period comparison.

## 1. Yêu cầu chức năng / Functional requirements

#### FR-RPT-003 · Truy ngược chứng từ / Drill-down
`Must` · `P8`

- **VI:** Từ số tổng hợp trên báo cáo hoặc dashboard, người dùng nhấp để xem chi tiết đến chứng từ gốc.
- **EN:** From any summary figure on a report or dashboard, users click through to the details and source documents.

#### FR-RPT-005 · So sánh kỳ / Period comparison
`Should` · `P8`

- **VI:** So sánh với kỳ trước và cùng kỳ năm trước, hiển thị chênh lệch tuyệt đối và %.
- **EN:** Compare with the previous period and the same period last year, showing absolute and % variance.

## 2. Danh mục báo cáo chuẩn / Standard report catalog

| Mã / Code | Báo cáo (VI) | Report (EN) | Phân hệ / Module | Giai đoạn / Phase |
|---|---|---|---|---|
| R-INV-03 | Tồn kho theo lô / hạn dùng | Stock by lot / expiry | INV | P8 |
| R-INV-04 | Hàng chậm luân chuyển, tuổi tồn kho | Slow-moving stock, stock aging | INV | P8 |
