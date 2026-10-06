# 05 · Mua hàng / Purchasing (PUR) — Giai đoạn 9 / Phase 9

[← Giai đoạn 9 · Kế toán đầy đủ & HĐĐT / Phase 9 · Full accounting & e-invoicing](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P4](../phase-04-purchasing/05-purchasing.md) · [P7](../phase-07-approvals-controls/05-purchasing.md) · [P8](../phase-08-operations-completion/05-purchasing.md) · [P10](../phase-10-expansion/05-purchasing.md) · [P11](../phase-11-advanced/05-purchasing.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Nhập XML hóa đơn đầu vào; đối chiếu 3 chiều; hàng về chưa có hóa đơn / hàng mua đang đi đường; chi phí mua hàng, hàng nhập khẩu.
- **EN:** Inbound e-invoice XML import; 3-way match; goods received not invoiced / goods in transit; landed cost, imports.

## 1. Yêu cầu chức năng / Functional requirements

**Hóa đơn nhà cung cấp & đối chiếu / Vendor bills & matching**

#### FR-PUR-018 · Nhập hóa đơn điện tử đầu vào từ XML / Import inbound e-invoice XML
`Should` · `P9`

- **VI:** Đọc file XML hóa đơn điện tử của nhà cung cấp để tự điền thông tin hóa đơn và dòng hàng; gợi ý ghép với đơn mua / phiếu nhập; kiểm tra trạng thái hóa đơn với cơ quan thuế qua tích hợp (`FR-INT-002`).
- **EN:** Parse the supplier's e-invoice XML to pre-fill bill header and lines; suggest matching POs / receipts; check invoice status with the tax authority via integration (`FR-INT-002`).

#### FR-PUR-019 · Đối chiếu 3 chiều / 3-way match
`Must` · `P9`

- **VI:** Đối chiếu đơn mua – phiếu nhập – hóa đơn theo số lượng và đơn giá. Chênh lệch vượt dung sai sẽ chặn ghi sổ hóa đơn hoặc yêu cầu duyệt (cấu hình).
- **EN:** Match PO – goods receipt – bill on quantity and unit price. Variances beyond tolerance block bill posting or require approval (configurable).

**Tiêu chí chấp nhận / Acceptance criteria**

- **AC-1 — VI:** Đơn mua 100 cái × 50.000 ₫, đã nhận 100 cái, hóa đơn 100 cái × 50.500 ₫ (lệch 1%, dung sai giá 2%) → hóa đơn được ghi sổ; chênh lệch giá được phân bổ vào giá trị kho hoặc giá vốn tùy tình trạng tồn.
  **EN:** PO 100 pcs × ₫50,000, 100 pcs received, bill 100 pcs × ₫50,500 (1% variance, 2% tolerance) → bill is posted; the price variance goes to inventory value or COGS depending on remaining stock.
- **AC-2 — VI:** Cùng đơn, hóa đơn 110 cái nhưng mới nhận 100 cái → hóa đơn bị chặn với thông báo "Số lượng hóa đơn vượt số lượng đã nhận".
  **EN:** Same PO, bill for 110 pcs but only 100 received → bill is blocked with "Billed quantity exceeds received quantity".

#### FR-PUR-021 · Hàng về chưa có hóa đơn và hàng mua đang đi đường / Goods received not invoiced & goods in transit
`Must` · `P9`

- **VI:** Hỗ trợ hàng về trước hóa đơn (nhập kho theo giá tạm tính, điều chỉnh khi có hóa đơn) và hóa đơn về trước hàng (ghi nhận hàng mua đang đi đường).
- **EN:** Support goods received before the bill (receipt at provisional price, adjusted when the bill arrives) and bills received before the goods (goods in transit).

**Chi phí mua hàng & nhập khẩu / Landed cost & imports**

#### FR-PUR-022 · Phân bổ chi phí mua hàng / Landed cost allocation
`Should` · `P9`

- **VI:** Ghi nhận chi phí vận chuyển, bảo hiểm, thuế nhập khẩu, phí hải quan… và phân bổ vào giá trị hàng nhập theo giá trị, số lượng, trọng lượng hoặc thể tích.
- **EN:** Record freight, insurance, import duty, customs fees… and allocate them to received goods by value, quantity, weight or volume.

#### FR-PUR-023 · Mua hàng nhập khẩu / Import purchases
`Should` · `P9`

- **VI:** Đơn mua bằng ngoại tệ; ghi nhận thông tin tờ khai hải quan (số, ngày), thuế nhập khẩu, thuế GTGT hàng nhập khẩu; xử lý chênh lệch tỷ giá khi thanh toán.
- **EN:** Foreign-currency POs; record customs declaration info (number, date), import duty and import VAT; handle exchange differences on payment.
