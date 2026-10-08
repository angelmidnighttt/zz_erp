# 03 · Dữ liệu danh mục / Master Data (MDM) — Giai đoạn 7 / Phase 7

[← Giai đoạn 7 · Phê duyệt & kiểm soát / Phase 7 · Approvals & controls](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/03-master-data.md) · [P8](../phase-08-operations-completion/03-master-data.md) · [P9](../phase-09-accounting-einvoicing/03-master-data.md) · [P11](../phase-11-advanced/03-master-data.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Duyệt thay đổi thông tin nhạy cảm và thay đổi bảng giá; giá bán tối thiểu; lịch sử thay đổi danh mục (chuyển từ P2).
- **EN:** Approval of sensitive changes and price list changes; minimum selling price; master-data change history (moved from P2).

## 1. Yêu cầu chức năng / Functional requirements

**Đối tác: khách hàng & nhà cung cấp / Business partners: customers & suppliers**

#### FR-MDM-015 · Duyệt thay đổi thông tin nhạy cảm / Approval of sensitive changes
`Should` · `P7`

- **VI:** Thay đổi tài khoản ngân hàng nhà cung cấp hoặc tăng hạn mức công nợ khách hàng phải được duyệt trước khi có hiệu lực.
- **EN:** Changes to supplier bank accounts or increases to customer credit limits require approval before taking effect.

**Lịch sử thay đổi / Change history**

#### FR-MDM-024 · Lịch sử thay đổi danh mục / Master data change history
`Must` · `P7`

- **VI:** Xem lịch sử thay đổi của từng bản ghi danh mục (ai, khi nào, trường nào, giá trị trước – sau) — dùng chung nhật ký kiểm toán `FR-SYS-029`.
- **EN:** View the change history of each master record (who, when, which field, before/after) — uses the shared audit log `FR-SYS-029`.

**Bảng giá / Price lists**

#### FR-MDM-026 · Giá bán tối thiểu / Minimum selling price
`Should` · `P7`

- **VI:** Khai báo giá bán tối thiểu theo sản phẩm (giá cố định hoặc % trên giá vốn); bán dưới mức này phải được duyệt (`BR-SAL-003`).
- **EN:** Define a minimum selling price per product (fixed or % over cost); selling below it requires approval (`BR-SAL-003`).

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-MDM-025 | Thay đổi bảng giá phải được duyệt. | Price list changes require approval. |

## 2. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-MDM-004 | Thay đổi tài khoản ngân hàng nhà cung cấp phải được duyệt và thông báo cho kế toán trưởng. | Supplier bank-account changes require approval and are notified to the chief accountant. | P7 |

## 3. Mô hình dữ liệu / Data model

- **VI:** Thay đổi cần duyệt không ghi thẳng vào danh mục mà lưu thành `master_change_requests` (giá trị trước – sau), đi qua luồng duyệt ([02 · Quản trị hệ thống](02-system-administration.md)) và chỉ được áp dụng khi đã duyệt. Mỗi nhóm thay đổi có loại chứng từ riêng để người duyệt mặc định là người có quyền Duyệt trên chức năng tương ứng: `PUM` (tài khoản ngân hàng NCC), `SLM` (tăng hạn mức công nợ), `CEO` (bảng giá). Lịch sử thay đổi danh mục (`FR-MDM-024`) đọc từ `audit_logs` theo `entity_type` / `entity_id`, không cần bảng mới.
- **EN:** Changes that need approval are not written straight to master data; they are stored as `master_change_requests` (before / after values), go through the approval flow ([02 · System Administration](02-system-administration.md)) and are applied only once approved. Each change group has its own document type so the default approver is whoever holds Approve on the matching function: `PUM` (supplier bank accounts), `SLM` (credit-limit increases), `CEO` (price lists). Master-data change history (`FR-MDM-024`) is read from `audit_logs` by `entity_type` / `entity_id`; no new table is needed.

| Bảng / Table | Mục đích (VI) | Purpose (EN) |
|---|---|---|
| `master_change_requests` | Yêu cầu thay đổi chờ duyệt (`FR-MDM-015`, mở rộng `FR-MDM-025`); `partner_id` + `applied_at` dùng để kiểm `BR-ROL-003`. | Change requests awaiting approval (`FR-MDM-015`, `FR-MDM-025` extension); `partner_id` + `applied_at` are used to check `BR-ROL-003`. |
| `products.min_price_basis`, `min_price_value` | Giá bán tối thiểu cố định (VND / đơn vị cơ bản) hoặc % trên giá vốn (`FR-MDM-026`). | Minimum price, fixed (VND per base unit) or % over cost (`FR-MDM-026`). |
| `sensitive_fields` (seed) | Giá mua tham khảo của sản phẩm là trường nhạy cảm (`FR-SYS-013`). | The product reference purchase price is a sensitive field (`FR-SYS-013`). |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 02-system-administration.md (P7)

INSERT INTO document_types (code, module, name_vi, name_en, function_code, table_name, sort_order, approval_mode) VALUES
  ('SUPCHG', 'MDM', 'Đổi tài khoản ngân hàng NCC', 'Supplier bank change',  'MDM.SUPPLIER',   'master_change_requests', 210, 'SINGLE'),
  ('CUSCHG', 'MDM', 'Tăng hạn mức công nợ',        'Credit limit increase', 'MDM.CUSTOMER',   'master_change_requests', 220, 'SINGLE'),
  ('PLCHG',  'MDM', 'Thay đổi bảng giá',           'Price list change',     'MDM.PRICE_LIST', 'master_change_requests', 230, 'SINGLE');

CREATE TYPE master_change_status AS ENUM ('PENDING','APPROVED','REJECTED','CANCELLED','APPLIED');

CREATE TABLE master_change_requests (
  id                   uuid                 PRIMARY KEY DEFAULT gen_random_uuid(),
  document_type        varchar(10)          NOT NULL REFERENCES document_types(code),
  entity_type          varchar(50)          NOT NULL,  -- 'partner_bank_account', 'partner', 'price_list'
  entity_id            uuid,                           -- NULL khi tạo mới / NULL when creating
  partner_id           uuid                 REFERENCES partners(id),
  change_kind          varchar(20)          NOT NULL CHECK (change_kind IN ('CREATE','UPDATE','DEACTIVATE')),
  before_data          jsonb,
  after_data           jsonb                NOT NULL,  -- với bảng giá: các dòng thêm / sửa / ngừng
  reason               text,
  status               master_change_status NOT NULL DEFAULT 'PENDING',
  approval_request_id  uuid                 REFERENCES approval_requests(id),
  requested_by         uuid                 NOT NULL REFERENCES users(id),
  requested_at         timestamptz          NOT NULL DEFAULT now(),
  applied_at           timestamptz,
  applied_by           uuid                 REFERENCES users(id)
);
CREATE INDEX ON master_change_requests (entity_type, entity_id);
CREATE INDEX ON master_change_requests (partner_id, applied_at);  -- BR-ROL-003

-- FR-MDM-026
CREATE TYPE min_price_basis AS ENUM ('FIXED','COST_MARKUP_PCT');

ALTER TABLE products
  ADD COLUMN min_price_basis  min_price_basis,
  ADD COLUMN min_price_value  numeric(20,6) CHECK (min_price_value >= 0),
  ADD CONSTRAINT products_min_price_check CHECK ((min_price_basis IS NULL) = (min_price_value IS NULL));

-- FR-SYS-013: giá mua là trường nhạy cảm / purchase price is a sensitive field
INSERT INTO sensitive_fields (code, function_code, name_vi, name_en) VALUES
  ('MDM.PRODUCT.ref_purchase_price', 'MDM.PRODUCT', 'Giá mua tham khảo', 'Reference purchase price');

INSERT INTO role_field_grants (role_id, field_code, access)
SELECT r.id, 'MDM.PRODUCT.ref_purchase_price', m.access::field_access
FROM (VALUES ('CEO','VIEW'), ('PUR','EDIT'), ('PUM','EDIT'), ('ACC','VIEW'), ('CAC','EDIT'), ('AUD','VIEW'))
       AS m(role_code, access)
JOIN roles r ON r.code = m.role_code
ON CONFLICT DO NOTHING;
```

</details>
