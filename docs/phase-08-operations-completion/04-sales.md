# 04 · Bán hàng / Sales (SAL) — Giai đoạn 8 / Phase 8

[← Giai đoạn 8 · Hoàn thiện mua – bán – kho / Phase 8 · Operations completion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P5](../phase-05-sales/04-sales.md) · [P7](../phase-07-approvals-controls/04-sales.md) · [P9](../phase-09-accounting-einvoicing/04-sales.md) · [P10](../phase-10-expansion/04-sales.md) · [P11](../phase-11-advanced/04-sales.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Phiên bản & hết hạn báo giá; giữ hàng, tồn khả dụng; tiền đặt cọc; chiết khấu tổng đơn; giá theo bậc số lượng, tiền tệ, chi nhánh; chính sách xuất hóa đơn theo sản phẩm / khách hàng; xuất hóa đơn dịch vụ theo tiến độ; so sánh kỳ.
- **EN:** Quotation revisions & expiry; stock reservation, available stock; deposits; order-level discounts; quantity-tier, currency and branch pricing; invoicing policy per product / customer; milestone service invoicing; period comparison.

## 1. Yêu cầu chức năng / Functional requirements

**Báo giá / Quotations**

#### FR-SAL-002 · Phiên bản báo giá / Quotation revisions
`Should` · `P8`

- **VI:** Sửa báo giá đã gửi khách sẽ tạo phiên bản mới (ví dụ `QT-0001-R2`); các phiên bản cũ được giữ lại để tra cứu.
- **EN:** Editing a quotation already sent creates a new revision (e.g. `QT-0001-R2`); previous revisions are kept for reference.

#### FR-SAL-005 · Hết hạn báo giá / Quotation expiry
`Should` · `P8`

- **VI:** Báo giá quá ngày hiệu lực tự động chuyển trạng thái "Hết hạn"; nhân viên được nhắc trước N ngày.
- **EN:** Quotations past their expiry date move to "Expired" automatically; salespeople are reminded N days before.

**Đơn bán hàng / Sales orders**

#### FR-SAL-011 · Giữ hàng / Stock reservation
`Should` · `P8`

- **VI:** Đơn đã xác nhận tự động giữ hàng trong kho xuất; giữ hàng được giải phóng khi đơn bị hủy, đóng hoặc sau khi xuất kho.
- **EN:** Confirmed orders automatically reserve stock in the source warehouse; reservations are released when the order is cancelled, closed or delivered.

#### FR-SAL-015 · Tiền đặt cọc / Customer deposits
`Should` · `P8`

- **VI:** Ghi nhận tiền đặt cọc / trả trước gắn với đơn hàng; tự động cấn trừ khi xuất hóa đơn.
- **EN:** Record deposits / prepayments linked to an order; automatically offset them when invoicing.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-SAL-007 | Giá theo bậc số lượng, theo tiền tệ và chi nhánh (`FR-MDM-025`). | Quantity-tier, currency and branch pricing (`FR-MDM-025`). |
| FR-SAL-008 | Chiết khấu tổng đơn, được phân bổ xuống từng dòng để tính thuế và doanh thu chính xác. | Order-level discounts, allocated to lines so tax and revenue are computed correctly. |
| FR-SAL-010 | Hiển thị tồn khả dụng (tồn thực tế − đã giữ) và số lượng đang về. | Show available stock (on hand − reserved) and incoming quantity. |
| FR-SAL-018 | Xuất hóa đơn dịch vụ theo tiến độ hoàn thành. | Invoice services by completion milestones. |
| FR-SAL-022 | Cấu hình chính sách theo sản phẩm hoặc khách hàng. | Configure the policy per product or customer. |
| FR-SAL-030 | So sánh với kỳ trước. | Comparison with prior periods. |

## 2. Mô hình dữ liệu / Data model

- **VI:** Sửa báo giá đã gửi tạo một dòng `quotations` mới (số `…-R2`), cùng `root_id`; chỉ một phiên bản là `is_current` (`FR-SAL-002`). Giữ hàng dùng `stock_reservations` ([06 · Kho](06-inventory.md)). Tiền đặt cọc là phiếu thu / báo có gắn `sales_order_id`, tạo khoản Có trong `open_items` và được phân bổ vào hóa đơn khi xuất hóa đơn (`FR-SAL-015`). Chiết khấu tổng đơn được phân bổ xuống `allocated_order_discount` của từng dòng để tính thuế và doanh thu.
- **EN:** Editing a sent quotation creates a new `quotations` row (number `…-R2`) with the same `root_id`; only one revision is `is_current` (`FR-SAL-002`). Reservations use `stock_reservations` ([06 · Inventory](06-inventory.md)). A deposit is a cash receipt / bank credit carrying `sales_order_id`; it creates a credit `open_items` row that is allocated to the invoice on invoicing (`FR-SAL-015`). The order-level discount is allocated to each line's `allocated_order_discount` so tax and revenue are correct.

| Thay đổi / Change | Mục đích (VI) | Purpose (EN) |
|---|---|---|
| `quotations.root_id`, `revision_no`, `is_current`; `quotation_status` + `EXPIRED` | Phiên bản và hết hạn báo giá (`FR-SAL-002`, `FR-SAL-005`). | Quotation revisions and expiry (`FR-SAL-002`, `FR-SAL-005`). |
| `cash_documents.sales_order_id` | Tiền đặt cọc theo đơn (`FR-SAL-015`). | Order deposits (`FR-SAL-015`). |
| `sales_orders.order_discount_*`, `sales_order_lines.allocated_order_discount` | Chiết khấu tổng đơn và phần phân bổ (mở rộng `FR-SAL-008`). | Order-level discount and its allocation (`FR-SAL-008` extension). |
| `products.invoice_policy`, `partners.invoice_policy` | Chính sách xuất hóa đơn theo sản phẩm / khách hàng; trống thì theo tham số chung (mở rộng `FR-SAL-022`). | Invoicing policy per product / customer; empty falls back to the global parameter (`FR-SAL-022` extension). |
| `sales_order_milestones` | Xuất hóa đơn dịch vụ theo tiến độ (mở rộng `FR-SAL-018`). | Milestone invoicing of services (`FR-SAL-018` extension). |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 06-inventory.md (P8)

INSERT INTO system_settings (key, value) VALUES ('sales.quotation_expiry_reminder_days', '3')  -- FR-SAL-005
ON CONFLICT (key) DO NOTHING;

-- FR-SAL-002, FR-SAL-005
ALTER TYPE quotation_status ADD VALUE 'EXPIRED' BEFORE 'CANCELLED';

ALTER TABLE quotations
  ADD COLUMN root_id      uuid     REFERENCES quotations(id),  -- NULL = bản gốc / original
  ADD COLUMN revision_no  smallint NOT NULL DEFAULT 1 CHECK (revision_no > 0),
  ADD COLUMN is_current   boolean  NOT NULL DEFAULT true;
CREATE UNIQUE INDEX quotations_one_current ON quotations (coalesce(root_id, id)) WHERE is_current;
CREATE INDEX quotations_expiring ON quotations (valid_until) WHERE status = 'SENT';

-- FR-SAL-015
ALTER TABLE cash_documents ADD COLUMN sales_order_id uuid REFERENCES sales_orders(id);

-- FR-SAL-008 (mở rộng / extension)
ALTER TABLE sales_orders
  ADD COLUMN order_discount_type    discount_type,
  ADD COLUMN order_discount_value   dm_amount NOT NULL DEFAULT 0 CHECK (order_discount_value >= 0),
  ADD COLUMN order_discount_amount  dm_amount NOT NULL DEFAULT 0;
ALTER TABLE sales_order_lines
  ADD COLUMN allocated_order_discount dm_amount NOT NULL DEFAULT 0;

-- FR-SAL-022 (mở rộng / extension)
CREATE TYPE invoice_policy AS ENUM ('ORDERED','DELIVERED');
ALTER TABLE products ADD COLUMN invoice_policy invoice_policy;  -- NULL = sales.invoice_policy
ALTER TABLE partners ADD COLUMN invoice_policy invoice_policy;  -- ưu tiên khách hàng > sản phẩm > chung

-- FR-SAL-018 (mở rộng / extension)
CREATE TABLE sales_order_milestones (
  id               uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  so_line_id       uuid         NOT NULL REFERENCES sales_order_lines(id),
  seq              smallint     NOT NULL CHECK (seq > 0),
  name             varchar(255) NOT NULL,
  percent          dm_pct       NOT NULL CHECK (percent > 0),
  planned_date     date,
  completed_at     timestamptz,
  completed_by     uuid         REFERENCES users(id),
  invoice_line_id  uuid         REFERENCES customer_invoice_lines(id),
  UNIQUE (so_line_id, seq)
);
```

</details>
