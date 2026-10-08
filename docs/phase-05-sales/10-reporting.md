# 10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT) — Giai đoạn 5 / Phase 5

[← Giai đoạn 5 · Bán hàng cơ bản / Phase 5 · Basic sales](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/10-reporting.md) · [P4](../phase-04-purchasing/10-reporting.md) · [P6](../phase-06-receivables-payables-cash/10-reporting.md) · [P7](../phase-07-approvals-controls/10-reporting.md) · [P8](../phase-08-operations-completion/10-reporting.md) · [P9](../phase-09-accounting-einvoicing/10-reporting.md) · [P10](../phase-10-expansion/10-reporting.md) · [P11](../phase-11-advanced/10-reporting.md)

---

## 1. Danh mục báo cáo chuẩn / Standard report catalog

| Mã / Code | Báo cáo (VI) | Report (EN) | Phân hệ / Module | Giai đoạn / Phase |
|---|---|---|---|---|
| R-SAL-01 | Doanh số theo khách hàng / sản phẩm / nhân viên | Sales by customer / product / salesperson | SAL | P5 |
| R-SAL-02 | Đơn hàng chưa giao | Open (undelivered) sales orders | SAL | P5 |
| R-SAL-03 | Hàng đã giao chưa xuất hóa đơn | Delivered not invoiced | SAL | P5 |
| R-SAL-04 | Lãi gộp theo đơn hàng / sản phẩm | Gross margin by order / product | SAL | P5 |

## 2. Mô hình dữ liệu / Data model

- **VI:** Đăng ký báo cáo theo cách của [P3](../phase-03-inventory/10-reporting.md). R-SAL-01 – 03 mặc định theo quyền Xem trên `SAL.SALES_ORDER`. R-SAL-04 (lãi gộp) chỉ cấp mặc định cho `CEO`, `CAC` vì `FR-SAL-030` giới hạn người xem và `Q-ROL-02` chưa chốt; từ P7, giá vốn và lãi gộp còn bị ẩn theo quyền theo trường.
- **EN:** Reports are registered as in [P3](../phase-03-inventory/10-reporting.md). R-SAL-01 – 03 default to View on `SAL.SALES_ORDER`. R-SAL-04 (gross margin) is granted by default to `CEO`, `CAC` only, because `FR-SAL-030` restricts its audience and `Q-ROL-02` is still open; from P7, cost and margin are also hidden by field-level permissions.

| Đối tượng / Object | Báo cáo / Report | Nguồn (VI) | Source (EN) |
|---|---|---|---|
| `rpt_sales_lines` | R-SAL-01 | Dòng hóa đơn đã ghi sổ, trừ dòng trả hàng đã điều chỉnh (số âm). | Posted invoice lines, minus credited return lines (negative). |
| `rpt_open_sales_orders` | R-SAL-02 | Dòng đơn còn phải giao. | Order lines still to deliver. |
| `rpt_delivered_not_invoiced` | R-SAL-03 | Dòng phiếu xuất bán đã xác nhận trừ số đã lên hóa đơn; `days_since_delivery` cho `BR-SAL-004`. | Confirmed sales issue lines minus invoiced quantity; `days_since_delivery` for `BR-SAL-004`. |
| `rpt_gross_margin` | R-SAL-04 | Doanh thu VND trừ giá vốn lấy từ dòng phiếu xuất tương ứng. | VND revenue minus cost taken from the matching issue line. |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 04-sales.md (P5)

INSERT INTO app_functions (code, module, name_vi, name_en, supported_actions, sort_order) VALUES
  ('RPT.R-SAL-01', 'RPT', 'Doanh số theo khách hàng / sản phẩm / nhân viên', 'Sales by customer / product / salesperson', '{VIEW,PRINT,EXPORT}', 9301),
  ('RPT.R-SAL-02', 'RPT', 'Đơn hàng chưa giao',                            'Open sales orders',                         '{VIEW,PRINT,EXPORT}', 9302),
  ('RPT.R-SAL-03', 'RPT', 'Hàng đã giao chưa xuất hóa đơn',                'Delivered not invoiced',                    '{VIEW,PRINT,EXPORT}', 9303),
  ('RPT.R-SAL-04', 'RPT', 'Lãi gộp theo đơn hàng / sản phẩm',              'Gross margin by order / product',           '{VIEW,PRINT,EXPORT}', 9304)
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (role_id, function_code, action)
SELECT rp.role_id, f.code, a
FROM app_functions f
JOIN role_permissions rp ON rp.function_code = 'SAL.SALES_ORDER' AND rp.action = 'VIEW'
CROSS JOIN unnest('{VIEW,PRINT,EXPORT}'::permission_action[]) AS a
WHERE f.code IN ('RPT.R-SAL-01','RPT.R-SAL-02','RPT.R-SAL-03')
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, function_code, action)
SELECT r.id, 'RPT.R-SAL-04', a
FROM roles r
CROSS JOIN unnest('{VIEW,PRINT,EXPORT}'::permission_action[]) AS a
WHERE r.code IN ('CEO','CAC')
ON CONFLICT DO NOTHING;

-- R-SAL-01
CREATE VIEW rpt_sales_lines AS
SELECT i.accounting_date AS doc_date, i.doc_no, 'INVOICE' AS line_kind, i.branch_id, i.customer_id,
       coalesce(i.salesperson_id, p.salesperson_id) AS salesperson_id,
       l.product_id, l.qty * l.uom_factor AS base_qty,
       round(l.amount_untaxed * i.exchange_rate, 0) AS revenue_vnd
FROM customer_invoices i
JOIN customer_invoice_lines l ON l.invoice_id = i.id
JOIN partners p ON p.id = i.customer_id
WHERE i.status IN ('POSTED','PARTIALLY_PAID','PAID')
UNION ALL
SELECT r.return_date, r.doc_no, 'RETURN', r.branch_id, r.customer_id,
       coalesce(so.salesperson_id, p.salesperson_id),
       l.product_id, -(l.qty * l.uom_factor),
       -round(l.amount_untaxed * r.exchange_rate, 0)
FROM sales_returns r
JOIN sales_return_lines l ON l.return_id = r.id
JOIN partners p ON p.id = r.customer_id
LEFT JOIN sales_orders so ON so.id = r.sales_order_id
WHERE r.status = 'CREDITED';

-- R-SAL-02
CREATE VIEW rpt_open_sales_orders AS
SELECT so.id AS so_id, so.doc_no, so.order_date, so.expected_delivery_date, so.branch_id,
       so.customer_id, so.salesperson_id, so.warehouse_id,
       l.id AS so_line_id, l.product_id, l.uom_id, l.qty, l.qty_delivered,
       l.qty - l.qty_delivered - l.qty_cancelled AS qty_open
FROM sales_orders so
JOIN sales_order_lines l ON l.so_id = so.id
JOIN products p ON p.id = l.product_id AND p.product_type <> 'SERVICE'
WHERE so.status IN ('CONFIRMED','PARTIALLY_DELIVERED')
  AND l.qty - l.qty_delivered - l.qty_cancelled > 0;

-- R-SAL-03
CREATE VIEW rpt_delivered_not_invoiced AS
SELECT d.id AS issue_id, d.doc_no, d.doc_date, d.branch_id, d.partner_id AS customer_id,
       d.source_id AS so_id, sl.id AS issue_line_id, sl.product_id, sl.uom_id, sl.qty,
       coalesce(il.qty_invoiced, 0)          AS qty_invoiced,
       sl.qty - coalesce(il.qty_invoiced, 0) AS qty_not_invoiced,
       current_date - d.doc_date             AS days_since_delivery
FROM stock_documents d
JOIN stock_document_lines sl ON sl.document_id = d.id
LEFT JOIN (
  SELECT cl.issue_line_id, sum(cl.qty) AS qty_invoiced
  FROM customer_invoice_lines cl
  JOIN customer_invoices ci ON ci.id = cl.invoice_id AND ci.status <> 'CANCELLED'
  GROUP BY cl.issue_line_id
) il ON il.issue_line_id = sl.id
WHERE d.status = 'DONE' AND d.reason = 'SALE'
  AND sl.qty > coalesce(il.qty_invoiced, 0);

-- R-SAL-04
CREATE VIEW rpt_gross_margin AS
SELECT i.id AS invoice_id, i.doc_no, i.accounting_date, i.branch_id, i.customer_id,
       i.sales_order_id, l.product_id,
       round(l.amount_untaxed * i.exchange_rate, 0)                          AS revenue_vnd,
       round(coalesce(l.qty * l.uom_factor * sl.unit_cost, 0), 0)            AS cost_vnd,
       round(l.amount_untaxed * i.exchange_rate, 0)
         - round(coalesce(l.qty * l.uom_factor * sl.unit_cost, 0), 0)        AS gross_margin_vnd
FROM customer_invoices i
JOIN customer_invoice_lines l    ON l.invoice_id = i.id
LEFT JOIN stock_document_lines sl ON sl.id = l.issue_line_id
WHERE i.status IN ('POSTED','PARTIALLY_PAID','PAID');
```

</details>
