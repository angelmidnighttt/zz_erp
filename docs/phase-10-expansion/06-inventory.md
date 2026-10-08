# 06 · Kho / Inventory (INV) — Giai đoạn 10 / Phase 10

[← Giai đoạn 10 · Mở rộng / Phase 10 · Expansion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/06-inventory.md) · [P7](../phase-07-approvals-controls/06-inventory.md) · [P8](../phase-08-operations-completion/06-inventory.md) · [P9](../phase-09-accounting-einvoicing/06-inventory.md) · [P11](../phase-11-advanced/06-inventory.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Quét mã vạch.
- **EN:** Barcode scanning.

## 1. Yêu cầu chức năng / Functional requirements

**Nghiệp vụ kho / Stock operations**

#### FR-INV-007 · Quét mã vạch / Barcode scanning
`Should` · `P10`

- **VI:** Nhập, xuất, kiểm kê bằng máy quét mã vạch hoặc camera điện thoại; hỗ trợ mã vạch sản phẩm, lô và vị trí.
- **EN:** Receive, issue and count using barcode scanners or phone cameras; support product, lot and location barcodes.

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-INV-014 | Ghi nhận số lượng bằng quét mã vạch (`FR-INV-007`). | Record quantities by barcode scanning (`FR-INV-007`). |

## 2. Mô hình dữ liệu / Data model

- **VI:** Máy quét gửi chuỗi mã vạch; hệ thống tra một lần qua view `v_barcode_lookup` để biết đó là sản phẩm (đơn vị cơ bản hoặc đơn vị quy đổi), lô hay vị trí (`FR-INV-007`). Mã vạch là duy nhất trong từng bảng; trùng giữa các bảng được service chặn khi lưu. Số lượng kiểm kê ghi bằng quét lưu người quét, thời điểm và số lần quét (mở rộng `FR-INV-014`).
- **EN:** Scanners send a barcode string; the system resolves it once through the `v_barcode_lookup` view to a product (base or alternate UoM), lot or location (`FR-INV-007`). Barcodes are unique within each table; cross-table duplicates are blocked by the service on save. Count quantities captured by scanning store the scanner, time and scan count (`FR-INV-014` extension).

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 01-roles-permissions.md (P10)

ALTER TABLE lots ADD COLUMN barcode varchar(50) UNIQUE;

CREATE VIEW v_barcode_lookup AS
SELECT p.barcode, 'PRODUCT' AS kind, p.id AS product_id, p.base_uom_id AS uom_id,
       1::numeric AS uom_factor, NULL::uuid AS lot_id, NULL::uuid AS location_id
FROM products p WHERE p.barcode IS NOT NULL
UNION ALL
SELECT pu.barcode, 'PRODUCT_UOM', pu.product_id, pu.uom_id, pu.factor, NULL, NULL
FROM product_uoms pu WHERE pu.barcode IS NOT NULL
UNION ALL
SELECT l.barcode, 'LOT', l.product_id, NULL, NULL, l.id, NULL
FROM lots l WHERE l.barcode IS NOT NULL
UNION ALL
SELECT wl.barcode, 'LOCATION', NULL, NULL, NULL, NULL, wl.id
FROM warehouse_locations wl WHERE wl.barcode IS NOT NULL;

-- FR-INV-014 (mở rộng / extension)
ALTER TABLE stock_count_lines
  ADD COLUMN scanned_by  uuid     REFERENCES users(id),
  ADD COLUMN scanned_at  timestamptz,
  ADD COLUMN scan_count  integer  NOT NULL DEFAULT 0;
```

</details>
