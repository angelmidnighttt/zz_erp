# Giai đoạn 8 — Hoàn thiện mua – bán – kho / Phase 8 — Operations completion

[← Mục lục / Index](../README.md) · [← P7](../phase-07-approvals-controls/README.md) · [P9 →](../phase-09-accounting-einvoicing/README.md)

---

## 1. Mục tiêu & phạm vi / Goal & scope

- **VI:** Lô / hạn dùng, serial, giữ hàng, chuyển kho hai bước, vị trí kho, FIFO; đề nghị mua, bảng giá mua, dung sai nhận hàng; phiên bản báo giá, tiền đặt cọc, chiết khấu tổng đơn; mẫu email, tùy chỉnh mẫu in, truy ngược chứng từ.
- **EN:** Lots / expiry, serials, reservations, two-step transfers, bin locations, FIFO; purchase requests, supplier price lists, receiving tolerance; quotation revisions, deposits, order-level discounts; email templates, print template customization, drill-down.
- **VI:** Cần hoàn thành P7 trước.
- **EN:** Requires P7 to be finished.

## 2. Tài liệu trong giai đoạn / Documents in this phase

| Tài liệu / Document | Nội dung (VI) | Yêu cầu / Requirements |
|---|---|---|
| [01 · Vai trò & Phân quyền / Roles & Permissions](01-roles-permissions.md) | Bổ sung các chức năng `PUR.PURCHASE_REQUEST` vào danh mục `app_functions` và các dòng quyền mặc định tương ứng. | — |
| [02 · Quản trị hệ thống / System Administration (SYS)](02-system-administration.md) | Mẫu email, tùy chỉnh mẫu in; nhập dữ liệu chạy thử; tìm kiếm & bộ lọc nâng cao; thùng rác. | FR-SYS-022, FR-SYS-030; mở rộng / extended: FR-SYS-021, FR-SYS-026, FR-SYS-028 |
| [03 · Dữ liệu danh mục / Master Data (MDM)](03-master-data.md) | Theo dõi lô / serial; tham số tồn kho; phát hiện trùng; thanh toán nhiều đợt; vị trí trong kho; địa chỉ hành chính; bảng giá nâng cao, bảng giá mua. | FR-MDM-004, FR-MDM-007, FR-MDM-013, FR-MDM-023, FR-MDM-027; mở rộng / extended: FR-MDM-018, FR-MDM-021, FR-MDM-025 |
| [04 · Bán hàng / Sales (SAL)](04-sales.md) | Phiên bản & hết hạn báo giá; giữ hàng, tồn khả dụng; tiền đặt cọc; chiết khấu tổng đơn; giá theo bậc số lượng, tiền tệ, chi nhánh; chính sách xuất hóa đơn theo sản phẩm / khách hàng; xuất hóa đơn dịch vụ theo tiến độ; so sánh kỳ. | FR-SAL-002, FR-SAL-005, FR-SAL-011, FR-SAL-015; mở rộng / extended: FR-SAL-007, FR-SAL-008, FR-SAL-010, FR-SAL-018, FR-SAL-022, FR-SAL-030 |
| [05 · Mua hàng / Purchasing (PUR)](05-purchasing.md) | Đề nghị mua (tạo, tự động, duyệt, gộp); gợi ý giá mua; ứng trước nhà cung cấp; dung sai nhận hàng; lô / serial khi nhận hàng; hiệu suất giao hàng của nhà cung cấp. | FR-PUR-001, FR-PUR-002, FR-PUR-003, FR-PUR-004, FR-PUR-008, FR-PUR-013, FR-PUR-015; mở rộng / extended: FR-PUR-007, FR-PUR-014, FR-PUR-026; BR-PUR-003 |
| [06 · Kho / Inventory (INV)](06-inventory.md) | Kho đặc biệt, chuyển kho hai bước; lô / hạn dùng, serial, gợi ý FIFO / FEFO (đưa lên P3 nếu ngành hàng bắt buộc — `Q-01`); tồn khả dụng, đang về; kiểm kê nâng cao, khóa giao dịch khi kiểm kê; tồn tối thiểu / tối đa; FIFO, đích danh. | FR-INV-009, FR-INV-010, FR-INV-012, FR-INV-016, FR-INV-017; mở rộng / extended: FR-INV-001, FR-INV-002, FR-INV-004, FR-INV-008, FR-INV-013, FR-INV-014, FR-INV-018, FR-INV-023; BR-INV-004, BR-INV-005 |
| [10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT)](10-reporting.md) | Truy ngược chứng từ; so sánh kỳ. | FR-RPT-003, FR-RPT-005; R-INV-03, R-INV-04 |

## 3. NFR bắt đầu áp dụng / NFRs starting in this phase

- **VI:** `NFR-PRV-003` — xem [12 · Yêu cầu phi chức năng](../common/12-non-functional.md).
- **EN:** `NFR-PRV-003` — see [12 · Non-functional requirements](../common/12-non-functional.md).

## 4. Điều kiện hoàn thành / Exit criteria

- **VI:** Các tính năng của giai đoạn vận hành trên ERP trong 1 tháng; tồn kho theo lô khớp với kiểm kê.
- **EN:** The phase's features run in the ERP for one month; stock by lot agrees with the physical count.
