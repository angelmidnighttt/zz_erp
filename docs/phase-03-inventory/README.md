# Giai đoạn 3 — Kho cơ bản / Phase 3 — Basic inventory

[← Mục lục / Index](../README.md) · [← P2](../phase-02-organization-master-data/README.md) · [P4 →](../phase-04-purchasing/README.md)

---

## 1. Mục tiêu & phạm vi / Goal & scope

- **VI:** Phiếu nhập, xuất, chuyển kho, kiểm kê, tồn kho theo kho, giá bình quân gia quyền, báo cáo kho; đánh số chứng từ, mẫu in mặc định; đính kèm & lưu trữ tệp (chuyển từ P2).
- **EN:** Receipts, issues, transfers, stock counts, on-hand stock per warehouse, weighted-average costing, inventory reports; document numbering, default print templates; attachments & file storage (moved from P2).
- **VI:** Cần hoàn thành P2 trước.
- **EN:** Requires P2 to be finished.

## 2. Tài liệu trong giai đoạn / Documents in this phase

| Tài liệu / Document | Nội dung (VI) | Yêu cầu / Requirements |
|---|---|---|
| [01 · Vai trò & Phân quyền / Roles & Permissions](01-roles-permissions.md) | Bổ sung các chức năng `INV.STOCK_MOVE`, `INV.STOCK_COUNT` vào danh mục `app_functions` và các dòng quyền mặc định tương ứng. | BR-ROL-004 |
| [02 · Quản trị hệ thống / System Administration (SYS)](02-system-administration.md) | Đánh số chứng từ, mẫu in mặc định; đính kèm tệp. | FR-SYS-019, FR-SYS-021, FR-SYS-023; BR-SYS-001 |
| [06 · Kho / Inventory (INV)](06-inventory.md) | Nhiều kho; phiếu nhập, phiếu xuất, chuyển kho một bước, xác nhận chứng từ; tồn thực tế theo kho; chặn xuất âm; kiểm kê cơ bản và điều chỉnh; tính giá bình quân gia quyền; báo cáo nhập – xuất – tồn. | FR-INV-001, FR-INV-002, FR-INV-003, FR-INV-004, FR-INV-006, FR-INV-008, FR-INV-011, FR-INV-013, FR-INV-014, FR-INV-015, FR-INV-018, FR-INV-019, FR-INV-023; BR-INV-001, BR-INV-002, BR-INV-003 |
| [10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT)](10-reporting.md) | Bộ lọc & nhóm dữ liệu; xuất Excel / PDF; phân quyền báo cáo; báo cáo chuẩn của từng phân hệ khi phân hệ được triển khai (mục "Danh mục báo cáo chuẩn" trong `10-reporting.md` của từng giai đoạn). | FR-RPT-002, FR-RPT-004, FR-RPT-006; R-INV-01, R-INV-02, R-INV-05 |
| [11 · Tích hợp / Integrations (INT)](11-integrations.md) | Lưu trữ tệp trên kho lưu trữ tương thích S3. | FR-INT-017 |

## 3. NFR bắt đầu áp dụng / NFRs starting in this phase

- **VI:** `NFR-PERF-004`, `NFR-PRV-005`, `NFR-USA-003`, `NFR-L10N-003`, `NFR-DAT-002` — xem [12 · Yêu cầu phi chức năng](../common/12-non-functional.md).
- **EN:** `NFR-PERF-004`, `NFR-PRV-005`, `NFR-USA-003`, `NFR-L10N-003`, `NFR-DAT-002` — see [12 · Non-functional requirements](../common/12-non-functional.md).

## 4. Điều kiện hoàn thành / Exit criteria

- **VI:** Nghiệp vụ kho chạy thông trên dữ liệu thử; báo cáo nhập – xuất – tồn khớp với số liệu tính tay.
- **EN:** Stock operations work end to end on test data; the stock movement report agrees with a manual calculation.

## 5. Ghi chú / Notes

- **VI:** Mốc nội bộ, nghiệm thu trên dữ liệu thử.
- **EN:** Internal milestone accepted on test data.
- **VI:** Từ P3 đến P6 chưa có luồng duyệt; xem quy tắc tạm thời trong [02 · Quản trị hệ thống](02-system-administration.md).
- **EN:** There are no approval flows from P3 to P6; see the interim rule in [02 · System administration](02-system-administration.md).
