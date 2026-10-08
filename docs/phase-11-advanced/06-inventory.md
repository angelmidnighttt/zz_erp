# 06 · Kho / Inventory (INV) — Giai đoạn 11 / Phase 11

[← Giai đoạn 11 · Nâng cao / Phase 11 · Advanced](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/06-inventory.md) · [P7](../phase-07-approvals-controls/06-inventory.md) · [P8](../phase-08-operations-completion/06-inventory.md) · [P9](../phase-09-accounting-einvoicing/06-inventory.md) · [P10](../phase-10-expansion/06-inventory.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Soạn hàng & đóng gói; dự phòng giảm giá hàng tồn kho.
- **EN:** Picking & packing; inventory write-down provision.

## 1. Yêu cầu chức năng / Functional requirements

**Nghiệp vụ kho / Stock operations**

#### FR-INV-005 · Soạn hàng & đóng gói / Picking & packing
`Could` · `P11`

- **VI:** Tạo danh sách soạn hàng theo vị trí và thứ tự hết hạn; xác nhận đóng gói, số kiện, trọng lượng.
- **EN:** Generate pick lists ordered by location and expiry; confirm packing, number of parcels and weight.

**Tính giá & hạch toán / Costing & accounting**

#### FR-INV-022 · Dự phòng giảm giá hàng tồn kho / Inventory write-down provision
`Could` · `P11`

- **VI:** Hỗ trợ lập dự phòng giảm giá hàng tồn kho dựa trên giá trị thuần có thể thực hiện được do người dùng nhập.
- **EN:** Support inventory write-down provisions based on user-entered net realizable values.

## 2. Mô hình dữ liệu / Data model

- **VI:** Danh sách soạn hàng gom các dòng phiếu xuất cần lấy, sắp theo vị trí và hạn dùng (`sequence`); đóng gói ghi số kiện, trọng lượng, kích thước theo kiện (`FR-INV-005`); mã vận đơn của kiện được điền khi tạo vận đơn với đơn vị vận chuyển ([11 · Tích hợp](11-integrations.md)). Dự phòng giảm giá hàng tồn kho lập theo kỳ: người dùng nhập giá trị thuần có thể thực hiện được, hệ thống tính phần dự phòng cần trích thêm hoặc hoàn nhập so với kỳ trước và sinh bút toán (`FR-INV-022`).
- **EN:** A pick list groups the issue lines to pick, ordered by location and expiry (`sequence`); packing records the number of parcels, weight and dimensions per parcel (`FR-INV-005`); a parcel's tracking number is filled when the shipment is created with the carrier ([11 · Integrations](11-integrations.md)). Inventory write-down provisions are made per period: users enter net realizable values, the system computes the additional provision or reversal versus the prior period and posts the entry (`FR-INV-022`).

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 05-purchasing.md (P11)

INSERT INTO document_types (code, module, name_vi, name_en, function_code, table_name, sort_order, approval_mode) VALUES
  ('PK',  'INV', 'Phiếu soạn hàng',                 'Pick list',                  'INV.STOCK_MOVE',    'pick_lists',            360, 'NONE'),
  ('IWP', 'ACC', 'Dự phòng giảm giá hàng tồn kho', 'Inventory write-down provision', 'ACC.JOURNAL_ENTRY', 'inventory_provisions', 790, 'SINGLE');
INSERT INTO document_sequences (document_type, prefix) VALUES ('PK', 'PK'), ('IWP', 'IWP');

-- ===== Soạn hàng & đóng gói / Picking & packing (FR-INV-005) =====
CREATE TYPE pick_list_status AS ENUM ('DRAFT','PICKING','PICKED','PACKED','CANCELLED');

CREATE TABLE pick_lists (
  id            uuid             PRIMARY KEY DEFAULT gen_random_uuid(),
  doc_no        varchar(30)      UNIQUE,
  warehouse_id  uuid             NOT NULL REFERENCES warehouses(id),
  status        pick_list_status NOT NULL DEFAULT 'DRAFT',
  picker_id     uuid             REFERENCES users(id),
  started_at    timestamptz,
  finished_at   timestamptz,
  packed_at     timestamptz,
  created_at    timestamptz      NOT NULL DEFAULT now(),
  created_by    uuid             REFERENCES users(id)
);

CREATE TABLE pick_list_lines (
  id                      uuid     PRIMARY KEY DEFAULT gen_random_uuid(),
  pick_list_id            uuid     NOT NULL REFERENCES pick_lists(id),
  sequence                integer  NOT NULL,  -- thứ tự đi lấy hàng / picking order
  stock_document_line_id  uuid     NOT NULL REFERENCES stock_document_lines(id),
  product_id              uuid     NOT NULL REFERENCES products(id),
  lot_id                  uuid     REFERENCES lots(id),
  location_id             uuid     REFERENCES warehouse_locations(id),
  qty_to_pick             dm_qty   NOT NULL CHECK (qty_to_pick > 0),
  qty_picked              dm_qty   NOT NULL DEFAULT 0,
  UNIQUE (pick_list_id, sequence)
);

CREATE TABLE packages (
  id                 uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  pick_list_id       uuid          REFERENCES pick_lists(id),
  stock_document_id  uuid          NOT NULL REFERENCES stock_documents(id),
  package_no         smallint      NOT NULL,
  weight_kg          numeric(10,3),
  length_cm          numeric(8,2),
  width_cm           numeric(8,2),
  height_cm          numeric(8,2),
  tracking_no        varchar(50),  -- mã vận đơn / carrier tracking number (P11 INT)
  created_at         timestamptz   NOT NULL DEFAULT now(),
  created_by         uuid          REFERENCES users(id),
  UNIQUE (stock_document_id, package_no)
);

-- ===== Dự phòng giảm giá HTK / Inventory write-down (FR-INV-022) =====
CREATE TYPE provision_status AS ENUM ('DRAFT','PENDING_APPROVAL','POSTED','CANCELLED');

CREATE TABLE inventory_provisions (
  id                uuid             PRIMARY KEY DEFAULT gen_random_uuid(),
  doc_no            varchar(30)      UNIQUE,
  branch_id         uuid             NOT NULL REFERENCES branches(id),
  fiscal_period_id  uuid             NOT NULL REFERENCES fiscal_periods(id),
  status            provision_status NOT NULL DEFAULT 'DRAFT',
  journal_entry_id  uuid             REFERENCES journal_entries(id),
  version           integer          NOT NULL DEFAULT 1,
  created_at        timestamptz      NOT NULL DEFAULT now(),
  created_by        uuid             REFERENCES users(id),
  updated_at        timestamptz      NOT NULL DEFAULT now(),
  updated_by        uuid             REFERENCES users(id)
);

CREATE TABLE inventory_provision_lines (
  id                  uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  provision_id        uuid          NOT NULL REFERENCES inventory_provisions(id),
  product_id          uuid          NOT NULL REFERENCES products(id),
  warehouse_id        uuid          REFERENCES warehouses(id),
  lot_id              uuid          REFERENCES lots(id),
  qty                 dm_qty        NOT NULL,
  cost_value_vnd      dm_amount     NOT NULL,
  nrv_unit_price      dm_price      NOT NULL,          -- giá trị thuần / net realizable value per unit
  nrv_value_vnd       dm_amount     NOT NULL,
  required_vnd        numeric(20,4) GENERATED ALWAYS AS (GREATEST(cost_value_vnd - nrv_value_vnd, 0)) STORED,
  prior_vnd           dm_amount     NOT NULL DEFAULT 0, -- dự phòng kỳ trước / prior provision
  delta_vnd           numeric(20,4) GENERATED ALWAYS AS (GREATEST(cost_value_vnd - nrv_value_vnd, 0) - prior_vnd) STORED
);
```

</details>
