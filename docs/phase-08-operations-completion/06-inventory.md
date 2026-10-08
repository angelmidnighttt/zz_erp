# 06 · Kho / Inventory (INV) — Giai đoạn 8 / Phase 8

[← Giai đoạn 8 · Hoàn thiện mua – bán – kho / Phase 8 · Operations completion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/06-inventory.md) · [P7](../phase-07-approvals-controls/06-inventory.md) · [P9](../phase-09-accounting-einvoicing/06-inventory.md) · [P10](../phase-10-expansion/06-inventory.md) · [P11](../phase-11-advanced/06-inventory.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Kho đặc biệt, chuyển kho hai bước; lô / hạn dùng, serial, gợi ý FIFO / FEFO (đưa lên P3 nếu ngành hàng bắt buộc — `Q-01`); tồn khả dụng, đang về; kiểm kê nâng cao, khóa giao dịch khi kiểm kê; tồn tối thiểu / tối đa; FIFO, đích danh.
- **EN:** Special warehouses, two-step transfers; lots / expiry, serials, FIFO / FEFO suggestions (move to P3 if the industry requires it — `Q-01`); available and incoming stock; advanced counts, count freeze; min / max rules; FIFO, specific identification.

## 1. Yêu cầu chức năng / Functional requirements

**Theo dõi tồn kho / Stock visibility**

#### FR-INV-009 · Lô & hạn dùng / Lots & expiry
`Must` · `P8`

- **VI:** Truy xuất nguồn gốc hai chiều: từ lô → nhà cung cấp, phiếu nhập; và lô → khách hàng, phiếu xuất. Cảnh báo lô sắp hết hạn trước N ngày (cấu hình theo nhóm hàng); chặn xuất lô đã hết hạn.
- **EN:** Two-way traceability: lot → supplier, receipt; and lot → customer, issue. Alert on lots expiring within N days (configurable per category); block issuing expired lots.

#### FR-INV-010 · Số serial / Serial numbers
`Should` · `P8`

- **VI:** Theo dõi từng đơn vị hàng bằng số serial; tra cứu lịch sử nhập – xuất – trả của một serial.
- **EN:** Track each unit by serial number; look up the full receipt – issue – return history of a serial.

#### FR-INV-012 · Gợi ý xuất theo FIFO / FEFO / FIFO / FEFO suggestions
`Should` · `P8`

- **VI:** Khi xuất hàng theo lô, hệ thống gợi ý lô theo nguyên tắc hết hạn trước xuất trước (FEFO) hoặc nhập trước xuất trước (FIFO).
- **EN:** When issuing lot-tracked goods, the system suggests lots by first-expired-first-out (FEFO) or first-in-first-out (FIFO).

**Kiểm kê / Stock count**

#### FR-INV-016 · Khóa giao dịch khi kiểm kê / Freeze during count
`Should` · `P8`

- **VI:** Tùy chọn khóa giao dịch nhập – xuất trên phạm vi đang kiểm kê từ lúc chốt số sổ sách đến khi hoàn tất.
- **EN:** Optionally freeze receipts and issues in the count scope from book-quantity snapshot until completion.

**Bổ sung tồn kho / Replenishment**

#### FR-INV-017 · Quy tắc tồn tối thiểu / tối đa / Min / max rules
`Should` · `P8`

- **VI:** Hệ thống tính tồn dự kiến (tồn khả dụng + đang về) và đề xuất đề nghị mua hàng hoặc chuyển kho khi xuống dưới điểm đặt hàng lại, đưa về mức tối đa.
- **EN:** The system computes projected stock (available + incoming) and proposes purchase requests or transfers when it falls below the reorder point, up to the maximum level.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-INV-001 | Kho đặc biệt: hàng đi đường, hàng gửi bán, hàng lỗi / chờ xử lý. | Special warehouses: in transit, consignment, defective / quarantine. |
| FR-INV-002 | Ghi nhận lô, ngày sản xuất, hạn dùng, serial, vị trí. | Record lot, manufacturing date, expiry, serial and location. |
| FR-INV-004 | Chuyển kho hai bước qua kho hàng đi đường (xuất – nhận) giữa các chi nhánh. | Two-step transfers via an in-transit warehouse (ship – receive) between branches. |
| FR-INV-008 | Xem tồn đã giữ, khả dụng, đang về (từ đơn mua), đang chuyển; theo vị trí và lô. | View reserved, available, incoming (from POs) and in-transit quantities; by location and lot. |
| FR-INV-013 | Kiểm kê theo nhóm hàng, vị trí; kiểm kê cuốn chiếu (cycle count). | Counts by category or location; cycle counts. |
| FR-INV-014 | Kiểm kê "mù" (không hiển thị số sổ sách cho người đếm). | "Blind" count (book quantity hidden from counters). |
| FR-INV-018 | Bổ sung nhập trước xuất trước (FIFO), thực tế đích danh; tùy chọn phương pháp theo kho hoặc nhóm hàng. | Add FIFO and specific identification; optional method per warehouse or category. |
| FR-INV-023 | Tồn kho theo lô và hạn dùng; báo cáo hàng chậm luân chuyển và tuổi tồn kho. | Stock by lot and expiry; slow-moving and stock-aging reports. |

## 2. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-INV-004 | Hàng theo dõi lô / serial bắt buộc khai báo lô / serial khi nhập và xuất. | Lot / serial-tracked goods require lot / serial on every receipt and issue. | P8 |
| BR-INV-005 | Mặc định xuất theo FEFO; chọn lô khác cần quyền riêng. | FEFO is the default; choosing another lot requires a specific permission. | P8 |
