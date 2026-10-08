# 07 · Kế toán – Tài chính / Accounting & Finance (ACC) — Giai đoạn 10 / Phase 10

[← Giai đoạn 10 · Mở rộng / Phase 10 · Expansion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/07-accounting-finance.md) · [P6](../phase-06-receivables-payables-cash/07-accounting-finance.md) · [P9](../phase-09-accounting-einvoicing/07-accounting-finance.md) · [P11](../phase-11-advanced/07-accounting-finance.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Nhắc nợ; tài sản cố định & công cụ dụng cụ.
- **EN:** Payment reminders; fixed assets & tools.

## 1. Yêu cầu chức năng / Functional requirements

**Công nợ phải thu / Accounts receivable**

#### FR-ACC-018 · Nhắc nợ / Payment reminders
`Should` · `P10`

- **VI:** Tự động gửi email nhắc nợ trước và sau hạn thanh toán theo lịch cấu hình.
- **EN:** Automatically email payment reminders before and after due dates on a configurable schedule.

**Tài sản cố định & công cụ dụng cụ / Fixed assets & tools**

#### FR-ACC-033 · Sổ tài sản cố định / Fixed-asset register
`Should` · `P10`

- **VI:** Quản lý TSCĐ hữu hình và vô hình: mã, tên, nhóm, nguyên giá, nguồn vốn, ngày đưa vào sử dụng, bộ phận sử dụng, tài khoản nguyên giá / khấu hao / chi phí, thời gian khấu hao; ghi tăng từ hóa đơn mua.
- **EN:** Manage tangible and intangible fixed assets: code, name, group, cost, funding source, in-service date, using department, cost / depreciation / expense accounts, useful life; capitalize from vendor bills.

#### FR-ACC-034 · Khấu hao tự động / Automatic depreciation
`Should` · `P10`

- **VI:** Tính khấu hao hằng tháng theo phương pháp đường thẳng (mặc định), số dư giảm dần có điều chỉnh hoặc theo số lượng sản phẩm; phân bổ chi phí khấu hao theo bộ phận và sinh bút toán.
- **EN:** Compute monthly depreciation using straight-line (default), declining balance with adjustment, or units-of-production; allocate depreciation by department and generate entries.

#### FR-ACC-035 · Biến động tài sản / Asset changes
`Should` · `P10`

- **VI:** Ghi nhận điều chuyển bộ phận, đánh giá lại, nâng cấp, thanh lý / nhượng bán, ngừng khấu hao; lịch sử biến động theo từng tài sản.
- **EN:** Record transfers between departments, revaluation, upgrades, disposal / sale, depreciation suspension; full history per asset.

#### FR-ACC-036 · Công cụ dụng cụ / Tools & supplies
`Should` · `P10`

- **VI:** Ghi tăng công cụ dụng cụ, phân bổ dần chi phí qua nhiều kỳ, theo dõi bộ phận sử dụng, báo hỏng / mất.
- **EN:** Record tools & supplies, amortize their cost over several periods, track the using department, record damage / loss.
