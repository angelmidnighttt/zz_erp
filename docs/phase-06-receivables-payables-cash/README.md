# Giai đoạn 6 — Công nợ & thu chi / Phase 6 — Receivables, payables & cash

[← Mục lục / Index](../README.md) · [← P5](../phase-05-sales/README.md) · [P7 →](../phase-07-approvals-controls/README.md)

---

## 1. Mục tiêu & phạm vi / Goal & scope

- **VI:** Số dư đầu kỳ; nhập / xuất Excel và chuyển đổi dữ liệu từ hệ thống cũ (chuyển từ P2); công nợ phải thu / phải trả, thu tiền & cấn trừ, tuổi nợ; phiếu thu / chi, giao dịch ngân hàng, sổ quỹ & sổ tiền gửi. Sổ cái, thuế, BCTC vẫn làm trên phần mềm kế toán hiện tại.
- **EN:** Opening balances; Excel import / export and legacy data migration (moved from P2); AR / AP, receipts & allocation, aging; cash receipts / payments, bank transactions, cash & bank books. GL, tax and financial statements stay in the current accounting software.
- **VI:** Cần hoàn thành P5 trước.
- **EN:** Requires P5 to be finished.

## 2. Tài liệu trong giai đoạn / Documents in this phase

| Tài liệu / Document | Nội dung (VI) | Yêu cầu / Requirements |
|---|---|---|
| [01 · Vai trò & Phân quyền / Roles & Permissions](01-roles-permissions.md) | Bổ sung các chức năng `ACC.CASH_VOUCHER`, `ACC.BANK_TXN` vào danh mục `app_functions` và các dòng quyền mặc định tương ứng. | — |
| [02 · Quản trị hệ thống / System Administration (SYS)](02-system-administration.md) | Nhập dữ liệu từ Excel (danh mục, số dư đầu kỳ), xuất dữ liệu. | FR-SYS-026, FR-SYS-027 |
| [07 · Kế toán – Tài chính / Accounting & Finance (ACC)](07-accounting-finance.md) | Số dư đầu kỳ công nợ, tồn kho, tiền; công nợ phải thu / phải trả theo hóa đơn, thu tiền & cấn trừ, tuổi nợ; phiếu thu / chi, giao dịch ngân hàng, chuyển tiền nội bộ, sổ quỹ & sổ tiền gửi; ghi nhận ngoại tệ theo tỷ giá giao dịch. Sổ cái, thuế, BCTC tạm thời vẫn làm trên phần mềm kế toán hiện tại. | FR-ACC-004, FR-ACC-012, FR-ACC-013, FR-ACC-014, FR-ACC-015, FR-ACC-020, FR-ACC-024, FR-ACC-025, FR-ACC-026, FR-ACC-028 |
| [10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT)](10-reporting.md) | Báo cáo chuẩn của các phân hệ triển khai ở giai đoạn này. | R-ACC-04, R-ACC-06 |

## 3. NFR bắt đầu áp dụng / NFRs starting in this phase

- **VI:** `NFR-PERF-001`, `NFR-PERF-002`, `NFR-PERF-003`, `NFR-PERF-005`, `NFR-SCL-002`, `NFR-AVL-001`, `NFR-AVL-002`, `NFR-AVL-003`, `NFR-AVL-004`, `NFR-AVL-005`, `NFR-PRV-004`, `NFR-USA-002`, `NFR-USA-005`, `NFR-OBS-002`, `NFR-SUP-001`, `NFR-SUP-002`, `NFR-DAT-004` — xem [12 · Yêu cầu phi chức năng](../common/12-non-functional.md).
- **EN:** `NFR-PERF-001`, `NFR-PERF-002`, `NFR-PERF-003`, `NFR-PERF-005`, `NFR-SCL-002`, `NFR-AVL-001`, `NFR-AVL-002`, `NFR-AVL-003`, `NFR-AVL-004`, `NFR-AVL-005`, `NFR-PRV-004`, `NFR-USA-002`, `NFR-USA-005`, `NFR-OBS-002`, `NFR-SUP-001`, `NFR-SUP-002`, `NFR-DAT-004` — see [12 · Non-functional requirements](../common/12-non-functional.md).

## 4. Điều kiện hoàn thành / Exit criteria

- **VI:** Danh mục và số dư đầu kỳ từ hệ thống cũ được nhập qua mẫu Excel và đối chiếu khớp (`NFR-DAT-004`); mua – bán – kho – công nợ – thu chi vận hành trên ERP trong 1 tháng; tồn kho và công nợ khớp với kiểm kê và đối chiếu.
- **EN:** Legacy master data and opening balances are imported through the Excel templates and reconciled (`NFR-DAT-004`); purchasing, sales, inventory, AR/AP and cash run in the ERP for one month; stock and balances agree with the physical count and reconciliations.

## 5. Ghi chú / Notes

- **VI:** **Go-live vận hành.** Sổ cái, thuế, BCTC vẫn làm trên phần mềm kế toán hiện tại đến P9. Cần chốt `Q-13` trong [00 · Tổng quan](../common/00-overview.md): có chấp nhận go-live khi chưa có luồng duyệt (P7) không.
- **EN:** **Operations go-live.** GL, tax and financial statements stay in the current accounting software until P9. `Q-13` in [00 · Overview](../common/00-overview.md) must be settled: is go-live acceptable before approval flows (P7)?
