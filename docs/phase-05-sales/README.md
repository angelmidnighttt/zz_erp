# Giai đoạn 5 — Bán hàng cơ bản / Phase 5 — Basic sales

[← Mục lục / Index](../README.md) · [← P4](../phase-04-purchasing/README.md) · [P6 →](../phase-06-receivables-payables-cash/README.md)

---

## 1. Mục tiêu & phạm vi / Goal & scope

- **VI:** Báo giá, đơn bán hàng, giao hàng, hóa đơn (ghi số HĐĐT phát hành trên cổng nhà cung cấp), trả hàng, báo cáo bán hàng.
- **EN:** Quotations, sales orders, deliveries, invoices (recording e-invoice numbers issued on the provider's portal), returns, sales reports.
- **VI:** Cần hoàn thành P4 trước.
- **EN:** Requires P4 to be finished.

## 2. Tài liệu trong giai đoạn / Documents in this phase

| Tài liệu / Document | Nội dung (VI) | Yêu cầu / Requirements |
|---|---|---|
| [01 · Vai trò & Phân quyền / Roles & Permissions](01-roles-permissions.md) | Bổ sung các chức năng `SAL.QUOTATION`, `SAL.SALES_ORDER`, `SAL.SALES_RETURN`, `ACC.CUSTOMER_INVOICE` vào danh mục `app_functions` và các dòng quyền mặc định tương ứng. | — |
| [04 · Bán hàng / Sales (SAL)](04-sales.md) | Báo giá (tạo, gửi PDF / email, chuyển thành đơn); đơn bán hàng lấy giá từ bảng giá, chiết khấu dòng, giá gồm / chưa gồm thuế; giao hàng nhiều lần; hóa đơn (ghi số HĐĐT phát hành trên cổng nhà cung cấp); trả hàng; báo cáo bán hàng cơ bản. Chưa có duyệt đơn: đơn được xác nhận trực tiếp. | FR-SAL-001, FR-SAL-003, FR-SAL-004, FR-SAL-006, FR-SAL-007, FR-SAL-008, FR-SAL-009, FR-SAL-010, FR-SAL-014, FR-SAL-016, FR-SAL-017, FR-SAL-018, FR-SAL-019, FR-SAL-020, FR-SAL-021, FR-SAL-022, FR-SAL-024, FR-SAL-030; BR-SAL-001, BR-SAL-002, BR-SAL-004, BR-SAL-005, BR-SAL-006 |
| [10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT)](10-reporting.md) | Báo cáo chuẩn của các phân hệ triển khai ở giai đoạn này. | R-SAL-01, R-SAL-02, R-SAL-03, R-SAL-04 |

## 3. NFR bắt đầu áp dụng / NFRs starting in this phase

- **VI:** Không có NFR mới; các NFR của giai đoạn trước vẫn áp dụng.
- **EN:** No new NFRs; those from earlier phases still apply.

## 4. Điều kiện hoàn thành / Exit criteria

- **VI:** Luồng báo giá → đơn bán → giao hàng → hóa đơn → trả hàng chạy thông trên dữ liệu thử.
- **EN:** The quotation → order → delivery → invoice → return flow works end to end on test data.

## 5. Ghi chú / Notes

- **VI:** Mốc nội bộ, nghiệm thu trên dữ liệu thử.
- **EN:** Internal milestone accepted on test data.
