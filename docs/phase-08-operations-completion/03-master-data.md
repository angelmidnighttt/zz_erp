# 03 · Dữ liệu danh mục / Master Data (MDM) — Giai đoạn 8 / Phase 8

[← Giai đoạn 8 · Hoàn thiện mua – bán – kho / Phase 8 · Operations completion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/03-master-data.md) · [P7](../phase-07-approvals-controls/03-master-data.md) · [P9](../phase-09-accounting-einvoicing/03-master-data.md) · [P11](../phase-11-advanced/03-master-data.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Theo dõi lô / serial; tham số tồn kho; phát hiện trùng; thanh toán nhiều đợt; vị trí trong kho; địa chỉ hành chính; bảng giá nâng cao, bảng giá mua.
- **EN:** Lot / serial tracking; stock parameters; duplicate detection; installment terms; bin locations; administrative addresses; advanced price lists, supplier price lists.

## 1. Yêu cầu chức năng / Functional requirements

**Sản phẩm / Products**

#### FR-MDM-004 · Phương thức theo dõi lô / serial / Lot & serial tracking setting
`Must` · `P8`

- **VI:** Cấu hình theo sản phẩm: không theo dõi, theo lô (kèm ngày sản xuất, hạn sử dụng), hoặc theo số serial.
- **EN:** Configure per product: no tracking, by lot (with manufacturing date, expiry date), or by serial number.

#### FR-MDM-007 · Tham số tồn kho / Stock parameters
`Should` · `P8`

- **VI:** Tồn tối thiểu, tồn tối đa, điểm đặt hàng lại, số lượng đặt tối thiểu, nhà cung cấp ưu tiên, thời gian giao hàng (lead time) — theo sản phẩm và kho.
- **EN:** Minimum stock, maximum stock, reorder point, minimum order quantity, preferred supplier, lead time — per product and warehouse.

**Đối tác: khách hàng & nhà cung cấp / Business partners: customers & suppliers**

#### FR-MDM-013 · Phát hiện trùng lặp / Duplicate detection
`Should` · `P8`

- **VI:** Cảnh báo khi tạo đối tác trùng mã số thuế, số điện thoại hoặc email với đối tác đã có; cho phép gộp hai hồ sơ trùng (người có quyền).
- **EN:** Warn when a new partner shares a tax ID, phone or email with an existing one; allow authorized users to merge duplicates.

**Kho & danh mục khác / Warehouses & other master data**

#### FR-MDM-023 · Địa chỉ hành chính / Administrative addresses
`Should` · `P8`

- **VI:** Danh mục đơn vị hành chính theo mô hình hai cấp (tỉnh/thành phố – xã/phường) áp dụng từ 01/07/2025; vẫn lưu và hiển thị được địa chỉ cũ trên dữ liệu lịch sử.
- **EN:** Administrative units follow the two-level model (province/city – commune/ward) effective 2025-07-01; historical data keeps and displays legacy addresses.

**Bảng giá / Price lists**

#### FR-MDM-027 · Bảng giá mua của nhà cung cấp / Supplier price lists
`Should` · `P8`

- **VI:** Lưu giá mua theo nhà cung cấp, sản phẩm, bậc số lượng, tiền tệ và thời gian hiệu lực; dùng để gợi ý giá khi lập đơn mua.
- **EN:** Store purchase prices per supplier, product, quantity tier, currency and validity; used to suggest prices on purchase orders.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-MDM-018 | Thanh toán nhiều đợt (ví dụ 30% đặt cọc, 70% sau 30 ngày). | Installments (e.g. 30% deposit, 70% after 30 days). |
| FR-MDM-021 | Vị trí trong kho dạng cây (khu – dãy – kệ – ô), tùy chọn theo kho. | Locations within a warehouse as an optional tree (zone – aisle – rack – bin). |
| FR-MDM-025 | Bảng giá theo tiền tệ và chi nhánh; giá theo bậc số lượng. | Price lists per currency and branch; quantity tiers. |
