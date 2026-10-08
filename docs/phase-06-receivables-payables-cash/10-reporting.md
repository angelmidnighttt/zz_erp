# 10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT) — Giai đoạn 6 / Phase 6

[← Giai đoạn 6 · Công nợ & thu chi / Phase 6 · Receivables, payables & cash](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/10-reporting.md) · [P4](../phase-04-purchasing/10-reporting.md) · [P5](../phase-05-sales/10-reporting.md) · [P7](../phase-07-approvals-controls/10-reporting.md) · [P8](../phase-08-operations-completion/10-reporting.md) · [P9](../phase-09-accounting-einvoicing/10-reporting.md) · [P10](../phase-10-expansion/10-reporting.md) · [P11](../phase-11-advanced/10-reporting.md)

---

## 1. Danh mục báo cáo chuẩn / Standard report catalog

| Mã / Code | Báo cáo (VI) | Report (EN) | Phân hệ / Module | Giai đoạn / Phase |
|---|---|---|---|---|
| R-ACC-04 | Tuổi nợ phải thu / phải trả | AR / AP aging | ACC | P6 |
| R-ACC-06 | Sổ quỹ tiền mặt, sổ tiền gửi ngân hàng | Cash book, bank book | ACC | P6 |

## 2. Mô hình dữ liệu / Data model

- **VI:** R-ACC-04 là hàm `rpt_aging(loại công nợ, ngày)`: số còn lại tính lại theo phân bổ đến ngày báo cáo, nên chạy được cho ngày trong quá khứ; khoản ở bên ngược (thu trước, trả trước) mang dấu âm. Khoảng tuổi nợ lấy từ tham số `ar.aging_buckets`. R-ACC-06 là view `rpt_cash_bank_book` có số dư lũy kế theo từng quỹ / tài khoản, gồm số dư đầu kỳ go-live. Quyền mặc định: R-ACC-04 theo quyền Xem trên `ACC.CUSTOMER_INVOICE`, R-ACC-06 theo quyền Xem trên `ACC.CASH_VOUCHER`.
- **EN:** R-ACC-04 is the `rpt_aging(account type, date)` function: residuals are recomputed from allocations up to the report date, so it works for past dates; opposite-side items (prepayments) are negative. Buckets come from the `ar.aging_buckets` parameter. R-ACC-06 is the `rpt_cash_bank_book` view with a running balance per fund / account, including the go-live opening balance. Default access: R-ACC-04 follows View on `ACC.CUSTOMER_INVOICE`, R-ACC-06 follows View on `ACC.CASH_VOUCHER`.

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 07-accounting-finance.md (P6)

INSERT INTO app_functions (code, module, name_vi, name_en, supported_actions, sort_order) VALUES
  ('RPT.R-ACC-04', 'RPT', 'Tuổi nợ phải thu / phải trả',             'AR / AP aging',        '{VIEW,PRINT,EXPORT}', 9404),
  ('RPT.R-ACC-06', 'RPT', 'Sổ quỹ tiền mặt, sổ tiền gửi ngân hàng', 'Cash book, bank book', '{VIEW,PRINT,EXPORT}', 9406)
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (role_id, function_code, action)
SELECT rp.role_id, m.report_code, a
FROM (VALUES ('RPT.R-ACC-04', 'ACC.CUSTOMER_INVOICE'), ('RPT.R-ACC-06', 'ACC.CASH_VOUCHER'))
       AS m(report_code, source_function)
JOIN role_permissions rp ON rp.function_code = m.source_function AND rp.action = 'VIEW'
CROSS JOIN unnest('{VIEW,PRINT,EXPORT}'::permission_action[]) AS a
ON CONFLICT DO NOTHING;

-- 45 ngày, [30,60,90] → '31-60'; 0 ngày → 'NOT_DUE'; 120 ngày → '>90'
CREATE FUNCTION aging_bucket(p_days integer, p_limits integer[]) RETURNS text
LANGUAGE sql IMMUTABLE AS $$
  SELECT CASE
    WHEN p_days <= 0 THEN 'NOT_DUE'
    ELSE coalesce(
      (SELECT (coalesce(z.prev, 0) + 1) || '-' || z.lim
         FROM (SELECT u.lim, lag(u.lim) OVER (ORDER BY u.lim) AS prev
                 FROM unnest(p_limits) AS u(lim)) z
        WHERE p_days <= z.lim
        ORDER BY z.lim
        LIMIT 1),
      '>' || (SELECT max(u.lim) FROM unnest(p_limits) AS u(lim)))
  END
$$;

-- R-ACC-04 · Tuổi nợ / Aging
CREATE FUNCTION rpt_aging(p_account_type ledger_account_type, p_as_of date)
RETURNS TABLE (partner_id uuid, branch_id uuid, salesperson_id uuid, open_item_id uuid,
               doc_no varchar, doc_date date, due_date date, currency_code char(3),
               residual_amount numeric, residual_vnd numeric, days_overdue integer, bucket text)
LANGUAGE sql STABLE AS $$
  WITH lim AS (
    SELECT array(SELECT jsonb_array_elements_text(s.value)::int
                   FROM system_settings s WHERE s.key = 'ar.aging_buckets') AS limits
  ),
  alloc AS (
    SELECT x.item_id, sum(x.amount) AS amount, sum(x.amount_vnd) AS amount_vnd
    FROM (
      SELECT a.debit_item_id AS item_id, a.amount, a.amount_vnd
        FROM open_item_allocations a WHERE a.allocation_date <= p_as_of AND a.reversed_at IS NULL
      UNION ALL
      SELECT a.credit_item_id, a.amount, a.amount_vnd
        FROM open_item_allocations a WHERE a.allocation_date <= p_as_of AND a.reversed_at IS NULL
    ) x
    GROUP BY x.item_id
  )
  SELECT oi.partner_id, oi.branch_id, p.salesperson_id, oi.id, oi.doc_no, oi.doc_date, oi.due_date,
         oi.currency_code,
         sg.sign * (oi.amount     - coalesce(al.amount, 0)),
         sg.sign * (oi.amount_vnd - coalesce(al.amount_vnd, 0)),
         GREATEST(p_as_of - coalesce(oi.due_date, oi.doc_date), 0),
         aging_bucket(p_as_of - coalesce(oi.due_date, oi.doc_date), lim.limits)
  FROM open_items oi
  JOIN partners p ON p.id = oi.partner_id
  LEFT JOIN alloc al ON al.item_id = oi.id
  CROSS JOIN lim
  CROSS JOIN LATERAL (
    SELECT CASE WHEN (oi.account_type = 'RECEIVABLE') = (oi.side = 'DEBIT') THEN 1 ELSE -1 END AS sign
  ) sg
  WHERE oi.account_type = p_account_type
    AND oi.doc_date <= p_as_of
    AND oi.amount - coalesce(al.amount, 0) <> 0
$$;

-- Mọi biến động tiền, một dòng cho mỗi quỹ / tài khoản bị ảnh hưởng
-- Every cash movement, one row per affected fund / account
CREATE VIEW rpt_cash_bank_movements AS
SELECT d.id AS document_id, d.doc_no, d.doc_type, d.doc_date AS move_date, d.branch_id,
       CASE WHEN d.cash_fund_id IS NOT NULL THEN 'CASH' ELSE 'BANK' END   AS account_kind,
       coalesce(d.cash_fund_id, d.bank_account_id)                       AS account_id,
       d.partner_id, d.counterparty_name, d.reason, d.currency_code,
       CASE WHEN d.doc_type IN ('CASH_RECEIPT','BANK_CREDIT') THEN d.amount     ELSE -d.amount     END AS amount,
       CASE WHEN d.doc_type IN ('CASH_RECEIPT','BANK_CREDIT') THEN d.amount_vnd ELSE -d.amount_vnd END AS amount_vnd
FROM cash_documents d
WHERE d.status = 'POSTED'
UNION ALL
SELECT d.id, d.doc_no, d.doc_type, coalesce(d.received_date, d.doc_date), d.branch_id,
       CASE WHEN d.to_cash_fund_id IS NOT NULL THEN 'CASH' ELSE 'BANK' END,
       coalesce(d.to_cash_fund_id, d.to_bank_account_id),
       d.partner_id, d.counterparty_name, d.reason, d.currency_code, d.amount, d.amount_vnd
FROM cash_documents d
WHERE d.status = 'POSTED' AND d.doc_type = 'INTERNAL_TRANSFER'
  AND (NOT d.via_in_transit OR d.received_date IS NOT NULL);

-- R-ACC-06 · Sổ quỹ, sổ tiền gửi / Cash book, bank book
CREATE VIEW rpt_cash_bank_book AS
WITH rows AS (
  SELECT NULL::uuid AS document_id, NULL::varchar AS doc_no, NULL::cash_doc_type AS doc_type,
         o.as_of_date AS move_date, coalesce(f.branch_id, b.branch_id) AS branch_id,
         CASE WHEN o.cash_fund_id IS NOT NULL THEN 'CASH' ELSE 'BANK' END AS account_kind,
         coalesce(o.cash_fund_id, o.bank_account_id) AS account_id,
         NULL::uuid AS partner_id, NULL::varchar AS counterparty_name,
         'Số dư đầu kỳ / Opening balance' AS reason, o.currency_code, o.amount, o.amount_vnd,
         0 AS sort_key
  FROM cash_opening_balances o
  LEFT JOIN cash_funds f            ON f.id = o.cash_fund_id
  LEFT JOIN company_bank_accounts b ON b.id = o.bank_account_id
  UNION ALL
  SELECT m.document_id, m.doc_no, m.doc_type, m.move_date, m.branch_id, m.account_kind, m.account_id,
         m.partner_id, m.counterparty_name, m.reason, m.currency_code, m.amount, m.amount_vnd, 1
  FROM rpt_cash_bank_movements m
)
SELECT r.*,
       GREATEST(r.amount, 0)  AS amount_in,
       GREATEST(-r.amount, 0) AS amount_out,
       sum(r.amount)     OVER running AS balance,
       sum(r.amount_vnd) OVER running AS balance_vnd
FROM rows r
WINDOW running AS (PARTITION BY r.account_kind, r.account_id
                   ORDER BY r.move_date, r.sort_key, r.doc_no NULLS FIRST);
```

</details>
