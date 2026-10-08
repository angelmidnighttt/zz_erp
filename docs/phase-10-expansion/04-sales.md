# 04 · Bán hàng / Sales (SAL) — Giai đoạn 10 / Phase 10

[← Giai đoạn 10 · Mở rộng / Phase 10 · Expansion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P5](../phase-05-sales/04-sales.md) · [P7](../phase-07-approvals-controls/04-sales.md) · [P8](../phase-08-operations-completion/04-sales.md) · [P9](../phase-09-accounting-einvoicing/04-sales.md) · [P11](../phase-11-advanced/04-sales.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Chương trình khuyến mãi; báo giá cho lead từ CRM.
- **EN:** Promotion programs; quotations for CRM leads.

## 1. Yêu cầu chức năng / Functional requirements

**Khuyến mãi & hoa hồng / Promotions & commissions**

#### FR-SAL-027 · Chương trình khuyến mãi / Promotion programs
`Should` · `P10`

- **VI:** Cấu hình khuyến mãi: giảm %, giảm tiền, mua X tặng Y, theo thời gian, nhóm khách hàng, sản phẩm, giá trị đơn tối thiểu. Hàng tặng được xuất kho và thể hiện trên hóa đơn theo quy định về hàng khuyến mãi.
- **EN:** Configure promotions: % off, amount off, buy X get Y, by period, customer group, product, minimum order value. Free goods are issued from stock and shown on invoices according to promotional-goods rules.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-SAL-001 | Báo giá cho khách hàng tiềm năng (lead) từ CRM. | Quotations for leads from CRM. |

## 2. Mô hình dữ liệu / Data model

- **VI:** Chương trình khuyến mãi áp theo thời gian, nhóm khách hàng, sản phẩm / nhóm sản phẩm và giá trị đơn tối thiểu; dòng hàng tặng là dòng đơn có `is_free_good = true` và `promotion_id`, được xuất kho và in trên hóa đơn như dòng riêng (`FR-SAL-027`). Báo giá có thể lập cho lead chưa có hồ sơ khách hàng (`customer_id` trống, `lead_id` có giá trị); khi lead chuyển đổi, báo giá được gán `customer_id`.
- **EN:** Promotions apply by period, customer group, product / category and minimum order value; free goods are order lines with `is_free_good = true` and a `promotion_id`, issued from stock and printed on the invoice as separate lines (`FR-SAL-027`). Quotations can be made for leads without a customer record (`customer_id` empty, `lead_id` set); on conversion the quotation gets its `customer_id`.

| Bảng / Table | Mục đích (VI) | Purpose (EN) |
|---|---|---|
| `promotions`, `promotion_products`, `promotion_customer_groups` | Chương trình khuyến mãi và phạm vi áp dụng. | Promotion programs and their scope. |
| `sales_order_lines` / `customer_invoice_lines` + `promotion_id`, `is_free_good` | Dòng được giảm giá hoặc hàng tặng. | Discounted lines or free goods. |
| `quotations.lead_id`, `opportunity_id` | Báo giá cho lead / cơ hội (mở rộng `FR-SAL-001`). | Quotations for leads / opportunities (`FR-SAL-001` extension). |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 09-crm.md (P10)

INSERT INTO document_types (code, module, name_vi, name_en, function_code, table_name, sort_order, approval_mode) VALUES
  ('PROMO', 'SAL', 'Chương trình khuyến mãi', 'Promotion', 'SAL.PROMOTION', 'promotions', 545, 'SINGLE');

CREATE TYPE promotion_type   AS ENUM ('PERCENT_OFF','AMOUNT_OFF','BUY_X_GET_Y');
CREATE TYPE promotion_status AS ENUM ('DRAFT','PENDING_APPROVAL','ACTIVE','ENDED','CANCELLED');

CREATE TABLE promotions (
  id                uuid             PRIMARY KEY DEFAULT gen_random_uuid(),
  code              varchar(30)      NOT NULL UNIQUE,
  name              varchar(255)     NOT NULL,
  name_en           varchar(255),
  promo_type        promotion_type   NOT NULL,
  valid_from        timestamptz      NOT NULL,
  valid_to          timestamptz      NOT NULL,
  min_order_amount  dm_amount,                -- VND
  discount_pct      dm_pct,                   -- PERCENT_OFF
  discount_amount   dm_amount,                -- AMOUNT_OFF
  buy_qty           dm_qty,                   -- BUY_X_GET_Y
  get_qty           dm_qty,
  get_product_id    uuid             REFERENCES products(id),  -- NULL = tặng chính sản phẩm mua / same product
  priority          integer          NOT NULL DEFAULT 100,
  is_stackable      boolean          NOT NULL DEFAULT false,
  status            promotion_status NOT NULL DEFAULT 'DRAFT',
  version           integer          NOT NULL DEFAULT 1,
  created_at        timestamptz      NOT NULL DEFAULT now(),
  created_by        uuid             REFERENCES users(id),
  updated_at        timestamptz      NOT NULL DEFAULT now(),
  updated_by        uuid             REFERENCES users(id),
  CHECK (valid_to > valid_from),
  CHECK (CASE promo_type
           WHEN 'PERCENT_OFF' THEN discount_pct IS NOT NULL
           WHEN 'AMOUNT_OFF'  THEN discount_amount IS NOT NULL
           WHEN 'BUY_X_GET_Y' THEN buy_qty > 0 AND get_qty > 0 END)
);
CREATE INDEX ON promotions (valid_from, valid_to) WHERE status = 'ACTIVE';

-- Không có dòng nào = áp cho mọi sản phẩm / mọi nhóm khách hàng
-- No rows = applies to all products / all customer groups
CREATE TABLE promotion_products (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  promotion_id         uuid NOT NULL REFERENCES promotions(id) ON DELETE CASCADE,
  product_id           uuid REFERENCES products(id),
  product_category_id  uuid REFERENCES product_categories(id),
  CHECK (num_nonnulls(product_id, product_category_id) = 1)
);

CREATE TABLE promotion_customer_groups (
  promotion_id      uuid NOT NULL REFERENCES promotions(id) ON DELETE CASCADE,
  partner_group_id  uuid NOT NULL REFERENCES partner_groups(id),
  PRIMARY KEY (promotion_id, partner_group_id)
);

ALTER TABLE sales_order_lines
  ADD COLUMN promotion_id  uuid    REFERENCES promotions(id),
  ADD COLUMN is_free_good  boolean NOT NULL DEFAULT false,
  ADD CONSTRAINT sales_order_lines_free_good_check CHECK (NOT is_free_good OR promotion_id IS NOT NULL);

ALTER TABLE customer_invoice_lines
  ADD COLUMN promotion_id  uuid    REFERENCES promotions(id),
  ADD COLUMN is_free_good  boolean NOT NULL DEFAULT false;

-- FR-SAL-001 (mở rộng / extension)
ALTER TABLE quotations
  ALTER COLUMN customer_id DROP NOT NULL,
  ADD COLUMN lead_id         uuid REFERENCES crm_leads(id),
  ADD COLUMN opportunity_id  uuid REFERENCES crm_opportunities(id),
  ADD CONSTRAINT quotations_customer_or_lead CHECK (customer_id IS NOT NULL OR lead_id IS NOT NULL);
```

</details>
