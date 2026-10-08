# 07 · Kế toán – Tài chính / Accounting & Finance (ACC) — Giai đoạn 11 / Phase 11

[← Giai đoạn 11 · Nâng cao / Phase 11 · Advanced](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/07-accounting-finance.md) · [P6](../phase-06-receivables-payables-cash/07-accounting-finance.md) · [P9](../phase-09-accounting-einvoicing/07-accounting-finance.md) · [P10](../phase-10-expansion/07-accounting-finance.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Dự phòng nợ khó đòi; hỗ trợ thuế TNDN; kiểm kê tài sản; ngân sách.
- **EN:** Doubtful-debt provisions; CIT support; asset counts; budgeting.

## 1. Yêu cầu chức năng / Functional requirements

**Công nợ phải thu / Accounts receivable**

#### FR-ACC-019 · Dự phòng nợ phải thu khó đòi / Doubtful debt provision
`Could` · `P11`

- **VI:** Hỗ trợ lập dự phòng nợ khó đòi theo tuổi nợ và tỷ lệ cấu hình; người dùng có thể điều chỉnh từng khoản.
- **EN:** Support doubtful-debt provisions by aging and configurable rates; users can adjust individual items.

**Thuế / Tax**

#### FR-ACC-032 · Hỗ trợ thuế thu nhập doanh nghiệp / Corporate income tax support
`Could` · `P11`

- **VI:** Đánh dấu chi phí không được trừ khi tính thuế TNDN; báo cáo hỗ trợ tạm tính và quyết toán thuế TNDN.
- **EN:** Flag non-deductible expenses; reports supporting provisional and annual CIT calculation.

**Tài sản cố định & công cụ dụng cụ / Fixed assets & tools**

#### FR-ACC-037 · Kiểm kê tài sản / Asset count
`Could` · `P11`

- **VI:** Lập kỳ kiểm kê tài sản, ghi nhận tình trạng thực tế (có QR code trên nhãn tài sản là `Could`).
- **EN:** Run asset counts and record physical condition (QR-code asset labels are `Could`).

**Ngân sách / Budgeting**

#### FR-ACC-042 · Lập & kiểm soát ngân sách / Budget planning & control
`Could` · `P11`

- **VI:** Lập ngân sách theo tài khoản / khoản mục, phòng ban và tháng; so sánh thực tế với ngân sách; cảnh báo hoặc chặn khi đề nghị mua / đơn mua vượt ngân sách còn lại.
- **EN:** Plan budgets by account / category, department and month; compare actual vs. budget; warn or block when purchase requests / POs exceed the remaining budget.
