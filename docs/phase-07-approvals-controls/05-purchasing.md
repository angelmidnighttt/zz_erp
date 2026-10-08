# 05 · Mua hàng / Purchasing (PUR) — Giai đoạn 7 / Phase 7

[← Giai đoạn 7 · Phê duyệt & kiểm soát / Phase 7 · Approvals & controls](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P4](../phase-04-purchasing/05-purchasing.md) · [P8](../phase-08-operations-completion/05-purchasing.md) · [P9](../phase-09-accounting-einvoicing/05-purchasing.md) · [P10](../phase-10-expansion/05-purchasing.md) · [P11](../phase-11-advanced/05-purchasing.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Duyệt đơn mua theo ngưỡng.
- **EN:** Threshold-based PO approval.

## 1. Yêu cầu chức năng / Functional requirements

**Đơn mua hàng / Purchase orders**

#### FR-PUR-009 · Duyệt đơn mua theo ngưỡng / PO approval by threshold
`Must` · `P7`

- **VI:** Đơn mua được duyệt theo ngưỡng giá trị và nhóm hàng; đơn chưa duyệt không được gửi nhà cung cấp và không được nhận hàng.
- **EN:** POs are approved by value thresholds and product category; unapproved POs cannot be sent to suppliers or received.

## 2. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-PUR-001 | Đơn mua vượt ngưỡng giá trị cấu hình phải được duyệt trước khi gửi nhà cung cấp. | POs above the configured threshold must be approved before being sent. | P7 |
| BR-PUR-005 | Người tạo đơn mua không được tự duyệt đơn đó (`BR-ROL-001`). | The PO creator cannot approve it (`BR-ROL-001`). | P7 |

## 3. Mô hình dữ liệu / Data model

- **VI:** Đơn mua dùng luồng duyệt theo ngưỡng giá trị và nhóm hàng (`approval_flows.amount_from` / `amount_to`, `product_category_id`). Ngưỡng cụ thể là dữ liệu cấu hình do doanh nghiệp chốt, không nạp sẵn. Đơn ở `PENDING_APPROVAL` không được gửi nhà cung cấp và không sinh phiếu nhập (`FR-PUR-009`); `BR-PUR-005` được bảo đảm vì `approval_inbox` loại chứng từ do chính người dùng gửi duyệt.
- **EN:** POs use approval flows by value threshold and product category (`approval_flows.amount_from` / `amount_to`, `product_category_id`). The actual thresholds are configuration data decided by the business and are not seeded. A PO in `PENDING_APPROVAL` cannot be sent or received (`FR-PUR-009`); `BR-PUR-005` holds because `approval_inbox` excludes documents the user submitted.

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 02-system-administration.md (P7)

ALTER TYPE po_status ADD VALUE 'PENDING_APPROVAL' BEFORE 'APPROVED';

UPDATE document_types SET approval_mode = 'FLOW' WHERE code = 'PO';

-- FR-SYS-013: đơn giá mua trên chứng từ mua là trường nhạy cảm / purchase prices are sensitive
INSERT INTO sensitive_fields (code, function_code, name_vi, name_en) VALUES
  ('PUR.PURCHASE_ORDER.unit_price', 'PUR.PURCHASE_ORDER', 'Đơn giá mua', 'Purchase unit price');

INSERT INTO role_field_grants (role_id, field_code, access)
SELECT r.id, 'PUR.PURCHASE_ORDER.unit_price', m.access::field_access
FROM (VALUES ('CEO','VIEW'), ('PUR','EDIT'), ('PUM','EDIT'), ('ACC','VIEW'), ('CAC','VIEW'), ('AUD','VIEW'))
       AS m(role_code, access)
JOIN roles r ON r.code = m.role_code
ON CONFLICT DO NOTHING;
```

</details>
