# 10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT) — Giai đoạn 9 / Phase 9

[← Giai đoạn 9 · Kế toán đầy đủ & HĐĐT / Phase 9 · Full accounting & e-invoicing](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/10-reporting.md) · [P4](../phase-04-purchasing/10-reporting.md) · [P5](../phase-05-sales/10-reporting.md) · [P6](../phase-06-receivables-payables-cash/10-reporting.md) · [P7](../phase-07-approvals-controls/10-reporting.md) · [P8](../phase-08-operations-completion/10-reporting.md) · [P10](../phase-10-expansion/10-reporting.md) · [P11](../phase-11-advanced/10-reporting.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Dashboard theo vai trò.
- **EN:** Role-based dashboards.

## 1. Yêu cầu chức năng / Functional requirements

#### FR-RPT-001 · Dashboard theo vai trò / Role-based dashboards
`Must` · `P9` (mở rộng / extended: `P10`)

- **VI:** Mỗi vai trò có dashboard mặc định:
  - Ban giám đốc: doanh thu, lãi gộp, số dư tiền, phải thu / phải trả, giá trị tồn kho, top khách hàng và sản phẩm.
  - Kinh doanh: doanh số so với chỉ tiêu, đơn chờ duyệt, đơn chưa giao, công nợ khách hàng của tôi.
  - Mua hàng: đề nghị chờ xử lý, đơn mua trễ hạn, hàng đã nhận chưa có hóa đơn.
  - Kho: chứng từ chờ xử lý, hàng dưới tồn tối thiểu, lô sắp hết hạn.
  - Kế toán: công nợ đến hạn, số dư quỹ và ngân hàng, tình trạng khóa sổ.
- **EN:** Each role has a default dashboard:
  - Executive: revenue, gross margin, cash balance, receivables / payables, stock value, top customers and products.
  - Sales: revenue vs. target, orders pending approval, undelivered orders, my customers' receivables.
  - Purchasing: pending requests, late POs, received-not-billed.
  - Warehouse: pending stock documents, items below minimum, lots nearing expiry.
  - Accounting: due receivables / payables, cash and bank balances, closing status.

## 2. Danh mục báo cáo chuẩn / Standard report catalog

| Mã / Code | Báo cáo (VI) | Report (EN) | Phân hệ / Module | Giai đoạn / Phase |
|---|---|---|---|---|
| R-ACC-01 | Sổ nhật ký chung | General journal | ACC | P9 |
| R-ACC-02 | Sổ cái, sổ chi tiết tài khoản | General ledger, account detail ledger | ACC | P9 |
| R-ACC-03 | Bảng cân đối số phát sinh | Trial balance | ACC | P9 |
| R-ACC-05 | Biên bản đối chiếu công nợ | Balance confirmation statement | ACC | P9 |
| R-ACC-07 | Bảng kê hóa đơn mua vào / bán ra | Purchase / sales invoice listing | ACC | P9 |
| R-ACC-08 | Báo cáo tình hình tài chính | Statement of financial position | ACC | P9 |
| R-ACC-09 | Báo cáo kết quả hoạt động kinh doanh | Income statement | ACC | P9 |
| R-ACC-10 | Báo cáo lưu chuyển tiền tệ | Cash flow statement | ACC | P9 |
| R-ACC-11 | Kết quả kinh doanh theo chi nhánh / phòng ban | P&L by branch / department | ACC | P9 |

## 3. Mô hình dữ liệu / Data model

- **VI:** Dashboard gồm danh mục widget (mỗi widget gắn một chức năng, người dùng không có quyền Xem chức năng đó thì không thấy widget) và dashboard mặc định theo vai trò (`FR-RPT-001`); P10 cho người dùng tự tạo dashboard. Báo cáo sổ sách lấy từ bút toán đã ghi sổ; BCTC (R-ACC-08 – 10) tính từ `fs_templates` ([07 · Kế toán](07-accounting-finance.md)) và lưu ở `fs_snapshots`, nên không có view riêng. Bảng cân đối số phát sinh cộng dồn từ tài khoản chi tiết lên các tài khoản cha.
- **EN:** Dashboards consist of a widget catalog (each widget is tied to a function; users without View on it do not see the widget) and default dashboards per role (`FR-RPT-001`); P10 lets users build their own. Book reports read posted entries; financial statements (R-ACC-08 – 10) are computed from `fs_templates` ([07 · Accounting](07-accounting-finance.md)) and stored in `fs_snapshots`, so they have no view of their own. The trial balance rolls leaf accounts up to their parents.

| Đối tượng / Object | Báo cáo / Report | Ghi chú (VI) | Notes (EN) |
|---|---|---|---|
| `dashboard_widget_types`, `dashboards`, `dashboard_widgets` | FR-RPT-001 | Dashboard mặc định cho `CEO`, `SAL`, `PUR`, `WH`, `ACC`. | Default dashboards for `CEO`, `SAL`, `PUR`, `WH`, `ACC`. |
| `rpt_general_journal` | R-ACC-01 | Sổ nhật ký chung. | General journal. |
| `rpt_account_ledger` | R-ACC-02 | Sổ cái / sổ chi tiết tài khoản có số dư lũy kế. | GL / account ledger with running balance. |
| `rpt_trial_balance(p_from, p_to)` | R-ACC-03 | Số dư đầu kỳ, phát sinh, số dư cuối kỳ theo tài khoản, cộng dồn lên tài khoản cha. | Opening, movements, closing per account, rolled up to parents. |
| `balance_confirmations` | R-ACC-05 | In trực tiếp từ bảng của [07 · Kế toán](07-accounting-finance.md). | Printed straight from the [07 · Accounting](07-accounting-finance.md) table. |
| `rpt_vat_invoice_listing` | R-ACC-07 | Bảng kê hóa đơn bán ra / mua vào theo thuế suất. | Sales / purchase invoice listing per tax rate. |
| `rpt_pnl_by_dimension` | R-ACC-11 | Doanh thu, chi phí theo tháng × chi nhánh × phòng ban (loại trừ bút toán kết chuyển). | Revenue and expense per month × branch × department (closing entries excluded). |
| `rpt_payment_schedule`, `rpt_employee_advance_balances`, `rpt_bank_reconciliation` | FR-ACC-022, 023, 027 | Lịch thanh toán, số dư tạm ứng, đối chiếu sổ – ngân hàng. | Payment schedule, advance balances, book-to-bank reconciliation. |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 07-accounting-finance.md, 01-roles-permissions.md (P9)

-- ===== Báo cáo chuẩn / Standard reports =====
INSERT INTO app_functions (code, module, name_vi, name_en, supported_actions, sort_order) VALUES
  ('RPT.R-ACC-01', 'RPT', 'Sổ nhật ký chung',                     'General journal',                       '{VIEW,PRINT,EXPORT}', 9401),
  ('RPT.R-ACC-02', 'RPT', 'Sổ cái, sổ chi tiết tài khoản',        'General ledger, account detail ledger', '{VIEW,PRINT,EXPORT}', 9402),
  ('RPT.R-ACC-03', 'RPT', 'Bảng cân đối số phát sinh',            'Trial balance',                         '{VIEW,PRINT,EXPORT}', 9403),
  ('RPT.R-ACC-05', 'RPT', 'Biên bản đối chiếu công nợ',           'Balance confirmation statement',        '{VIEW,PRINT,EXPORT}', 9405),
  ('RPT.R-ACC-07', 'RPT', 'Bảng kê hóa đơn mua vào / bán ra',     'Purchase / sales invoice listing',      '{VIEW,PRINT,EXPORT}', 9407),
  ('RPT.R-ACC-08', 'RPT', 'Báo cáo tình hình tài chính',          'Statement of financial position',       '{VIEW,PRINT,EXPORT}', 9408),
  ('RPT.R-ACC-09', 'RPT', 'Báo cáo kết quả hoạt động kinh doanh', 'Income statement',                      '{VIEW,PRINT,EXPORT}', 9409),
  ('RPT.R-ACC-10', 'RPT', 'Báo cáo lưu chuyển tiền tệ',           'Cash flow statement',                   '{VIEW,PRINT,EXPORT}', 9410),
  ('RPT.R-ACC-11', 'RPT', 'Kết quả kinh doanh theo chi nhánh / phòng ban', 'P&L by branch / department',    '{VIEW,PRINT,EXPORT}', 9411)
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (role_id, function_code, action)
SELECT rp.role_id, f.code, a
FROM app_functions f
JOIN role_permissions rp
  ON rp.action = 'VIEW'
 AND rp.function_code = CASE f.code WHEN 'RPT.R-ACC-05' THEN 'ACC.CUSTOMER_INVOICE' ELSE 'ACC.FIN_STATEMENT' END
CROSS JOIN unnest('{VIEW,PRINT,EXPORT}'::permission_action[]) AS a
WHERE f.code IN ('RPT.R-ACC-01','RPT.R-ACC-02','RPT.R-ACC-03','RPT.R-ACC-05','RPT.R-ACC-07',
                 'RPT.R-ACC-08','RPT.R-ACC-09','RPT.R-ACC-10','RPT.R-ACC-11')
ON CONFLICT DO NOTHING;

-- R-ACC-01
CREATE VIEW rpt_general_journal AS
SELECT e.id AS entry_id, e.doc_no, e.entry_date, e.doc_date, e.entry_type, e.module, e.branch_id,
       e.source_type, e.source_id, e.description AS entry_description,
       l.line_no, l.account_code, l.debit_vnd, l.credit_vnd, l.currency_code, l.debit_fc, l.credit_fc,
       l.partner_id, l.employee_id, l.department_id, l.description AS line_description
FROM journal_entries e
JOIN journal_lines l ON l.entry_id = e.id
WHERE e.status = 'POSTED';

-- R-ACC-02
CREATE VIEW rpt_account_ledger AS
SELECT g.*,
       sum(g.debit_vnd - g.credit_vnd) OVER (PARTITION BY g.account_code
                                             ORDER BY g.entry_date, g.doc_no, g.line_no) AS balance_vnd
FROM rpt_general_journal g;

-- R-ACC-03: dương = dư Nợ, âm = dư Có / positive = debit balance, negative = credit balance
CREATE FUNCTION rpt_trial_balance(p_from date, p_to date)
RETURNS TABLE (account_code varchar, account_name varchar, is_postable boolean,
               opening_vnd numeric, debit_vnd numeric, credit_vnd numeric, closing_vnd numeric)
LANGUAGE sql STABLE AS $$
  WITH RECURSIVE anc AS (
    SELECT a.code AS leaf, a.code AS ancestor FROM gl_accounts a
    UNION ALL
    SELECT anc.leaf, p.parent_code
    FROM anc JOIN gl_accounts p ON p.code = anc.ancestor
    WHERE p.parent_code IS NOT NULL
  ),
  mv AS (
    SELECT l.account_code,
           sum(l.debit_vnd - l.credit_vnd) FILTER (WHERE e.entry_date < p_from) AS opening,
           sum(l.debit_vnd)  FILTER (WHERE e.entry_date >= p_from)            AS debit,
           sum(l.credit_vnd) FILTER (WHERE e.entry_date >= p_from)            AS credit
    FROM journal_lines l
    JOIN journal_entries e ON e.id = l.entry_id AND e.status = 'POSTED'
    WHERE e.entry_date <= p_to
    GROUP BY l.account_code
  )
  SELECT g.code, g.name, g.is_postable,
         coalesce(sum(mv.opening), 0),
         coalesce(sum(mv.debit), 0),
         coalesce(sum(mv.credit), 0),
         coalesce(sum(mv.opening), 0) + coalesce(sum(mv.debit), 0) - coalesce(sum(mv.credit), 0)
  FROM gl_accounts g
  JOIN anc ON anc.ancestor = g.code
  LEFT JOIN mv ON mv.account_code = anc.leaf
  GROUP BY g.code, g.name, g.is_postable
$$;

-- R-ACC-07
CREATE VIEW rpt_vat_invoice_listing AS
SELECT 'OUTPUT' AS direction, i.id AS invoice_id, i.branch_id, i.einvoice_series AS series,
       i.einvoice_no AS invoice_no, coalesce(i.einvoice_date, i.invoice_date) AS invoice_date,
       i.buyer_name AS partner_name, i.buyer_tax_code AS partner_tax_code, t.tax_id,
       round(t.taxable_amount * i.exchange_rate, 0) AS taxable_vnd,
       round(t.tax_amount     * i.exchange_rate, 0) AS tax_vnd
FROM customer_invoices i
JOIN customer_invoice_taxes t ON t.invoice_id = i.id
WHERE i.status IN ('POSTED','PARTIALLY_PAID','PAID')
UNION ALL
SELECT 'INPUT', b.id, b.branch_id, b.invoice_series, b.invoice_no, b.invoice_date,
       p.name, b.seller_tax_code, t.tax_id,
       round(t.taxable_amount * b.exchange_rate, 0),
       round(t.tax_amount     * b.exchange_rate, 0)
FROM vendor_bills b
JOIN vendor_bill_taxes t ON t.bill_id = b.id
JOIN partners p          ON p.id = b.supplier_id
WHERE b.status IN ('POSTED','PARTIALLY_PAID','PAID');

-- R-ACC-11: TK loại 5, 7 = thu nhập; 6, 8 = chi phí / classes 5, 7 = income; 6, 8 = expense
CREATE VIEW rpt_pnl_by_dimension AS
SELECT date_trunc('month', e.entry_date)::date AS month,
       coalesce(l.branch_id, e.branch_id)      AS branch_id,
       l.department_id,
       l.account_code,
       CASE WHEN left(l.account_code, 1) IN ('5','7') THEN 'INCOME' ELSE 'EXPENSE' END AS kind,
       sum(CASE WHEN left(l.account_code, 1) IN ('5','7')
                THEN l.credit_vnd - l.debit_vnd ELSE l.debit_vnd - l.credit_vnd END) AS amount_vnd
FROM journal_entries e
JOIN journal_lines l ON l.entry_id = e.id
WHERE e.status = 'POSTED' AND e.entry_type <> 'CLOSING'
  AND left(l.account_code, 1) IN ('5','6','7','8')
GROUP BY 1, 2, 3, 4, 5;

-- FR-ACC-022
CREATE VIEW rpt_payment_schedule AS
SELECT oi.due_date, oi.partner_id, oi.branch_id, oi.doc_no, oi.currency_code,
       oi.residual_amount, oi.residual_vnd
FROM open_items oi
WHERE oi.account_type = 'PAYABLE' AND oi.side = 'CREDIT' AND oi.residual_amount > 0;

-- FR-ACC-023
CREATE VIEW rpt_employee_advance_balances AS
SELECT a.employee_id,
       sum(a.amount) FILTER (WHERE a.status IN ('PAID','SETTLED'))       AS advanced_vnd,
       coalesce(max(s.settled_vnd), 0)                                    AS settled_vnd,
       coalesce(sum(a.amount) FILTER (WHERE a.status IN ('PAID','SETTLED')), 0)
         - coalesce(max(s.settled_vnd), 0)                                AS balance_vnd
FROM employee_advances a
LEFT JOIN (
  SELECT employee_id, sum(total_expense_vnd) AS settled_vnd
  FROM advance_settlements WHERE status = 'POSTED' GROUP BY employee_id
) s ON s.employee_id = a.employee_id
GROUP BY a.employee_id;

-- FR-ACC-027: số dư sổ (sổ tiền gửi) so với số dư sao kê tại ngày cuối sao kê
CREATE VIEW rpt_bank_reconciliation AS
SELECT i.id AS import_id, i.bank_account_id, i.period_to, i.closing_balance AS statement_balance,
       (SELECT coalesce(sum(b.amount), 0) FROM rpt_cash_bank_book b
         WHERE b.account_kind = 'BANK' AND b.account_id = i.bank_account_id
           AND b.move_date <= i.period_to)                            AS book_balance,
       (SELECT count(*) FROM bank_statement_lines s
         WHERE s.import_id = i.id AND s.match_status IN ('UNMATCHED','SUGGESTED')) AS unmatched_lines
FROM bank_statement_imports i;

-- ===== Dashboard theo vai trò / Role-based dashboards (FR-RPT-001) =====
CREATE TABLE dashboard_widget_types (
  code            varchar(50)  PRIMARY KEY,
  name_vi         varchar(150) NOT NULL,
  name_en         varchar(150) NOT NULL,
  function_code   varchar(50)  NOT NULL REFERENCES app_functions(code),  -- cần quyền Xem / View required
  data_source     varchar(100) NOT NULL,                                 -- view / API nguồn dữ liệu
  default_config  jsonb        NOT NULL DEFAULT '{}'
);

CREATE TABLE dashboards (
  id          uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  code        varchar(30)  NOT NULL UNIQUE,
  name        varchar(150) NOT NULL,
  name_en     varchar(150),
  role_id     uuid         REFERENCES roles(id),
  is_default  boolean      NOT NULL DEFAULT false,
  version     integer      NOT NULL DEFAULT 1,
  created_at  timestamptz  NOT NULL DEFAULT now(),
  created_by  uuid         REFERENCES users(id),
  updated_at  timestamptz  NOT NULL DEFAULT now(),
  updated_by  uuid         REFERENCES users(id)
);
CREATE UNIQUE INDEX dashboards_default_per_role ON dashboards (role_id) WHERE is_default;

CREATE TABLE dashboard_widgets (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_id  uuid        NOT NULL REFERENCES dashboards(id) ON DELETE CASCADE,
  widget_code   varchar(50) NOT NULL REFERENCES dashboard_widget_types(code),
  position      jsonb       NOT NULL,  -- {x, y, w, h}
  config        jsonb
);

INSERT INTO dashboard_widget_types (code, name_vi, name_en, function_code, data_source) VALUES
  ('REVENUE',                 'Doanh thu',                    'Revenue',                     'RPT.EXEC_DASHBOARD',   'rpt_sales_lines'),
  ('GROSS_MARGIN',            'Lãi gộp',                      'Gross margin',                'RPT.R-SAL-04',         'rpt_gross_margin'),
  ('CASH_BALANCE',            'Số dư tiền',                   'Cash balance',                'ACC.CASH_VOUCHER',     'rpt_cash_bank_book'),
  ('AR_AP',                   'Phải thu / phải trả',          'Receivables / payables',      'ACC.CUSTOMER_INVOICE', 'open_items'),
  ('STOCK_VALUE',             'Giá trị tồn kho',              'Stock value',                 'INV.STOCK_MOVE',       'stock_balances'),
  ('TOP_CUSTOMERS',           'Khách hàng hàng đầu',          'Top customers',               'RPT.EXEC_DASHBOARD',   'rpt_sales_lines'),
  ('TOP_PRODUCTS',            'Sản phẩm hàng đầu',            'Top products',                'RPT.EXEC_DASHBOARD',   'rpt_sales_lines'),
  ('ORDERS_PENDING_APPROVAL', 'Đơn chờ duyệt',                'Orders pending approval',     'SAL.SALES_ORDER',      'approval_requests'),
  ('UNDELIVERED_ORDERS',      'Đơn chưa giao',                'Undelivered orders',          'SAL.SALES_ORDER',      'rpt_open_sales_orders'),
  ('MY_CUSTOMER_AR',          'Công nợ khách hàng của tôi',   'My customers'' receivables',  'SAL.SALES_ORDER',      'open_items'),
  ('PENDING_PR',              'Đề nghị mua chờ xử lý',        'Pending purchase requests',   'PUR.PURCHASE_REQUEST', 'purchase_requests'),
  ('LATE_PO',                 'Đơn mua trễ hạn',              'Late purchase orders',        'PUR.PURCHASE_ORDER',   'rpt_open_purchase_orders'),
  ('RECEIVED_NOT_BILLED',     'Hàng đã nhận chưa có hóa đơn', 'Received not billed',         'PUR.PURCHASE_ORDER',   'rpt_received_not_billed'),
  ('PENDING_STOCK_DOCS',      'Chứng từ kho chờ xử lý',       'Pending stock documents',     'INV.STOCK_MOVE',       'stock_documents'),
  ('BELOW_MIN_STOCK',         'Hàng dưới tồn tối thiểu',      'Items below minimum',         'INV.STOCK_MOVE',       'v_replenishment_needs'),
  ('EXPIRING_LOTS',           'Lô sắp hết hạn',               'Lots nearing expiry',         'INV.STOCK_MOVE',       'rpt_stock_by_lot_expiry'),
  ('DUE_AR_AP',               'Công nợ đến hạn',              'Due receivables / payables',  'ACC.CUSTOMER_INVOICE', 'open_items'),
  ('CASH_BANK_BALANCES',      'Số dư quỹ và ngân hàng',       'Cash and bank balances',      'ACC.CASH_VOUCHER',     'rpt_cash_bank_book'),
  ('CLOSING_STATUS',          'Tình trạng khóa sổ',           'Closing status',              'ACC.PERIOD_CLOSE',     'period_close_checklist');

INSERT INTO dashboards (code, name, name_en, role_id, is_default)
SELECT 'DEFAULT_' || r.code, 'Dashboard ' || r.name_vi, 'Dashboard ' || r.name_en, r.id, true
FROM roles r WHERE r.code IN ('CEO','SAL','PUR','WH','ACC');

INSERT INTO dashboard_widgets (dashboard_id, widget_code, position)
SELECT d.id, w.widget_code, jsonb_build_object('x', (w.ord - 1) % 3 * 4, 'y', (w.ord - 1) / 3 * 4, 'w', 4, 'h', 4)
FROM (VALUES
  ('CEO', 'REVENUE', 1), ('CEO', 'GROSS_MARGIN', 2), ('CEO', 'CASH_BALANCE', 3), ('CEO', 'AR_AP', 4),
  ('CEO', 'STOCK_VALUE', 5), ('CEO', 'TOP_CUSTOMERS', 6), ('CEO', 'TOP_PRODUCTS', 7),
  ('SAL', 'REVENUE', 1), ('SAL', 'ORDERS_PENDING_APPROVAL', 2), ('SAL', 'UNDELIVERED_ORDERS', 3), ('SAL', 'MY_CUSTOMER_AR', 4),
  ('PUR', 'PENDING_PR', 1), ('PUR', 'LATE_PO', 2), ('PUR', 'RECEIVED_NOT_BILLED', 3),
  ('WH',  'PENDING_STOCK_DOCS', 1), ('WH', 'BELOW_MIN_STOCK', 2), ('WH', 'EXPIRING_LOTS', 3),
  ('ACC', 'DUE_AR_AP', 1), ('ACC', 'CASH_BANK_BALANCES', 2), ('ACC', 'CLOSING_STATUS', 3)
) AS w(role_code, widget_code, ord)
JOIN dashboards d ON d.code = 'DEFAULT_' || w.role_code;
```

</details>
