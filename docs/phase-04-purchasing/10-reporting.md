# 10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT) — Giai đoạn 4 / Phase 4

[← Giai đoạn 4 · Mua hàng cơ bản / Phase 4 · Basic purchasing](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/10-reporting.md) · [P5](../phase-05-sales/10-reporting.md) · [P6](../phase-06-receivables-payables-cash/10-reporting.md) · [P7](../phase-07-approvals-controls/10-reporting.md) · [P8](../phase-08-operations-completion/10-reporting.md) · [P9](../phase-09-accounting-einvoicing/10-reporting.md) · [P10](../phase-10-expansion/10-reporting.md) · [P11](../phase-11-advanced/10-reporting.md)

---

## 1. Danh mục báo cáo chuẩn / Standard report catalog

| Mã / Code | Báo cáo (VI) | Report (EN) | Phân hệ / Module | Giai đoạn / Phase |
|---|---|---|---|---|
| R-PUR-01 | Giá trị mua theo nhà cung cấp / sản phẩm | Purchases by supplier / product | PUR | P4 |
| R-PUR-02 | Đơn mua chưa nhận đủ | Open purchase orders | PUR | P4 |
| R-PUR-03 | Hàng đã nhận chưa có hóa đơn | Received not billed | PUR | P4 |
| R-PUR-04 | Lịch sử giá mua | Purchase price history | PUR | P4 |

## 2. Mô hình dữ liệu / Data model

- **VI:** Đăng ký báo cáo và view dữ liệu theo cách của [P3](../phase-03-inventory/10-reporting.md). Quyền mặc định theo quyền Xem trên `PUR.PURCHASE_ORDER`. Giá trị quy đổi VND = nguyên tệ × tỷ giá của chứng từ.
- **EN:** Reports and data views follow the [P3](../phase-03-inventory/10-reporting.md) approach. Default access follows View on `PUR.PURCHASE_ORDER`. VND values = transaction amount × the document's exchange rate.

| Đối tượng / Object | Báo cáo / Report | Nguồn (VI) | Source (EN) |
|---|---|---|---|
| `rpt_purchase_lines` | R-PUR-01 | Dòng hóa đơn mua đã ghi sổ. | Posted vendor bill lines. |
| `rpt_open_purchase_orders` | R-PUR-02 | Dòng đơn mua còn chưa nhận đủ, kèm số ngày trễ. | PO lines not fully received, with days late. |
| `rpt_received_not_billed` | R-PUR-03 | Dòng phiếu nhập theo đơn mua trừ số lượng đã lên hóa đơn. | PO receipt lines minus billed quantity. |
| `rpt_purchase_price_history` | R-PUR-04 | Đơn giá trên đơn mua đã xác nhận. | Unit prices on confirmed POs. |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 05-purchasing.md (P4)

INSERT INTO app_functions (code, module, name_vi, name_en, supported_actions, sort_order) VALUES
  ('RPT.R-PUR-01', 'RPT', 'Giá trị mua theo NCC / sản phẩm', 'Purchases by supplier / product', '{VIEW,PRINT,EXPORT}', 9201),
  ('RPT.R-PUR-02', 'RPT', 'Đơn mua chưa nhận đủ',           'Open purchase orders',            '{VIEW,PRINT,EXPORT}', 9202),
  ('RPT.R-PUR-03', 'RPT', 'Hàng đã nhận chưa có hóa đơn',   'Received not billed',             '{VIEW,PRINT,EXPORT}', 9203),
  ('RPT.R-PUR-04', 'RPT', 'Lịch sử giá mua',                'Purchase price history',          '{VIEW,PRINT,EXPORT}', 9204)
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (role_id, function_code, action)
SELECT rp.role_id, f.code, a
FROM app_functions f
JOIN role_permissions rp ON rp.function_code = 'PUR.PURCHASE_ORDER' AND rp.action = 'VIEW'
CROSS JOIN unnest('{VIEW,PRINT,EXPORT}'::permission_action[]) AS a
WHERE f.code LIKE 'RPT.R-PUR-%'
ON CONFLICT DO NOTHING;

-- R-PUR-01
CREATE VIEW rpt_purchase_lines AS
SELECT b.id AS bill_id, b.doc_no, b.invoice_series, b.invoice_no, b.accounting_date,
       b.branch_id, b.supplier_id, l.product_id, l.description, l.uom_id, l.qty,
       b.currency_code, l.amount_untaxed,
       round(l.amount_untaxed * b.exchange_rate, 0) AS amount_untaxed_vnd
FROM vendor_bills b
JOIN vendor_bill_lines l ON l.bill_id = b.id
WHERE b.status IN ('POSTED','PARTIALLY_PAID','PAID');

-- R-PUR-02
CREATE VIEW rpt_open_purchase_orders AS
SELECT po.id AS po_id, po.doc_no, po.order_date, po.branch_id, po.supplier_id, po.warehouse_id,
       l.id AS po_line_id, l.product_id, l.uom_id, l.qty, l.qty_received,
       l.qty - l.qty_received                               AS qty_open,
       coalesce(l.expected_date, po.expected_date)           AS expected_date,
       GREATEST(current_date - coalesce(l.expected_date, po.expected_date), 0) AS days_late
FROM purchase_orders po
JOIN purchase_order_lines l ON l.po_id = po.id
WHERE po.status IN ('APPROVED','SENT','PARTIALLY_RECEIVED')
  AND l.qty_received < l.qty;

-- R-PUR-03
CREATE VIEW rpt_received_not_billed AS
SELECT d.id AS receipt_id, d.doc_no, d.doc_date, d.branch_id, d.warehouse_id, d.partner_id AS supplier_id,
       d.source_id AS po_id, sl.id AS receipt_line_id, sl.product_id, sl.uom_id, sl.qty,
       coalesce(bl.qty_billed, 0)            AS qty_billed,
       sl.qty - coalesce(bl.qty_billed, 0)   AS qty_not_billed
FROM stock_documents d
JOIN stock_document_lines sl ON sl.document_id = d.id
LEFT JOIN (
  SELECT vl.receipt_line_id, sum(vl.qty) AS qty_billed
  FROM vendor_bill_lines vl
  JOIN vendor_bills vb ON vb.id = vl.bill_id AND vb.status <> 'CANCELLED'
  GROUP BY vl.receipt_line_id
) bl ON bl.receipt_line_id = sl.id
WHERE d.status = 'DONE' AND d.reason = 'PURCHASE'
  AND sl.qty > coalesce(bl.qty_billed, 0);

-- R-PUR-04
CREATE VIEW rpt_purchase_price_history AS
SELECT po.order_date, po.doc_no, po.branch_id, po.supplier_id, l.product_id, l.uom_id,
       po.currency_code, l.unit_price, l.discount_pct,
       round(l.unit_price * po.exchange_rate, 2) AS unit_price_vnd
FROM purchase_orders po
JOIN purchase_order_lines l ON l.po_id = po.id
WHERE po.status NOT IN ('DRAFT','CANCELLED');
```

</details>
