# 06 · Kho / Inventory (INV) — Giai đoạn 9 / Phase 9

[← Giai đoạn 9 · Kế toán đầy đủ & HĐĐT / Phase 9 · Full accounting & e-invoicing](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/06-inventory.md) · [P7](../phase-07-approvals-controls/06-inventory.md) · [P8](../phase-08-operations-completion/06-inventory.md) · [P10](../phase-10-expansion/06-inventory.md) · [P11](../phase-11-advanced/06-inventory.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Hạch toán tự động, điều chỉnh giá trị tồn; phiếu xuất kho kiêm vận chuyển nội bộ điện tử.
- **EN:** Automatic posting, stock value adjustment; electronic internal transfer notes.

## 1. Yêu cầu chức năng / Functional requirements

**Tính giá & hạch toán / Costing & accounting**

#### FR-INV-020 · Hạch toán tự động / Automatic posting
`Must` · `P9`

- **VI:** Mỗi chứng từ kho đã xác nhận sinh bút toán theo cấu hình tài khoản (xem bảng hạch toán mẫu tại [07 · Kế toán](07-accounting-finance.md), mục 1).
- **EN:** Each confirmed stock document generates journal entries based on account configuration (see the sample posting table in [07 · Accounting](07-accounting-finance.md), section 1).

#### FR-INV-021 · Điều chỉnh giá trị tồn kho / Inventory value adjustment
`Should` · `P9`

- **VI:** Điều chỉnh giá trị hàng tồn mà không thay đổi số lượng (ví dụ chi phí mua hàng phát sinh sau); có phê duyệt.
- **EN:** Adjust stock value without changing quantity (e.g. late landed costs); approval required.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-INV-002 | Tài khoản đối ứng cho nhập khác. | Offset account for other receipts. |
| FR-INV-004 | Lập phiếu xuất kho kiêm vận chuyển nội bộ điện tử khi cần (qua nhà cung cấp HĐĐT). | Issue electronic internal transfer delivery notes when required (via the e-invoice provider). |
| FR-INV-015 | Tự sinh bút toán thừa / thiếu (`FR-INV-020`). | Generate surplus / shortage journal entries automatically (`FR-INV-020`). |
| FR-INV-019 | Cập nhật giá vốn vào bút toán. | Update costs on journal entries. |

## 2. Mô hình dữ liệu / Data model

- **VI:** Mỗi chứng từ kho `DONE` có `journal_entry_id` trỏ tới bút toán sinh tự động (`FR-INV-020`); nhập / xuất khác ghi tài khoản đối ứng trên dòng. Phiếu xuất kho kiêm vận chuyển nội bộ điện tử là một `einvoice_documents` loại `INTERNAL_TRANSFER_NOTE` gắn với phiếu chuyển kho. Điều chỉnh giá trị tồn kho không đổi số lượng (`FR-INV-021`) là chứng từ riêng có duyệt; vì `stock_moves` bắt buộc `qty <> 0`, phần giá trị được cộng vào lớp giá / `stock_balances.value_vnd` và ghi sổ qua bút toán.
- **EN:** Every `DONE` stock document has a `journal_entry_id` pointing to its automatic entry (`FR-INV-020`); other receipts / issues carry the offset account on the line. The electronic internal transfer note is an `einvoice_documents` row of kind `INTERNAL_TRANSFER_NOTE` linked to the transfer. Inventory value adjustments without quantity change (`FR-INV-021`) are a separate document with approval; since `stock_moves` requires `qty <> 0`, the value change is applied to cost layers / `stock_balances.value_vnd` and posted through a journal entry.

| Bảng / Table | Mục đích (VI) | Purpose (EN) |
|---|---|---|
| `stock_documents.journal_entry_id`, `einvoice_document_id` | Bút toán tự động; phiếu xuất kho kiêm vận chuyển nội bộ điện tử. | Automatic entry; electronic internal transfer note. |
| `stock_document_lines.offset_account_code` | Tài khoản đối ứng cho nhập / xuất khác (mở rộng `FR-INV-002`). | Offset account for other receipts / issues (`FR-INV-002` extension). |
| `inventory_value_adjustments`, `inventory_value_adjustment_lines` | Điều chỉnh giá trị tồn, có thể phát sinh từ chi phí mua hàng về muộn (`FR-INV-021`). | Stock value adjustments, possibly from late landed costs (`FR-INV-021`). |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 11-integrations.md, 07-accounting-finance.md, 05-purchasing.md (P9)

ALTER TABLE stock_documents
  ADD COLUMN journal_entry_id      uuid REFERENCES journal_entries(id),       -- FR-INV-020
  ADD COLUMN einvoice_document_id  uuid REFERENCES einvoice_documents(id);    -- FR-INV-004 (mở rộng / extension)

ALTER TABLE stock_document_lines
  ADD COLUMN offset_account_code varchar(20) REFERENCES gl_accounts(code);   -- FR-INV-002 (mở rộng / extension)

INSERT INTO document_types (code, module, name_vi, name_en, function_code, table_name, sort_order, approval_mode) VALUES
  ('IVA', 'INV', 'Điều chỉnh giá trị tồn kho', 'Inventory value adjustment', 'INV.STOCK_MOVE',
   'inventory_value_adjustments', 350, 'SINGLE');
INSERT INTO document_sequences (document_type, prefix) VALUES ('IVA', 'IVA');

CREATE TYPE value_adjustment_status AS ENUM ('DRAFT','PENDING_APPROVAL','POSTED','CANCELLED');

CREATE TABLE inventory_value_adjustments (
  id                uuid                    PRIMARY KEY DEFAULT gen_random_uuid(),
  doc_no            varchar(30)             UNIQUE,
  branch_id         uuid                    NOT NULL REFERENCES branches(id),
  adjustment_date   date                    NOT NULL,
  reason            text                    NOT NULL,
  landed_cost_id    uuid                    REFERENCES landed_costs(id),  -- chi phí mua hàng về muộn / late landed cost
  status            value_adjustment_status NOT NULL DEFAULT 'DRAFT',
  journal_entry_id  uuid                    REFERENCES journal_entries(id),
  owner_id          uuid                    REFERENCES users(id),
  department_id     uuid                    REFERENCES departments(id),
  version           integer                 NOT NULL DEFAULT 1,
  created_at        timestamptz             NOT NULL DEFAULT now(),
  created_by        uuid                    REFERENCES users(id),
  updated_at        timestamptz             NOT NULL DEFAULT now(),
  updated_by        uuid                    REFERENCES users(id)
);

CREATE TABLE inventory_value_adjustment_lines (
  id                   uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  adjustment_id        uuid        NOT NULL REFERENCES inventory_value_adjustments(id),
  product_id           uuid        NOT NULL REFERENCES products(id),
  warehouse_id         uuid        NOT NULL REFERENCES warehouses(id),
  lot_id               uuid        REFERENCES lots(id),
  value_delta_vnd      dm_amount   NOT NULL CHECK (value_delta_vnd <> 0),
  offset_account_code  varchar(20) REFERENCES gl_accounts(code)
);
```

</details>
