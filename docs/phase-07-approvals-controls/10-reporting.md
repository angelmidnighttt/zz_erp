# 10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT) — Giai đoạn 7 / Phase 7

[← Giai đoạn 7 · Phê duyệt & kiểm soát / Phase 7 · Approvals & controls](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/10-reporting.md) · [P4](../phase-04-purchasing/10-reporting.md) · [P5](../phase-05-sales/10-reporting.md) · [P6](../phase-06-receivables-payables-cash/10-reporting.md) · [P8](../phase-08-operations-completion/10-reporting.md) · [P9](../phase-09-accounting-einvoicing/10-reporting.md) · [P10](../phase-10-expansion/10-reporting.md) · [P11](../phase-11-advanced/10-reporting.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Báo cáo tuân theo quyền theo trường.
- **EN:** Reports respect field-level permissions.

## 1. Yêu cầu chức năng / Functional requirements

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-RPT-006 | Dữ liệu trong báo cáo tuân theo phạm vi dữ liệu (`FR-SYS-012`) và quyền theo trường (`FR-SYS-013`). | Report data respects data scope (`FR-SYS-012`) and field-level permissions (`FR-SYS-013`). |

## 2. Mô hình dữ liệu / Data model

- **VI:** View `rpt_*` không tự biết người đang xem; tầng service thêm điều kiện phạm vi dữ liệu (dựng từ `v_user_permissions` + `user_access_ids`) và bỏ / che cột nhạy cảm theo `user_field_access` trước khi trả dữ liệu, xuất Excel / PDF hay in. Hàm dưới đây trả quyền theo trường hiệu lực của một người dùng (quy tắc 4: `EDIT` bao gồm `VIEW`).
- **EN:** `rpt_*` views do not know who is viewing; the service layer adds the data-scope condition (built from `v_user_permissions` + `user_access_ids`) and drops / masks sensitive columns per `user_field_access` before returning, exporting or printing. The function below returns a user's effective field access (rule 4: `EDIT` implies `VIEW`).

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 01-roles-permissions.md, 04-sales.md (P7)

-- NULL = ẩn / hidden; 'VIEW'; 'EDIT'
CREATE FUNCTION user_field_access(p_user_id uuid, p_field_code varchar) RETURNS field_access
LANGUAGE sql STABLE AS $$
  SELECT max(g.access)                        -- enum: 'VIEW' < 'EDIT'
  FROM user_roles ur
  JOIN roles r              ON r.id = ur.role_id AND r.is_active
  JOIN role_field_grants g  ON g.role_id = r.id AND g.field_code = p_field_code
  WHERE ur.user_id = p_user_id
$$;

-- Báo cáo lãi gộp dùng chung trường nhạy cảm với đơn bán / the gross-margin report reuses the sales-order fields
COMMENT ON VIEW rpt_gross_margin IS
  'cost_vnd → SAL.SALES_ORDER.cost; gross_margin_vnd → SAL.SALES_ORDER.gross_margin (FR-SYS-013)';
```

</details>
