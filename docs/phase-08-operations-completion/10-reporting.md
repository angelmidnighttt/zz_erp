# 10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT) — Giai đoạn 8 / Phase 8

[← Giai đoạn 8 · Hoàn thiện mua – bán – kho / Phase 8 · Operations completion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/10-reporting.md) · [P4](../phase-04-purchasing/10-reporting.md) · [P5](../phase-05-sales/10-reporting.md) · [P6](../phase-06-receivables-payables-cash/10-reporting.md) · [P7](../phase-07-approvals-controls/10-reporting.md) · [P9](../phase-09-accounting-einvoicing/10-reporting.md) · [P10](../phase-10-expansion/10-reporting.md) · [P11](../phase-11-advanced/10-reporting.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Truy ngược chứng từ; so sánh kỳ.
- **EN:** Drill-down; period comparison.

## 1. Yêu cầu chức năng / Functional requirements

#### FR-RPT-003 · Truy ngược chứng từ / Drill-down
`Must` · `P8`

- **VI:** Từ số tổng hợp trên báo cáo hoặc dashboard, người dùng nhấp để xem chi tiết đến chứng từ gốc.
- **EN:** From any summary figure on a report or dashboard, users click through to the details and source documents.

#### FR-RPT-005 · So sánh kỳ / Period comparison
`Should` · `P8`

- **VI:** So sánh với kỳ trước và cùng kỳ năm trước, hiển thị chênh lệch tuyệt đối và %.
- **EN:** Compare with the previous period and the same period last year, showing absolute and % variance.

## 2. Danh mục báo cáo chuẩn / Standard report catalog

| Mã / Code | Báo cáo (VI) | Report (EN) | Phân hệ / Module | Giai đoạn / Phase |
|---|---|---|---|---|
| R-INV-03 | Tồn kho theo lô / hạn dùng | Stock by lot / expiry | INV | P8 |
| R-INV-04 | Hàng chậm luân chuyển, tuổi tồn kho | Slow-moving stock, stock aging | INV | P8 |

## 3. Mô hình dữ liệu / Data model

- **VI:** Truy ngược chứng từ (`FR-RPT-003`) không cần bảng mới: mọi view `rpt_*` đều trả kèm khóa chứng từ gốc (`document_id`, `invoice_id`…). So sánh kỳ (`FR-RPT-005`) dùng hàm `compare_periods` để lấy khoảng ngày kỳ trước và cùng kỳ năm trước, rồi chạy cùng một truy vấn báo cáo cho ba khoảng. Tuổi tồn kho tính trên lớp giá còn tồn của [06 · Kho](06-inventory.md).
- **EN:** Drill-down (`FR-RPT-003`) needs no new table: every `rpt_*` view returns the source document keys (`document_id`, `invoice_id`…). Period comparison (`FR-RPT-005`) uses the `compare_periods` function to get the previous-period and same-period-last-year date ranges, then runs the same report query for all three ranges. Stock aging is computed from the open cost layers of [06 · Inventory](06-inventory.md).

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 06-inventory.md (P8)

INSERT INTO app_functions (code, module, name_vi, name_en, supported_actions, sort_order) VALUES
  ('RPT.R-INV-03', 'RPT', 'Tồn kho theo lô / hạn dùng',          'Stock by lot / expiry',           '{VIEW,PRINT,EXPORT}', 9103),
  ('RPT.R-INV-04', 'RPT', 'Hàng chậm luân chuyển, tuổi tồn kho', 'Slow-moving stock, stock aging',  '{VIEW,PRINT,EXPORT}', 9104)
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (role_id, function_code, action)
SELECT rp.role_id, f.code, a
FROM app_functions f
JOIN role_permissions rp ON rp.function_code = 'INV.STOCK_MOVE' AND rp.action = 'VIEW'
CROSS JOIN unnest('{VIEW,PRINT,EXPORT}'::permission_action[]) AS a
WHERE f.code IN ('RPT.R-INV-03','RPT.R-INV-04')
ON CONFLICT DO NOTHING;

-- FR-RPT-005: kỳ hiện tại, kỳ trước cùng độ dài, cùng kỳ năm trước
-- Current period, previous period of equal length, same period last year
CREATE FUNCTION compare_periods(p_from date, p_to date)
RETURNS TABLE (period_kind text, date_from date, date_to date)
LANGUAGE sql IMMUTABLE AS $$
  VALUES ('CURRENT',       p_from,                                p_to),
         ('PREVIOUS',      p_from - (p_to - p_from + 1),          p_from - 1),
         ('SAME_LAST_YEAR', (p_from - interval '1 year')::date,   (p_to - interval '1 year')::date)
$$;

-- R-INV-03 · Tồn theo lô / hạn dùng / Stock by lot / expiry
CREATE VIEW rpt_stock_by_lot_expiry AS
SELECT w.branch_id, b.warehouse_id, b.product_id, b.lot_id, l.lot_no, l.mfg_date, l.expiry_date,
       b.on_hand_qty, b.reserved_qty,
       l.expiry_date - current_date                                   AS days_to_expiry,
       l.expiry_date < current_date                                   AS is_expired,
       l.expiry_date - current_date <= coalesce(c.expiry_alert_days, 0) AS is_expiring_soon
FROM stock_balances b
JOIN lots l               ON l.id = b.lot_id
JOIN warehouses w         ON w.id = b.warehouse_id
JOIN products p           ON p.id = b.product_id
JOIN product_categories c ON c.id = p.category_id
WHERE b.on_hand_qty <> 0;

-- R-INV-04 · Tuổi tồn kho & hàng chậm luân chuyển / Stock aging & slow movers
CREATE VIEW rpt_stock_aging AS
SELECT w.branch_id, cl.warehouse_id, cl.product_id, cl.lot_id, cl.in_date,
       current_date - cl.in_date                      AS age_days,
       cl.qty_remaining,
       round(cl.qty_remaining * cl.unit_cost, 0)      AS value_vnd,
       lo.last_issue_date,
       current_date - lo.last_issue_date              AS days_since_last_issue
FROM stock_cost_layers cl
JOIN warehouses w ON w.id = cl.warehouse_id
LEFT JOIN (
  SELECT product_id, warehouse_id, max(move_date) AS last_issue_date
  FROM stock_moves WHERE qty < 0
  GROUP BY product_id, warehouse_id
) lo ON lo.product_id = cl.product_id AND lo.warehouse_id = cl.warehouse_id
WHERE cl.qty_remaining > 0;
```

</details>
