# 04 · Bán hàng / Sales (SAL) — Giai đoạn 7 / Phase 7

[← Giai đoạn 7 · Phê duyệt & kiểm soát / Phase 7 · Approvals & controls](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P5](../phase-05-sales/04-sales.md) · [P8](../phase-08-operations-completion/04-sales.md) · [P9](../phase-09-accounting-einvoicing/04-sales.md) · [P10](../phase-10-expansion/04-sales.md) · [P11](../phase-11-advanced/04-sales.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Kiểm tra hạn mức công nợ; duyệt đơn theo điều kiện; ẩn giá vốn, lãi gộp bằng quyền theo trường.
- **EN:** Credit limit check; conditional order approval; hiding cost and gross margin through field-level permissions.

## 1. Yêu cầu chức năng / Functional requirements

**Đơn bán hàng / Sales orders**

#### FR-SAL-012 · Kiểm tra hạn mức công nợ / Credit limit check
`Must` · `P7`

- **VI:** Khi xác nhận đơn, hệ thống tính: công nợ hiện tại + giá trị đơn đã xác nhận chưa xuất hóa đơn + giá trị đơn này. Nếu vượt hạn mức, hoặc khách hàng có nợ quá hạn quá N ngày, hệ thống chặn hoặc chuyển đơn sang "Chờ duyệt" (cấu hình theo nhóm khách hàng).
- **EN:** On confirmation the system computes: current receivable + confirmed but uninvoiced orders + this order. If this exceeds the credit limit, or the customer has debt overdue by more than N days, the order is blocked or sent to "Pending approval" (configurable per customer group).

**Tiêu chí chấp nhận / Acceptance criteria**

- **AC-1 — VI:** Khách hàng có hạn mức 100.000.000 ₫, công nợ hiện tại 80.000.000 ₫. Xác nhận đơn 30.000.000 ₫ → đơn chuyển "Chờ duyệt" với lý do "Vượt hạn mức công nợ".
  **EN:** Customer credit limit ₫100,000,000, current receivable ₫80,000,000. Confirming a ₫30,000,000 order → order goes to "Pending approval" with reason "Credit limit exceeded".
- **AC-2 — VI:** Cùng khách hàng, đơn 15.000.000 ₫ và không có nợ quá hạn → đơn được xác nhận ngay.
  **EN:** Same customer, ₫15,000,000 order and no overdue debt → order is confirmed immediately.

#### FR-SAL-013 · Duyệt đơn hàng / Order approval
`Must` · `P7`

- **VI:** Đơn hàng đi qua luồng duyệt (`FR-SYS-015`) khi: chiết khấu vượt hạn mức của người lập, giá bán thấp hơn giá tối thiểu, vượt hạn mức công nợ, hoặc giá trị đơn vượt ngưỡng cấu hình.
- **EN:** Orders go through the approval flow (`FR-SYS-015`) when: the discount exceeds the creator's limit, price is below the minimum price, the credit limit is exceeded, or order value exceeds a configured threshold.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-SAL-030 | Ẩn giá vốn, lãi gộp bằng quyền theo trường (`FR-SYS-013`). | Hide cost and gross margin through field-level permissions (`FR-SYS-013`). |

## 2. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-SAL-003 | Giá bán dưới giá tối thiểu hoặc chiết khấu vượt hạn mức của người lập bắt buộc phải được duyệt. | Prices below the minimum or discounts above the creator's limit require approval. | P7 |

## 3. Mô hình dữ liệu / Data model

- **VI:** Khi xác nhận đơn, service đọc `v_customer_credit_exposure` (công nợ hiện tại + đơn đã xác nhận chưa xuất hóa đơn) cộng giá trị đơn và so với `partners.credit_limit`; nếu vượt hoặc có nợ quá hạn quá N ngày thì chặn hoặc chuyển "Chờ duyệt" theo `partner_groups.credit_check_action` (`FR-SAL-012`). Lý do cần duyệt (`CREDIT_LIMIT`, `DISCOUNT_LIMIT`, `BELOW_MIN_PRICE`, `AMOUNT`) ghi vào `approval_requests.reasons` (`FR-SAL-013`). Giá vốn và lãi gộp được khai báo là trường nhạy cảm; báo cáo và màn hình ẩn khi vai trò không được cấp.
- **EN:** On confirmation the service reads `v_customer_credit_exposure` (current receivable + confirmed uninvoiced orders), adds the order value and compares with `partners.credit_limit`; if exceeded, or if debt is overdue by more than N days, the order is blocked or sent to "Pending approval" per `partner_groups.credit_check_action` (`FR-SAL-012`). Approval reasons (`CREDIT_LIMIT`, `DISCOUNT_LIMIT`, `BELOW_MIN_PRICE`, `AMOUNT`) are stored in `approval_requests.reasons` (`FR-SAL-013`). Cost and gross margin are declared sensitive fields; screens and reports hide them unless the role is granted.

| Thay đổi / Change | Mục đích (VI) | Purpose (EN) |
|---|---|---|
| `so_status`, `sales_return_status` + `PENDING_APPROVAL` | Trạng thái Chờ duyệt có từ P7. | The Pending approval status arrives in P7. |
| `partner_groups.credit_check_action`, `overdue_days_threshold` | Chặn hay chuyển duyệt, ngưỡng N ngày quá hạn theo nhóm khách hàng. | Block or route for approval, overdue threshold N per customer group. |
| `v_customer_credit_exposure` | Công nợ và dư nợ tiềm năng theo khách hàng. | Receivable and credit exposure per customer. |
| `sensitive_fields` (seed) | `SAL.SALES_ORDER.cost`, `SAL.SALES_ORDER.gross_margin`; mặc định chỉ `CEO`, `CAC`, `ACC` được xem (`Q-ROL-02`). | `SAL.SALES_ORDER.cost`, `SAL.SALES_ORDER.gross_margin`; visible by default to `CEO`, `CAC`, `ACC` only (`Q-ROL-02`). |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 02-system-administration.md (P7)

ALTER TYPE so_status           ADD VALUE 'PENDING_APPROVAL' BEFORE 'CONFIRMED';
ALTER TYPE sales_return_status ADD VALUE 'PENDING_APPROVAL' BEFORE 'RECEIVED';

UPDATE document_types SET approval_mode = 'FLOW'   WHERE code = 'SO';
UPDATE document_types SET approval_mode = 'SINGLE' WHERE code = 'SRT';

CREATE TYPE credit_check_action AS ENUM ('BLOCK','REQUIRE_APPROVAL');

ALTER TABLE partner_groups
  ADD COLUMN credit_check_action     credit_check_action NOT NULL DEFAULT 'REQUIRE_APPROVAL',
  ADD COLUMN overdue_days_threshold  smallint CHECK (overdue_days_threshold >= 0);  -- NULL = partners.max_overdue_days

-- FR-SAL-012: hạn mức so với exposure_vnd + giá trị đơn đang xác nhận
-- The limit is compared with exposure_vnd + the value of the order being confirmed
CREATE VIEW v_customer_credit_exposure AS
SELECT p.id                                                  AS customer_id,
       p.credit_limit,
       coalesce(ar.receivable_vnd, 0)                        AS receivable_vnd,
       coalesce(so.uninvoiced_vnd, 0)                        AS uninvoiced_orders_vnd,
       coalesce(ar.receivable_vnd, 0) + coalesce(so.uninvoiced_vnd, 0) AS exposure_vnd,
       coalesce(ar.max_overdue_days, 0)                      AS max_overdue_days
FROM partners p
LEFT JOIN (
  SELECT oi.partner_id,
         sum(CASE WHEN oi.side = 'DEBIT' THEN oi.residual_vnd ELSE -oi.residual_vnd END) AS receivable_vnd,
         max(current_date - oi.due_date)
           FILTER (WHERE oi.side = 'DEBIT' AND oi.residual_amount > 0 AND oi.due_date < current_date) AS max_overdue_days
  FROM open_items oi
  WHERE oi.account_type = 'RECEIVABLE'
  GROUP BY oi.partner_id
) ar ON ar.partner_id = p.id
LEFT JOIN (
  SELECT s.customer_id,
         sum(round(GREATEST(l.qty - l.qty_invoiced - l.qty_cancelled, 0) / l.qty
                   * l.amount_total * s.exchange_rate, 0)) AS uninvoiced_vnd
  FROM sales_orders s
  JOIN sales_order_lines l ON l.so_id = s.id
  WHERE s.status IN ('CONFIRMED','PARTIALLY_DELIVERED','DELIVERED')
  GROUP BY s.customer_id
) so ON so.customer_id = p.id
WHERE p.is_customer;

-- FR-SAL-030 (mở rộng / extension), FR-SYS-013
INSERT INTO sensitive_fields (code, function_code, name_vi, name_en) VALUES
  ('SAL.SALES_ORDER.cost',         'SAL.SALES_ORDER', 'Giá vốn', 'Cost'),
  ('SAL.SALES_ORDER.gross_margin', 'SAL.SALES_ORDER', 'Lãi gộp', 'Gross margin');

INSERT INTO role_field_grants (role_id, field_code, access)
SELECT r.id, f.code, 'VIEW'
FROM roles r
CROSS JOIN (VALUES ('SAL.SALES_ORDER.cost'), ('SAL.SALES_ORDER.gross_margin')) AS f(code)
WHERE r.code IN ('CEO','CAC','ACC')
ON CONFLICT DO NOTHING;
```

</details>
