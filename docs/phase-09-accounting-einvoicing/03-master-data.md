# 03 · Dữ liệu danh mục / Master Data (MDM) — Giai đoạn 9 / Phase 9

[← Giai đoạn 9 · Kế toán đầy đủ & HĐĐT / Phase 9 · Full accounting & e-invoicing](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/03-master-data.md) · [P7](../phase-07-approvals-controls/03-master-data.md) · [P8](../phase-08-operations-completion/03-master-data.md) · [P11](../phase-11-advanced/03-master-data.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Tài khoản kế toán mặc định.
- **EN:** Default GL accounts.

## 1. Yêu cầu chức năng / Functional requirements

**Sản phẩm / Products**

#### FR-MDM-006 · Tài khoản kế toán mặc định / Default GL accounts
`Must` · `P9`

- **VI:** Khai báo theo nhóm hoặc sản phẩm: tài khoản kho, doanh thu, giá vốn, giảm trừ doanh thu / hàng bán bị trả lại, chi phí (cho vật tư tiêu hao và dịch vụ mua vào).
- **EN:** Define per category or product: inventory, revenue, COGS, revenue deduction / sales return, and expense accounts (for consumables and purchased services).

## 2. Mô hình dữ liệu / Data model

- **VI:** Tài khoản mặc định khai báo trên nhóm sản phẩm và có thể ghi đè trên từng sản phẩm; khi sinh bút toán, hệ thống lấy theo thứ tự sản phẩm → nhóm (đi ngược lên nhóm cha) → `posting_rules` ([07 · Kế toán](07-accounting-finance.md)).
- **EN:** Default accounts are set on product categories and can be overridden per product; when generating entries the system resolves product → category (walking up to parent categories) → `posting_rules` ([07 · Accounting](07-accounting-finance.md)).

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 07-accounting-finance.md (P9)

DO $$
DECLARE t text; c text;
BEGIN
  FOREACH t IN ARRAY ARRAY['product_categories','products'] LOOP
    FOREACH c IN ARRAY ARRAY['inventory_account_code',     -- 152 / 153 / 156
                             'revenue_account_code',       -- 511x
                             'cogs_account_code',          -- 632
                             'sales_return_account_code',  -- TK giảm trừ doanh thu / revenue deduction
                             'expense_account_code'] LOOP  -- vật tư tiêu hao, dịch vụ mua / consumables, services
      EXECUTE format('ALTER TABLE %I ADD COLUMN %I varchar(20) REFERENCES gl_accounts(code)', t, c);
    END LOOP;
  END LOOP;
END $$;
```

</details>
