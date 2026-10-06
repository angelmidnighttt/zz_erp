# 05 · Mua hàng / Purchasing (PUR) — Giai đoạn 8 / Phase 8

[← Giai đoạn 8 · Hoàn thiện mua – bán – kho / Phase 8 · Operations completion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P4](../phase-04-purchasing/05-purchasing.md) · [P7](../phase-07-approvals-controls/05-purchasing.md) · [P9](../phase-09-accounting-einvoicing/05-purchasing.md) · [P10](../phase-10-expansion/05-purchasing.md) · [P11](../phase-11-advanced/05-purchasing.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Đề nghị mua (tạo, tự động, duyệt, gộp); gợi ý giá mua; ứng trước nhà cung cấp; dung sai nhận hàng; lô / serial khi nhận hàng; hiệu suất giao hàng của nhà cung cấp.
- **EN:** Purchase requests (create, automatic, approval, consolidation); purchase price suggestions; supplier prepayments; receiving tolerance; lots / serials on receipt; supplier delivery performance.

## 1. Yêu cầu chức năng / Functional requirements

**Đề nghị mua hàng / Purchase requests**

#### FR-PUR-001 · Tạo đề nghị mua hàng / Create purchase request
`Must` · `P8`

- **VI:** Nhân viên có quyền tạo đề nghị mua gồm: sản phẩm (hoặc mô tả tự do cho hàng chưa có mã), số lượng, ngày cần hàng, mục đích sử dụng, phòng ban, khoản mục chi phí, nhà cung cấp gợi ý, đính kèm.
- **EN:** Authorized employees create purchase requests with: product (or free-text description for uncoded items), quantity, required date, purpose, department, expense category, suggested supplier, attachments.

#### FR-PUR-002 · Đề nghị mua tự động / Automatic purchase requests
`Should` · `P8`

- **VI:** Hệ thống tự động đề xuất đề nghị mua khi tồn kho dự kiến xuống dưới điểm đặt hàng lại (`FR-INV-017`).
- **EN:** The system proposes purchase requests automatically when projected stock falls below the reorder point (`FR-INV-017`).

#### FR-PUR-003 · Duyệt đề nghị mua / Purchase request approval
`Must` · `P8`

- **VI:** Đề nghị mua đi qua luồng duyệt theo phòng ban và giá trị ước tính; người duyệt có thể điều chỉnh số lượng.
- **EN:** Purchase requests follow approval flows by department and estimated value; approvers may adjust quantities.

#### FR-PUR-004 · Gộp đề nghị mua / Consolidate requests
`Should` · `P8`

- **VI:** Nhân viên mua hàng gộp nhiều đề nghị đã duyệt thành một yêu cầu báo giá hoặc đơn mua theo nhà cung cấp; giữ liên kết để truy vết.
- **EN:** Buyers consolidate several approved requests into one RFQ or PO per supplier, keeping links for traceability.

**Đơn mua hàng / Purchase orders**

#### FR-PUR-008 · Gợi ý giá mua / Purchase price suggestion
`Should` · `P8`

- **VI:** Đơn giá được gợi ý từ bảng giá nhà cung cấp (`FR-MDM-027`) hoặc giá lần mua gần nhất; cảnh báo khi giá cao hơn lần mua trước quá X%.
- **EN:** Unit price is suggested from the supplier price list (`FR-MDM-027`) or the last purchase price; warn when it exceeds the last price by more than X%.

#### FR-PUR-013 · Ứng trước cho nhà cung cấp / Supplier prepayments
`Must` · `P8`

- **VI:** Ghi nhận khoản trả trước theo đơn mua; tự động cấn trừ khi thanh toán hóa đơn.
- **EN:** Record prepayments against a PO; offset them automatically when paying the bill.

**Nhận hàng / Receiving**

#### FR-PUR-015 · Dung sai nhận hàng / Receiving tolerance
`Should` · `P8`

- **VI:** Cho phép nhận vượt số lượng đặt trong dung sai X% (cấu hình theo nhóm hàng); vượt dung sai phải được duyệt.
- **EN:** Allow over-receipt within X% tolerance (configurable per category); exceeding it requires approval.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-PUR-007 | Tạo đơn mua từ đề nghị mua đã duyệt. | Create POs from approved purchase requests. |
| FR-PUR-014 | Ghi nhận lô / serial / hạn dùng khi nhận hàng. | Record lot / serial / expiry on receipt. |
| FR-PUR-026 | Hiệu suất giao hàng của nhà cung cấp. | Supplier delivery performance. |

## 2. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-PUR-003 | Dung sai mặc định: số lượng 0%, đơn giá ±2% (cấu hình được). | Default tolerances: quantity 0%, unit price ±2% (configurable). | P8 |
