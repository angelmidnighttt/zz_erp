# Giai đoạn 10 — Mở rộng / Phase 10 — Expansion

[← Mục lục / Index](../README.md) · [← P9](../phase-09-accounting-einvoicing/README.md) · [P11 →](../phase-11-advanced/README.md)

---

## 1. Mục tiêu & phạm vi / Goal & scope

- **VI:** HRM, CRM, TSCĐ & CCDC, khuyến mãi, yêu cầu báo giá, quét mã vạch, dashboard nâng cao, REST API công khai.
- **EN:** HRM, CRM, fixed assets & tools, promotions, RFQs, barcode scanning, advanced dashboards, public REST API.
- **VI:** Cần hoàn thành P9 trước.
- **EN:** Requires P9 to be finished.

## 2. Tài liệu trong giai đoạn / Documents in this phase

| Tài liệu / Document | Nội dung (VI) | Yêu cầu / Requirements |
|---|---|---|
| [01 · Vai trò & Phân quyền / Roles & Permissions](01-roles-permissions.md) | Bổ sung các chức năng `HRM.EMPLOYEE`, `HRM.PAYROLL` vào danh mục `app_functions` và các dòng quyền mặc định tương ứng. | — |
| [02 · Quản trị hệ thống / System Administration (SYS)](02-system-administration.md) | Ủy quyền duyệt; bình luận & nhắc tên; duyệt song song. | FR-SYS-017, FR-SYS-024 |
| [04 · Bán hàng / Sales (SAL)](04-sales.md) | Chương trình khuyến mãi; báo giá cho lead từ CRM. | FR-SAL-027; mở rộng / extended: FR-SAL-001 |
| [05 · Mua hàng / Purchasing (PUR)](05-purchasing.md) | Yêu cầu báo giá & so sánh báo giá. | FR-PUR-005, FR-PUR-006; mở rộng / extended: FR-PUR-007; BR-PUR-006 |
| [06 · Kho / Inventory (INV)](06-inventory.md) | Quét mã vạch. | FR-INV-007; mở rộng / extended: FR-INV-014 |
| [07 · Kế toán – Tài chính / Accounting & Finance (ACC)](07-accounting-finance.md) | Nhắc nợ; tài sản cố định & công cụ dụng cụ. | FR-ACC-018, FR-ACC-033, FR-ACC-034, FR-ACC-035, FR-ACC-036 |
| [08 · Nhân sự – Tiền lương / HR & Payroll (HRM)](08-hr-payroll.md) | Hồ sơ nhân viên, hợp đồng lao động; ca làm việc, nhập dữ liệu chấm công, làm thêm giờ, nghỉ phép, bảng công; thành phần lương, bảo hiểm, thuế TNCN, tính lương & phiếu lương, hạch toán lương, file chi lương, báo cáo. | FR-HRM-001, FR-HRM-003, FR-HRM-005, FR-HRM-006, FR-HRM-007, FR-HRM-008, FR-HRM-009, FR-HRM-010, FR-HRM-011, FR-HRM-012, FR-HRM-013, FR-HRM-014, FR-HRM-015, FR-HRM-016; BR-HRM-001, BR-HRM-002, BR-HRM-003, BR-HRM-004 |
| [09 · Quản lý quan hệ khách hàng / CRM](09-crm.md) | Khách hàng tiềm năng, phân bổ, chuyển đổi; cơ hội & pipeline; hoạt động & lịch hẹn; hồ sơ khách hàng 360°; báo cáo CRM. | FR-CRM-001, FR-CRM-003, FR-CRM-004, FR-CRM-005, FR-CRM-006, FR-CRM-007, FR-CRM-010; BR-CRM-001, BR-CRM-002 |
| [10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT)](10-reporting.md) | Dashboard nâng cao. | mở rộng / extended: FR-RPT-001; R-ACC-12, R-HRM-01, R-HRM-02, R-CRM-01 |
| [11 · Tích hợp / Integrations (INT)](11-integrations.md) | Mã QR VietQR; tra cứu mã số thuế; máy chấm công; REST API công khai. | FR-INT-005, FR-INT-009, FR-INT-010, FR-INT-014 |

## 3. NFR bắt đầu áp dụng / NFRs starting in this phase

- **VI:** Không có NFR mới; các NFR của giai đoạn trước vẫn áp dụng.
- **EN:** No new NFRs; those from earlier phases still apply.

## 4. Điều kiện hoàn thành / Exit criteria

- **VI:** Tính lương 1 kỳ trên ERP; dashboard điều hành được ban giám đốc sử dụng.
- **EN:** One payroll run in the ERP; executive dashboard in use by management.
