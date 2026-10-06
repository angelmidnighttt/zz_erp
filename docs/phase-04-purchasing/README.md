# Giai đoạn 4 — Mua hàng cơ bản / Phase 4 — Basic purchasing

[← Mục lục / Index](../README.md) · [← P3](../phase-03-inventory/README.md) · [P5 →](../phase-05-sales/README.md)

---

## 1. Mục tiêu & phạm vi / Goal & scope

- **VI:** Đơn mua, nhận hàng theo đơn mua, hóa đơn nhà cung cấp, trả hàng nhà cung cấp, báo cáo mua hàng.
- **EN:** Purchase orders, receiving against POs, vendor bills, supplier returns, purchasing reports.
- **VI:** Cần hoàn thành P3 trước.
- **EN:** Requires P3 to be finished.

## 2. Tài liệu trong giai đoạn / Documents in this phase

| Tài liệu / Document | Nội dung (VI) | Yêu cầu / Requirements |
|---|---|---|
| [01 · Vai trò & Phân quyền / Roles & Permissions](01-roles-permissions.md) | Bổ sung các chức năng `PUR.PURCHASE_ORDER`, `ACC.VENDOR_BILL` vào danh mục `app_functions` và các dòng quyền mặc định tương ứng. | — |
| [05 · Mua hàng / Purchasing (PUR)](05-purchasing.md) | Đơn mua lập trực tiếp, gửi PDF / email, theo dõi; nhận hàng theo đơn mua; ghi nhận hóa đơn nhà cung cấp, chống trùng hóa đơn; trả hàng nhà cung cấp; báo cáo mua hàng cơ bản. Chưa có duyệt đơn mua: người lập xác nhận đơn trực tiếp. | FR-PUR-007, FR-PUR-010, FR-PUR-011, FR-PUR-014, FR-PUR-017, FR-PUR-020, FR-PUR-024, FR-PUR-026; BR-PUR-002, BR-PUR-004 |
| [10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT)](10-reporting.md) | Báo cáo chuẩn của các phân hệ triển khai ở giai đoạn này. | R-PUR-01, R-PUR-02, R-PUR-03, R-PUR-04 |

## 3. NFR bắt đầu áp dụng / NFRs starting in this phase

- **VI:** Không có NFR mới; các NFR của giai đoạn trước vẫn áp dụng.
- **EN:** No new NFRs; those from earlier phases still apply.

## 4. Điều kiện hoàn thành / Exit criteria

- **VI:** Luồng đơn mua → nhận hàng → hóa đơn NCC → trả hàng chạy thông trên dữ liệu thử.
- **EN:** The PO → receipt → vendor bill → return flow works end to end on test data.

## 5. Ghi chú / Notes

- **VI:** Mốc nội bộ, nghiệm thu trên dữ liệu thử.
- **EN:** Internal milestone accepted on test data.
