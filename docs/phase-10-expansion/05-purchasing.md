# 05 · Mua hàng / Purchasing (PUR) — Giai đoạn 10 / Phase 10

[← Giai đoạn 10 · Mở rộng / Phase 10 · Expansion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P4](../phase-04-purchasing/05-purchasing.md) · [P7](../phase-07-approvals-controls/05-purchasing.md) · [P8](../phase-08-operations-completion/05-purchasing.md) · [P9](../phase-09-accounting-einvoicing/05-purchasing.md) · [P11](../phase-11-advanced/05-purchasing.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Yêu cầu báo giá & so sánh báo giá.
- **EN:** RFQs & bid comparison.

## 1. Yêu cầu chức năng / Functional requirements

**Yêu cầu báo giá / Requests for quotation**

#### FR-PUR-005 · Gửi yêu cầu báo giá / Send RFQs
`Should` · `P10`

- **VI:** Tạo yêu cầu báo giá và gửi email cho nhiều nhà cung cấp cùng lúc kèm file PDF.
- **EN:** Create an RFQ and email it to several suppliers at once with a PDF.

#### FR-PUR-006 · So sánh báo giá / Bid comparison
`Should` · `P10`

- **VI:** Nhập báo giá của từng nhà cung cấp; bảng so sánh đơn giá, tổng tiền, thời gian giao, điều khoản thanh toán; chọn nhà cung cấp kèm lý do lựa chọn và tạo đơn mua.
- **EN:** Enter each supplier's quote; compare unit price, total, lead time and payment terms side by side; select a supplier with a justification and create the PO.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-PUR-007 | Tạo đơn mua từ yêu cầu báo giá đã chọn nhà cung cấp. | Create POs from RFQs with a selected supplier. |

## 2. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-PUR-006 | Cảnh báo khi nhà cung cấp có mã số thuế ở trạng thái ngừng hoạt động hoặc rủi ro (nếu tra cứu được). | Warn when the supplier's tax ID is inactive or flagged as risky (when lookup is available). | P10 |
