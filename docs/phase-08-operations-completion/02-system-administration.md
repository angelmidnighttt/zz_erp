# 02 · Quản trị hệ thống / System Administration (SYS) — Giai đoạn 8 / Phase 8

[← Giai đoạn 8 · Hoàn thiện mua – bán – kho / Phase 8 · Operations completion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/02-system-administration.md) · [P2](../phase-02-organization-master-data/02-system-administration.md) · [P3](../phase-03-inventory/02-system-administration.md) · [P6](../phase-06-receivables-payables-cash/02-system-administration.md) · [P7](../phase-07-approvals-controls/02-system-administration.md) · [P9](../phase-09-accounting-einvoicing/02-system-administration.md) · [P10](../phase-10-expansion/02-system-administration.md) · [P11](../phase-11-advanced/02-system-administration.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Mẫu email, tùy chỉnh mẫu in; nhập dữ liệu chạy thử; tìm kiếm & bộ lọc nâng cao; thùng rác.
- **EN:** Email templates, print template customization; import dry-run; advanced search & filters; recycle bin.

## 1. Yêu cầu chức năng / Functional requirements

**Cấu hình chung / General settings**

#### FR-SYS-022 · Mẫu email / Email templates
`Should` · `P8`

- **VI:** Cấu hình mẫu email (tiêu đề, nội dung, biến động như tên khách hàng, số chứng từ) cho gửi báo giá, đơn hàng, hóa đơn, nhắc nợ, đặt lại mật khẩu.
- **EN:** Configure email templates (subject, body, variables such as customer name, document number) for quotations, orders, invoices, payment reminders and password reset.

**Tiện ích dùng chung / Common utilities**

#### FR-SYS-030 · Xóa mềm & khôi phục / Soft delete & restore
`Should` · `P8`

- **VI:** Chứng từ nháp bị xóa được chuyển vào thùng rác và có thể khôi phục trong 30 ngày.
- **EN:** Deleted draft documents go to a recycle bin and can be restored within 30 days.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-SYS-021 | Tùy chỉnh mẫu in (chữ ký, chân trang); in tiếng Anh hoặc song ngữ. | Customize templates (signatures, footer); print in English or bilingual. |
| FR-SYS-026 | Chế độ chạy thử (không ghi dữ liệu); tùy chọn bỏ qua dòng lỗi. | Dry-run mode (no data written); option to skip invalid rows. |
| FR-SYS-028 | Tìm nhanh toàn cục; bộ lọc nâng cao nhiều điều kiện; lưu bộ lọc cá nhân; chọn và sắp xếp cột hiển thị. | Global quick search; advanced multi-condition filters; saved personal filters; choose and reorder visible columns. |

## 2. Mô hình dữ liệu / Data model

- **VI:** Thùng rác (`FR-SYS-030`) là cột `deleted_at` / `deleted_by` trên các bảng chứng từ; chỉ chứng từ nháp (chưa có số) mới được xóa mềm, và job hằng ngày xóa hẳn bản ghi quá `recycle_bin.retention_days`. Tìm nhanh toàn cục dùng view `v_global_search`: mỗi nhánh của view giữ đúng biểu thức của trigram index nên điều kiện `search_text LIKE '%…%'` vẫn dùng được index.
- **EN:** The recycle bin (`FR-SYS-030`) is a `deleted_at` / `deleted_by` pair on document tables; only drafts (no number yet) can be soft-deleted, and a daily job purges rows older than `recycle_bin.retention_days`. Global quick search uses the `v_global_search` view: each branch keeps the exact trigram-index expression, so `search_text LIKE '%…%'` still uses the indexes.

| Bảng / Table | Mục đích (VI) | Purpose (EN) |
|---|---|---|
| `email_templates` | Mẫu email theo mã và ngôn ngữ, có biến động (`FR-SYS-022`). | Email templates per code and language, with placeholders (`FR-SYS-022`). |
| `print_templates` (cột mới / new columns) | Chữ ký, chân trang; ngôn ngữ `BILINGUAL` (mở rộng `FR-SYS-021`). | Signature blocks, footer; `BILINGUAL` language (`FR-SYS-021` extension). |
| `import_jobs` (cột mới / new columns) | Chạy thử, bỏ qua dòng lỗi (mở rộng `FR-SYS-026`). | Dry run, skip invalid rows (`FR-SYS-026` extension). |
| `saved_filters` | Bộ lọc cá nhân, cột hiển thị và thứ tự cột theo chức năng (mở rộng `FR-SYS-028`). | Personal filters, visible columns and column order per function (`FR-SYS-028` extension). |
| `v_global_search` | Tìm nhanh toàn cục trên danh mục và số chứng từ. | Global quick search over master data and document numbers. |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 01-roles-permissions.md (P8)

INSERT INTO system_settings (key, value) VALUES ('recycle_bin.retention_days', '30')
ON CONFLICT (key) DO NOTHING;

CREATE TABLE email_templates (
  code         varchar(50)  NOT NULL,   -- 'QUOTATION_SENT', 'INVOICE_SENT', 'PAYMENT_REMINDER', 'PASSWORD_RESET'…
  language     ui_language  NOT NULL,
  subject      varchar(500) NOT NULL,   -- có biến / with placeholders, vd / e.g. {{customer_name}}
  body_html    text         NOT NULL,
  variables    jsonb        NOT NULL DEFAULT '[]',  -- danh sách biến hợp lệ / allowed placeholders
  is_active    boolean      NOT NULL DEFAULT true,
  version      integer      NOT NULL DEFAULT 1,
  created_at   timestamptz  NOT NULL DEFAULT now(),
  created_by   uuid         REFERENCES users(id),
  updated_at   timestamptz  NOT NULL DEFAULT now(),
  updated_by   uuid         REFERENCES users(id),
  PRIMARY KEY (code, language)
);

-- FR-SYS-021 (mở rộng / extension)
ALTER TYPE print_language ADD VALUE 'BILINGUAL';
ALTER TABLE print_templates
  ADD COLUMN signature_blocks  jsonb,  -- [{title_vi, title_en, name}] — người lập, kế toán trưởng, giám đốc…
  ADD COLUMN footer_html       text;

-- FR-SYS-026 (mở rộng / extension)
ALTER TABLE import_jobs
  ADD COLUMN dry_run            boolean NOT NULL DEFAULT false,
  ADD COLUMN skip_invalid_rows  boolean NOT NULL DEFAULT false,
  ADD COLUMN imported_rows      integer,
  ADD COLUMN skipped_rows       integer;

-- FR-SYS-028 (mở rộng / extension)
CREATE TABLE saved_filters (
  id             uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid         NOT NULL REFERENCES users(id),
  function_code  varchar(50)  NOT NULL REFERENCES app_functions(code),
  name           varchar(100) NOT NULL,
  filter         jsonb        NOT NULL,  -- [{field, operator, value}]
  columns        jsonb,                  -- cột hiển thị theo thứ tự / visible columns in order
  sort           jsonb,
  is_default     boolean      NOT NULL DEFAULT false,
  created_at     timestamptz  NOT NULL DEFAULT now(),
  updated_at     timestamptz  NOT NULL DEFAULT now(),
  UNIQUE (user_id, function_code, name)
);
CREATE UNIQUE INDEX saved_filters_one_default ON saved_filters (user_id, function_code) WHERE is_default;

-- FR-SYS-030: thùng rác cho chứng từ nháp / recycle bin for draft documents
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['quotations','sales_orders','customer_invoices','sales_returns',
                           'purchase_orders','vendor_bills','purchase_returns',
                           'stock_documents','stock_counts','cash_documents'] LOOP
    EXECUTE format('ALTER TABLE %I ADD COLUMN deleted_at timestamptz,
                                   ADD COLUMN deleted_by uuid REFERENCES users(id),
                                   ADD CONSTRAINT %I CHECK (deleted_at IS NULL OR doc_no IS NULL)',
                   t, t || '_soft_delete_draft_only');
    EXECUTE format('CREATE INDEX ON %I (deleted_at) WHERE deleted_at IS NOT NULL', t);
  END LOOP;
END $$;

-- Tìm nhanh toàn cục / Global quick search
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['quotations','sales_orders','customer_invoices','purchase_orders',
                           'vendor_bills','stock_documents','cash_documents'] LOOP
    EXECUTE format('CREATE INDEX %I ON %I USING gin (lower(doc_no) gin_trgm_ops)', t || '_doc_no_trgm', t);
  END LOOP;
END $$;

CREATE VIEW v_global_search AS
SELECT 'product' AS entity_type, id AS entity_id, code AS label_code, name AS label,
       lower(f_unaccent(code || ' ' || name)) AS search_text
FROM products
UNION ALL
SELECT 'partner', id, code, name, lower(f_unaccent(code || ' ' || name)) FROM partners
UNION ALL
SELECT 'employee', id, code, full_name, lower(f_unaccent(code || ' ' || full_name)) FROM employees
UNION ALL
SELECT 'quotation', id, doc_no, NULL, lower(doc_no) FROM quotations WHERE doc_no IS NOT NULL
UNION ALL
SELECT 'sales_order', id, doc_no, NULL, lower(doc_no) FROM sales_orders WHERE doc_no IS NOT NULL
UNION ALL
SELECT 'customer_invoice', id, doc_no, NULL, lower(doc_no) FROM customer_invoices WHERE doc_no IS NOT NULL
UNION ALL
SELECT 'purchase_order', id, doc_no, NULL, lower(doc_no) FROM purchase_orders WHERE doc_no IS NOT NULL
UNION ALL
SELECT 'vendor_bill', id, doc_no, NULL, lower(doc_no) FROM vendor_bills WHERE doc_no IS NOT NULL
UNION ALL
SELECT 'stock_document', id, doc_no, NULL, lower(doc_no) FROM stock_documents WHERE doc_no IS NOT NULL
UNION ALL
SELECT 'cash_document', id, doc_no, NULL, lower(doc_no) FROM cash_documents WHERE doc_no IS NOT NULL;
```

</details>
