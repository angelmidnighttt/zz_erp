# 05 · Mua hàng / Purchasing (PUR) — Giai đoạn 11 / Phase 11

[← Giai đoạn 11 · Nâng cao / Phase 11 · Advanced](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P4](../phase-04-purchasing/05-purchasing.md) · [P7](../phase-07-approvals-controls/05-purchasing.md) · [P8](../phase-08-operations-completion/05-purchasing.md) · [P9](../phase-09-accounting-einvoicing/05-purchasing.md) · [P10](../phase-10-expansion/05-purchasing.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Hợp đồng khung; kiểm tra chất lượng khi nhận; đánh giá nhà cung cấp.
- **EN:** Blanket agreements; incoming quality check; supplier evaluation.

## 1. Yêu cầu chức năng / Functional requirements

**Đơn mua hàng / Purchase orders**

#### FR-PUR-012 · Hợp đồng khung / Blanket agreements
`Could` · `P11`

- **VI:** Hợp đồng nguyên tắc với nhà cung cấp (giá, số lượng cam kết, thời hạn); các đơn mua trích từ hợp đồng và theo dõi lượng đã thực hiện.
- **EN:** Framework agreements with suppliers (price, committed quantity, term); POs are released against the agreement and consumption is tracked.

**Nhận hàng / Receiving**

#### FR-PUR-016 · Kiểm tra chất lượng khi nhận / Incoming quality check
`Could` · `P11`

- **VI:** Ghi nhận kết quả kiểm tra (đạt / không đạt) khi nhận; hàng không đạt chuyển sang kho chờ xử lý hoặc trả lại nhà cung cấp.
- **EN:** Record inspection results (pass / fail) on receipt; failed goods move to a quarantine warehouse or are returned to the supplier.

**Quản lý nhà cung cấp / Supplier management**

#### FR-PUR-025 · Đánh giá nhà cung cấp / Supplier evaluation
`Could` · `P11`

- **VI:** Tính điểm nhà cung cấp theo tỷ lệ giao đúng hạn, tỷ lệ hàng lỗi, biến động giá; hiển thị trên hồ sơ nhà cung cấp.
- **EN:** Score suppliers on on-time delivery rate, defect rate and price variance; show the score on the supplier record.
