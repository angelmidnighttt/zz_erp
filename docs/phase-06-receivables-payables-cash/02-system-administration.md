# 02 · Quản trị hệ thống / System Administration (SYS) — Giai đoạn 6 / Phase 6

[← Giai đoạn 6 · Công nợ & thu chi / Phase 6 · Receivables, payables & cash](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/02-system-administration.md) · [P2](../phase-02-organization-master-data/02-system-administration.md) · [P3](../phase-03-inventory/02-system-administration.md) · [P7](../phase-07-approvals-controls/02-system-administration.md) · [P8](../phase-08-operations-completion/02-system-administration.md) · [P9](../phase-09-accounting-einvoicing/02-system-administration.md) · [P10](../phase-10-expansion/02-system-administration.md) · [P11](../phase-11-advanced/02-system-administration.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Nhập dữ liệu từ Excel và xuất dữ liệu (chuyển từ [P2](../phase-02-organization-master-data/02-system-administration.md)), làm trước go-live để chuyển danh mục và số dư đầu kỳ (`FR-ACC-004`) từ hệ thống cũ.
- **EN:** Excel import and data export (moved from [P2](../phase-02-organization-master-data/02-system-administration.md)), delivered before go-live to migrate master data and opening balances (`FR-ACC-004`) from the legacy system.

## 1. Yêu cầu chức năng / Functional requirements

**Tiện ích dùng chung / Common utilities**

#### FR-SYS-026 · Nhập dữ liệu từ Excel / Excel import
`Must` · `P6` (mở rộng / extended: `P8`)

- **VI:** Cung cấp mẫu Excel tải về cho danh mục và số dư đầu kỳ; kiểm tra dữ liệu và báo lỗi theo từng dòng; nhập là giao dịch toàn vẹn (lỗi thì không ghi dòng nào).
- **EN:** Provide downloadable Excel templates for master data and opening balances; validate and report errors per row; imports are all-or-nothing.

#### FR-SYS-027 · Xuất dữ liệu / Data export
`Must` · `P6`

- **VI:** Mọi danh sách xuất được ra Excel / CSV / PDF theo bộ lọc và cột đang hiển thị; người xuất phải có quyền Xem trên chức năng đó. Phạm vi dữ liệu và quyền theo trường áp dụng từ P7.
- **EN:** Every list can be exported to Excel / CSV / PDF using the current filters and visible columns; the user needs View on that function. Data scope and field-level permissions apply from P7.

## 2. Mô hình dữ liệu / Data model

- **VI:** Không đổi lược đồ: dùng bảng `import_jobs` đã tạo ở [P2](../phase-02-organization-master-data/02-system-administration.md). Nhập chỉ thêm mới và cần quyền Tạo trên chức năng của dữ liệu đích ([P2 · Vai trò & phân quyền](../phase-02-organization-master-data/01-roles-permissions.md)). Hệ thống kiểm tra mọi dòng trước, gom đủ lỗi theo dòng vào `errors`; chỉ khi không có lỗi mới ghi tất cả trong một giao dịch, dùng lại logic kiểm tra và ghi của API tạo mới. Xuất dữ liệu dùng lại truy vấn của API danh sách, không cần bảng.
- **EN:** No schema change: uses the `import_jobs` table created in P2. Imports only insert and need Create on the target data's function. The system validates every row first and collects all per-row errors in `errors`; only when there are none does it write everything in one transaction, reusing the validation and write logic of the create APIs. Export reuses the list API queries and needs no table.

| `template_code` | Dữ liệu đích (VI) | Target data (EN) | Quyền Tạo trên / Create on |
|---|---|---|---|
| `MDM.UOM` | Đơn vị tính | Units of measure | `MDM.PRODUCT` |
| `MDM.PRODUCT_CATEGORY` | Nhóm sản phẩm | Product categories | `MDM.PRODUCT` |
| `MDM.PRODUCT` | Sản phẩm, quy đổi đơn vị | Products, UoM conversions | `MDM.PRODUCT` |
| `MDM.PARTNER_GROUP` | Nhóm đối tác | Partner groups | `MDM.CUSTOMER` / `MDM.SUPPLIER` |
| `MDM.PARTNER` | Khách hàng, nhà cung cấp | Customers, suppliers | `MDM.CUSTOMER` / `MDM.SUPPLIER` |
| `MDM.WAREHOUSE` | Kho | Warehouses | `MDM.WAREHOUSE` |
| `MDM.EMPLOYEE` | Nhân viên | Employees | `SYS.SETTINGS` |
| `MDM.PRICE_LIST` | Dòng bảng giá | Price list lines | `MDM.PRICE_LIST` |
| `MDM.EXCHANGE_RATE` | Tỷ giá (`FR-MDM-016`) | Exchange rates (`FR-MDM-016`) | `MDM.FINANCE` |
| `OPENING_STOCK` | Tồn kho đầu kỳ: phiếu nhập lý do `OPENING` | Opening stock: receipts with reason `OPENING` | `INV.STOCK_MOVE` |
| `OPENING_AR`, `OPENING_AP` | Công nợ đầu kỳ theo hóa đơn (`open_items`) | Opening AR / AP per invoice (`open_items`) | `ACC.CUSTOMER_INVOICE`, `ACC.VENDOR_BILL` |
| `OPENING_CASH` | Số dư quỹ / tài khoản ngân hàng (`cash_opening_balances`) | Cash fund / bank account balances (`cash_opening_balances`) | `ACC.CASH_VOUCHER`, `ACC.BANK_TXN` |

- **VI:** Các mẫu được liệt kê theo thứ tự nhập: mẫu sau tham chiếu dữ liệu của mẫu trước bằng mã (vd mã nhóm sản phẩm), không dùng `id`.
- **EN:** Templates are listed in import order: later templates reference earlier data by code (e.g. the category code), never by `id`.
