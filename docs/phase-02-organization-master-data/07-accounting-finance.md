# 07 · Kế toán – Tài chính / Accounting & Finance (ACC) — Giai đoạn 2 / Phase 2

[← Giai đoạn 2 · Tổ chức & danh mục / Phase 2 · Organization & master data](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P6](../phase-06-receivables-payables-cash/07-accounting-finance.md) · [P9](../phase-09-accounting-einvoicing/07-accounting-finance.md) · [P10](../phase-10-expansion/07-accounting-finance.md) · [P11](../phase-11-advanced/07-accounting-finance.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Năm tài chính & kỳ kế toán.
- **EN:** Fiscal years & periods.

## 1. Yêu cầu chức năng / Functional requirements

**Thiết lập / Setup**

#### FR-ACC-002 · Năm tài chính & kỳ kế toán / Fiscal years & periods
`Must` · `P2` (mở rộng / extended: `P9`)

- **VI:** Khai báo năm tài chính (có thể khác năm dương lịch), kỳ kế toán theo tháng; mỗi kỳ có trạng thái mở / khóa.
- **EN:** Define fiscal years (may differ from the calendar year) with monthly periods; each period is open or locked.

## 2. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-ACC-009 | Số tiền lưu bằng kiểu số thập phân chính xác, không dùng số thực dấu phẩy động. | Amounts are stored as exact decimals, never floating point. | P2 |

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-ACC-008 | Dữ liệu và chứng từ kế toán được lưu trữ tối thiểu 10 năm, không xóa vật lý. | Accounting data and documents are retained for at least 10 years and never physically deleted. | P3 |
