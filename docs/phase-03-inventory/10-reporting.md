# 10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT) — Giai đoạn 3 / Phase 3

[← Giai đoạn 3 · Kho cơ bản / Phase 3 · Basic inventory](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P4](../phase-04-purchasing/10-reporting.md) · [P5](../phase-05-sales/10-reporting.md) · [P6](../phase-06-receivables-payables-cash/10-reporting.md) · [P7](../phase-07-approvals-controls/10-reporting.md) · [P8](../phase-08-operations-completion/10-reporting.md) · [P9](../phase-09-accounting-einvoicing/10-reporting.md) · [P10](../phase-10-expansion/10-reporting.md) · [P11](../phase-11-advanced/10-reporting.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Bộ lọc & nhóm dữ liệu; xuất Excel / PDF; phân quyền báo cáo; báo cáo chuẩn của từng phân hệ khi phân hệ được triển khai (mục "Danh mục báo cáo chuẩn" trong `10-reporting.md` của từng giai đoạn).
- **EN:** Filters & grouping; Excel / PDF export; report permissions; each module's standard reports as the module is delivered ("Standard report catalog" in each phase's `10-reporting.md`).

## 1. Mục tiêu / Objectives

- **VI:** Cung cấp thông tin kịp thời, chính xác cho từng cấp quản lý; mọi con số đều truy ngược được về chứng từ gốc; tuân thủ phân quyền dữ liệu.
- **EN:** Deliver timely, accurate information to each management level; every figure can be traced back to source documents; data permissions are always respected.

## 2. Yêu cầu chức năng / Functional requirements

#### FR-RPT-002 · Bộ lọc & nhóm dữ liệu / Filters & grouping
`Must` · `P3`

- **VI:** Mọi báo cáo có bộ lọc theo kỳ, chi nhánh, kho, khách hàng, nhà cung cấp, sản phẩm, nhân viên… và cho phép nhóm, tính tổng phụ.
- **EN:** Every report filters by period, branch, warehouse, customer, supplier, product, employee… and supports grouping and subtotals.

#### FR-RPT-004 · Xuất & in báo cáo / Export & print
`Must` · `P3`

- **VI:** Xuất Excel (giữ định dạng số, không gộp ô gây khó xử lý), PDF và in; tiêu đề báo cáo theo ngôn ngữ người dùng.
- **EN:** Export to Excel (numeric formats kept, no merged cells that hinder processing), PDF and print; report titles follow the user's language.

#### FR-RPT-006 · Phân quyền báo cáo / Report permissions
`Must` · `P3` (mở rộng / extended: `P7`)

- **VI:** Quyền xem từng báo cáo theo vai trò. Phạm vi dữ liệu trong báo cáo áp dụng từ P7.
- **EN:** Report access is granted per role. Data scope on report data applies from P7.

## 3. Danh mục báo cáo chuẩn / Standard report catalog

| Mã / Code | Báo cáo (VI) | Report (EN) | Phân hệ / Module | Giai đoạn / Phase |
|---|---|---|---|---|
| R-INV-01 | Thẻ kho | Stock card | INV | P3 |
| R-INV-02 | Nhập – xuất – tồn (số lượng & giá trị) | Stock movement summary (qty & value) | INV | P3 |
| R-INV-05 | Chênh lệch kiểm kê | Stock count variance | INV | P3 |

## 4. Câu hỏi mở / Open questions

| # | Câu hỏi (VI) | Question (EN) |
|---|---|---|
| Q-RPT-01 | Ban giám đốc đang theo dõi những chỉ số nào hằng ngày / tuần? | Which KPIs does management track daily / weekly today? |
| Q-RPT-02 | Có mẫu báo cáo quản trị Excel hiện hành cần giữ nguyên định dạng? | Are there existing Excel management reports whose layout must be kept? |
