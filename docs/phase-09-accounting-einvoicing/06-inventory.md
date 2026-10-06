# 06 · Kho / Inventory (INV) — Giai đoạn 9 / Phase 9

[← Giai đoạn 9 · Kế toán đầy đủ & HĐĐT / Phase 9 · Full accounting & e-invoicing](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/06-inventory.md) · [P7](../phase-07-approvals-controls/06-inventory.md) · [P8](../phase-08-operations-completion/06-inventory.md) · [P10](../phase-10-expansion/06-inventory.md) · [P11](../phase-11-advanced/06-inventory.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Hạch toán tự động, điều chỉnh giá trị tồn; phiếu xuất kho kiêm vận chuyển nội bộ điện tử.
- **EN:** Automatic posting, stock value adjustment; electronic internal transfer notes.

## 1. Yêu cầu chức năng / Functional requirements

**Tính giá & hạch toán / Costing & accounting**

#### FR-INV-020 · Hạch toán tự động / Automatic posting
`Must` · `P9`

- **VI:** Mỗi chứng từ kho đã xác nhận sinh bút toán theo cấu hình tài khoản (xem bảng hạch toán mẫu tại [07 · Kế toán](07-accounting-finance.md), mục 1).
- **EN:** Each confirmed stock document generates journal entries based on account configuration (see the sample posting table in [07 · Accounting](07-accounting-finance.md), section 1).

#### FR-INV-021 · Điều chỉnh giá trị tồn kho / Inventory value adjustment
`Should` · `P9`

- **VI:** Điều chỉnh giá trị hàng tồn mà không thay đổi số lượng (ví dụ chi phí mua hàng phát sinh sau); có phê duyệt.
- **EN:** Adjust stock value without changing quantity (e.g. late landed costs); approval required.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-INV-002 | Tài khoản đối ứng cho nhập khác. | Offset account for other receipts. |
| FR-INV-004 | Lập phiếu xuất kho kiêm vận chuyển nội bộ điện tử khi cần (qua nhà cung cấp HĐĐT). | Issue electronic internal transfer delivery notes when required (via the e-invoice provider). |
| FR-INV-015 | Tự sinh bút toán thừa / thiếu (`FR-INV-020`). | Generate surplus / shortage journal entries automatically (`FR-INV-020`). |
| FR-INV-019 | Cập nhật giá vốn vào bút toán. | Update costs on journal entries. |
