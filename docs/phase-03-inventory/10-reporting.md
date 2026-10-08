# 10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT) — Giai đoạn 3 / Phase 3

[← Giai đoạn 3 · Kho cơ bản / Phase 3 · Basic inventory](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P4](../phase-04-purchasing/10-reporting.md) · [P5](../phase-05-sales/10-reporting.md) · [P6](../phase-06-receivables-payables-cash/10-reporting.md) · [P7](../phase-07-approvals-controls/10-reporting.md) · [P8](../phase-08-operations-completion/10-reporting.md) · [P9](../phase-09-accounting-einvoicing/10-reporting.md) · [P10](../phase-10-expansion/10-reporting.md) · [P11](../phase-11-advanced/10-reporting.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Bộ lọc & nhóm dữ liệu; xuất Excel / PDF; phân quyền báo cáo; báo cáo chuẩn của từng phân hệ khi phân hệ được triển khai (mục "Danh mục báo cáo chuẩn" trong `10-reporting.md` của từng giai đoạn).
- **EN:** Filters & grouping; Excel / PDF export; report permissions; each module's standard reports as the module is delivered ("Standard report catalog" in each phase's `10-reporting.md`).

## 1. Mục tiêu / Objectives

- **VI:** Cung cấp thông tin kịp thời, chính xác cho từng cấp quản lý; mọi con số đều truy ngược được về chứng từ gốc; tuân thủ phân quyền dữ liệu.
- **EN:** Deliver timely, accurate information to each management level; every figure can be traced back to source documents; data permissions are always respected.

## 2. Yêu cầu chức năng / Functional requirements

#### FR-RPT-002 · Bộ lọc & nhóm dữ liệu / Filters & grouping
`Must` · `P3`

- **VI:** Mọi báo cáo có bộ lọc theo kỳ, chi nhánh, kho, khách hàng, nhà cung cấp, sản phẩm, nhân viên… và cho phép nhóm, tính tổng phụ.
- **EN:** Every report filters by period, branch, warehouse, customer, supplier, product, employee… and supports grouping and subtotals.

#### FR-RPT-004 · Xuất & in báo cáo / Export & print
`Must` · `P3`

- **VI:** Xuất Excel (giữ định dạng số, không gộp ô gây khó xử lý), PDF và in; tiêu đề báo cáo theo ngôn ngữ người dùng.
- **EN:** Export to Excel (numeric formats kept, no merged cells that hinder processing), PDF and print; report titles follow the user's language.

#### FR-RPT-006 · Phân quyền báo cáo / Report permissions
`Must` · `P3` (mở rộng / extended: `P7`)

- **VI:** Quyền xem từng báo cáo theo vai trò. Phạm vi dữ liệu trong báo cáo áp dụng từ P7.
- **EN:** Report access is granted per role. Data scope on report data applies from P7.

## 3. Danh mục báo cáo chuẩn / Standard report catalog

| Mã / Code | Báo cáo (VI) | Report (EN) | Phân hệ / Module | Giai đoạn / Phase |
|---|---|---|---|---|
| R-INV-01 | Thẻ kho | Stock card | INV | P3 |
| R-INV-02 | Nhập – xuất – tồn (số lượng & giá trị) | Stock movement summary (qty & value) | INV | P3 |
| R-INV-05 | Chênh lệch kiểm kê | Stock count variance | INV | P3 |

## 4. Mô hình dữ liệu / Data model

- **VI:** Mỗi báo cáo chuẩn được đăng ký như một chức năng `RPT.<mã báo cáo>` trong `app_functions` với hành động Xem / In / Xuất, nên phân quyền báo cáo theo vai trò (`FR-RPT-006`) dùng lại ma trận quyền. Mặc định, vai trò có quyền Xem trên chức năng nguồn được xem báo cáo; quản trị viên có thể đổi. Dữ liệu báo cáo lấy từ view / hàm `rpt_*`; bộ lọc (`FR-RPT-002`) là điều kiện `WHERE` trên các cột `branch_id`, `warehouse_id`, `product_id`, ngày…
- **EN:** Each standard report is registered as an `RPT.<report code>` function in `app_functions` with View / Print / Export actions, so per-role report access (`FR-RPT-006`) reuses the permission matrix. By default, roles with View on the source function may view the report; administrators can change this. Report data comes from `rpt_*` views / functions; filters (`FR-RPT-002`) are `WHERE` conditions on `branch_id`, `warehouse_id`, `product_id`, dates…

| Đối tượng / Object | Báo cáo / Report | Ghi chú (VI) | Notes (EN) |
|---|---|---|---|
| `rpt_stock_card` | R-INV-01 | Lũy kế tính trên toàn bộ lịch sử rồi mới lọc ngày, nên số tồn đầu dòng đầu tiên luôn đúng. | The running balance is computed over full history before date filtering, so the first row's balance is correct. |
| `rpt_stock_movement_summary(p_from, p_to)` | R-INV-02 | Tồn đầu – nhập – xuất – tồn cuối theo kho × sản phẩm. | Opening – in – out – closing per warehouse × product. |
| `rpt_stock_count_variance` | R-INV-05 | Chỉ các dòng đã nhập số thực tế. | Only lines with a counted quantity. |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 06-inventory.md (P3)

INSERT INTO app_functions (code, module, name_vi, name_en, supported_actions, sort_order) VALUES
  ('RPT.R-INV-01', 'RPT', 'Thẻ kho',            'Stock card',             '{VIEW,PRINT,EXPORT}', 9101),
  ('RPT.R-INV-02', 'RPT', 'Nhập – xuất – tồn',  'Stock movement summary', '{VIEW,PRINT,EXPORT}', 9102),
  ('RPT.R-INV-05', 'RPT', 'Chênh lệch kiểm kê', 'Stock count variance',   '{VIEW,PRINT,EXPORT}', 9105)
ON CONFLICT (code) DO NOTHING;

-- Quyền mặc định: theo quyền Xem trên chức năng nguồn / default: follow View on the source function
INSERT INTO role_permissions (role_id, function_code, action)
SELECT rp.role_id, m.report_code, a
FROM (VALUES
  ('RPT.R-INV-01', 'INV.STOCK_MOVE'),
  ('RPT.R-INV-02', 'INV.STOCK_MOVE'),
  ('RPT.R-INV-05', 'INV.STOCK_COUNT')
) AS m(report_code, source_function)
JOIN role_permissions rp ON rp.function_code = m.source_function AND rp.action = 'VIEW'
CROSS JOIN unnest('{VIEW,PRINT,EXPORT}'::permission_action[]) AS a
ON CONFLICT DO NOTHING;

-- R-INV-01 · Thẻ kho / Stock card
CREATE VIEW rpt_stock_card AS
SELECT m.id                 AS move_id,
       m.move_date,
       w.branch_id,
       m.warehouse_id,
       m.product_id,
       d.doc_no,
       d.doc_type,
       d.reason,
       d.description,
       GREATEST(m.qty, 0)   AS qty_in,
       GREATEST(-m.qty, 0)  AS qty_out,
       m.unit_cost,
       m.value,
       sum(m.qty)   OVER running AS balance_qty,
       sum(m.value) OVER running AS balance_value
FROM stock_moves m
JOIN stock_documents d ON d.id = m.document_id
JOIN warehouses w      ON w.id = m.warehouse_id
WINDOW running AS (PARTITION BY m.warehouse_id, m.product_id ORDER BY m.move_date, m.id);

-- R-INV-02 · Nhập – xuất – tồn / Stock movement summary
CREATE FUNCTION rpt_stock_movement_summary(p_from date, p_to date)
RETURNS TABLE (branch_id uuid, warehouse_id uuid, product_id uuid,
               opening_qty numeric, opening_value numeric,
               in_qty numeric, in_value numeric,
               out_qty numeric, out_value numeric,
               closing_qty numeric, closing_value numeric)
LANGUAGE sql STABLE AS $$
  SELECT w.branch_id, m.warehouse_id, m.product_id,
         coalesce(sum(m.qty)    FILTER (WHERE m.move_date <  p_from), 0),
         coalesce(sum(m.value)  FILTER (WHERE m.move_date <  p_from), 0),
         coalesce(sum(m.qty)    FILTER (WHERE m.move_date >= p_from AND m.qty > 0), 0),
         coalesce(sum(m.value)  FILTER (WHERE m.move_date >= p_from AND m.qty > 0), 0),
         coalesce(-sum(m.qty)   FILTER (WHERE m.move_date >= p_from AND m.qty < 0), 0),
         coalesce(-sum(m.value) FILTER (WHERE m.move_date >= p_from AND m.qty < 0), 0),
         sum(m.qty),
         coalesce(sum(m.value), 0)
  FROM stock_moves m
  JOIN warehouses w ON w.id = m.warehouse_id
  WHERE m.move_date <= p_to
  GROUP BY w.branch_id, m.warehouse_id, m.product_id
$$;

-- R-INV-05 · Chênh lệch kiểm kê / Stock count variance
CREATE VIEW rpt_stock_count_variance AS
SELECT c.id      AS count_id,
       c.doc_no,
       c.count_date,
       c.status,
       c.branch_id,
       l.warehouse_id,
       l.product_id,
       l.book_qty,
       l.counted_qty,
       l.diff_qty,
       l.unit_cost,
       round(l.diff_qty * l.unit_cost, 0) AS diff_value
FROM stock_counts c
JOIN stock_count_lines l ON l.count_id = c.id
WHERE l.counted_qty IS NOT NULL;
```

</details>

## 5. Câu hỏi mở / Open questions

| # | Câu hỏi (VI) | Question (EN) |
|---|---|---|
| Q-RPT-01 | Ban giám đốc đang theo dõi những chỉ số nào hằng ngày / tuần? | Which KPIs does management track daily / weekly today? |
| Q-RPT-02 | Có mẫu báo cáo quản trị Excel hiện hành cần giữ nguyên định dạng? | Are there existing Excel management reports whose layout must be kept? |
