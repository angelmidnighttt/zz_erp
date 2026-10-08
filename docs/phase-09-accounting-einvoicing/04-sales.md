# 04 · Bán hàng / Sales (SAL) — Giai đoạn 9 / Phase 9

[← Giai đoạn 9 · Kế toán đầy đủ & HĐĐT / Phase 9 · Full accounting & e-invoicing](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P5](../phase-05-sales/04-sales.md) · [P7](../phase-07-approvals-controls/04-sales.md) · [P8](../phase-08-operations-completion/04-sales.md) · [P10](../phase-10-expansion/04-sales.md) · [P11](../phase-11-advanced/04-sales.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Phát hành HĐĐT từ ERP, hóa đơn điều chỉnh / thay thế; giảm giá sau bán.
- **EN:** Issuing e-invoices from the ERP, adjustment / replacement invoices; post-sale price reductions.

## 1. Yêu cầu chức năng / Functional requirements

**Hóa đơn / Invoicing**

#### FR-SAL-023 · Phát hành hóa đơn điện tử / Issue e-invoice
`Must` · `P9`

- **VI:** Từ hóa đơn bán hàng, phát hành hóa đơn điện tử qua nhà cung cấp HĐĐT (`FR-INT-001`); nhận về ký hiệu, số hóa đơn, mã của cơ quan thuế (nếu có) và trạng thái; tự động gửi email hóa đơn cho khách hàng.
- **EN:** Issue an e-invoice from the customer invoice via the e-invoice provider (`FR-INT-001`); receive the series, invoice number, tax authority code (if any) and status; email the invoice to the customer automatically.

**Trả hàng & điều chỉnh / Returns & adjustments**

#### FR-SAL-025 · Hóa đơn điều chỉnh / thay thế / Adjustment or replacement invoice
`Must` · `P9`

- **VI:** Lập hóa đơn điều chỉnh (tăng/giảm) hoặc hóa đơn thay thế theo quy định về hóa đơn điện tử, liên kết với hóa đơn gốc; cập nhật công nợ và doanh thu tương ứng.
- **EN:** Issue adjustment (increase/decrease) or replacement invoices per e-invoice regulations, linked to the original invoice; update receivables and revenue accordingly.

#### FR-SAL-026 · Giảm giá sau bán / Post-sale price reduction
`Should` · `P9`

- **VI:** Ghi nhận giảm giá hàng bán hoặc chiết khấu thương mại theo doanh số sau khi đã xuất hóa đơn, không làm thay đổi tồn kho.
- **EN:** Record price reductions or volume rebates after invoicing without affecting stock.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-SAL-021 | Phát hành hóa đơn điện tử trực tiếp từ ERP (`FR-SAL-023`). | Issue e-invoices directly from the ERP (`FR-SAL-023`). |

## 2. Mô hình dữ liệu / Data model

- **VI:** Phát hành HĐĐT tạo `einvoice_documents` và một `integration_jobs` có khóa chống trùng ([11 · Tích hợp](11-integrations.md)); `customer_invoices.einvoice_document_id` trỏ tới bản HĐĐT hiện hành. Hóa đơn điều chỉnh tăng / giảm và thay thế là dòng `customer_invoices` mới có `original_invoice_id`; giảm giá sau bán / chiết khấu thương mại theo doanh số là loại `PRICE_REDUCTION`, không sinh chứng từ kho (`FR-SAL-026`). Các cột `einvoice_series` / `einvoice_no` của P5 vẫn được điền từ kết quả phát hành để báo cáo cũ không đổi.
- **EN:** Issuing an e-invoice creates an `einvoice_documents` row and an idempotent `integration_jobs` row ([11 · Integrations](11-integrations.md)); `customer_invoices.einvoice_document_id` points to the current e-invoice. Increase / decrease adjustments and replacements are new `customer_invoices` rows with `original_invoice_id`; post-sale price reductions / volume rebates use kind `PRICE_REDUCTION` and create no stock document (`FR-SAL-026`). The P5 `einvoice_series` / `einvoice_no` columns are still filled from the issuance result so existing reports keep working.

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 11-integrations.md, 07-accounting-finance.md (P9)

CREATE TYPE invoice_kind AS ENUM
  ('STANDARD','ADJUSTMENT_INCREASE','ADJUSTMENT_DECREASE','REPLACEMENT','PRICE_REDUCTION');

ALTER TABLE customer_invoices
  ADD COLUMN invoice_kind          invoice_kind NOT NULL DEFAULT 'STANDARD',
  ADD COLUMN original_invoice_id   uuid REFERENCES customer_invoices(id),
  ADD COLUMN adjustment_reason     text,
  ADD COLUMN einvoice_document_id  uuid REFERENCES einvoice_documents(id),
  ADD COLUMN journal_entry_id      uuid REFERENCES journal_entries(id),
  ADD CONSTRAINT customer_invoices_kind_check CHECK (
    invoice_kind NOT IN ('ADJUSTMENT_INCREASE','ADJUSTMENT_DECREASE','REPLACEMENT')
    OR (original_invoice_id IS NOT NULL AND adjustment_reason IS NOT NULL));
CREATE INDEX ON customer_invoices (original_invoice_id) WHERE original_invoice_id IS NOT NULL;

-- Trả hàng → hóa đơn điều chỉnh giảm phát hành từ ERP / returns → decrease adjustment issued from the ERP
ALTER TABLE sales_returns
  ADD COLUMN credit_invoice_id  uuid REFERENCES customer_invoices(id),
  ADD COLUMN journal_entry_id   uuid REFERENCES journal_entries(id);
```

</details>
