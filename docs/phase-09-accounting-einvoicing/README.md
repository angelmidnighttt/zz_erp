# Giai đoạn 9 — Kế toán đầy đủ & HĐĐT / Phase 9 — Full accounting & e-invoicing

[← Mục lục / Index](../README.md) · [← P8](../phase-08-operations-completion/README.md) · [P10 →](../phase-10-expansion/README.md)

---

## 1. Mục tiêu & phạm vi / Goal & scope

- **VI:** Hệ thống tài khoản, hạch toán tự động, bút toán, kết chuyển, khóa sổ; chênh lệch tỷ giá; đối chiếu 3 chiều, chi phí mua hàng, hàng nhập khẩu; đề nghị thanh toán, tạm ứng, đối chiếu ngân hàng; thuế GTGT, BCTC; tích hợp HĐĐT; dashboard theo vai trò.
- **EN:** Chart of accounts, automatic posting, journal entries, closing entries, period lock; FX differences; 3-way match, landed cost, imports; payment requests, advances, bank reconciliation; VAT, financial statements; e-invoice integration; role-based dashboards.
- **VI:** Cần hoàn thành P8 trước.
- **EN:** Requires P8 to be finished.

## 2. Tài liệu trong giai đoạn / Documents in this phase

| Tài liệu / Document | Nội dung (VI) | Yêu cầu / Requirements |
|---|---|---|
| [01 · Vai trò & Phân quyền / Roles & Permissions](01-roles-permissions.md) | Bổ sung các chức năng `ACC.JOURNAL_ENTRY`, `ACC.PERIOD_CLOSE`, `ACC.FIN_STATEMENT`, `RPT.EXEC_DASHBOARD` vào danh mục `app_functions` và các dòng quyền mặc định tương ứng. | — |
| [02 · Quản trị hệ thống / System Administration (SYS)](02-system-administration.md) | Mẫu biên bản đối chiếu công nợ. | mở rộng / extended: FR-SYS-021 |
| [03 · Dữ liệu danh mục / Master Data (MDM)](03-master-data.md) | Tài khoản kế toán mặc định. | FR-MDM-006 |
| [04 · Bán hàng / Sales (SAL)](04-sales.md) | Phát hành HĐĐT từ ERP, hóa đơn điều chỉnh / thay thế; giảm giá sau bán. | FR-SAL-023, FR-SAL-025, FR-SAL-026; mở rộng / extended: FR-SAL-021 |
| [05 · Mua hàng / Purchasing (PUR)](05-purchasing.md) | Nhập XML hóa đơn đầu vào; đối chiếu 3 chiều; hàng về chưa có hóa đơn / hàng mua đang đi đường; chi phí mua hàng, hàng nhập khẩu. | FR-PUR-018, FR-PUR-019, FR-PUR-021, FR-PUR-022, FR-PUR-023 |
| [06 · Kho / Inventory (INV)](06-inventory.md) | Hạch toán tự động, điều chỉnh giá trị tồn; phiếu xuất kho kiêm vận chuyển nội bộ điện tử. | FR-INV-020, FR-INV-021; mở rộng / extended: FR-INV-002, FR-INV-004, FR-INV-015, FR-INV-019 |
| [07 · Kế toán – Tài chính / Accounting & Finance (ACC)](07-accounting-finance.md) | Hệ thống tài khoản, cấu hình hạch toán & bút toán tự động, bút toán thủ công / định kỳ / đảo, kết chuyển, khóa sổ; chiều phân tích; chênh lệch tỷ giá; đối chiếu & bù trừ công nợ; đề nghị thanh toán, lịch thanh toán, tạm ứng; ủy nhiệm chi, sao kê & đối chiếu ngân hàng; thuế GTGT, quản lý hóa đơn đầu ra; BCTC, sổ kế toán, báo cáo quản trị. | FR-ACC-001, FR-ACC-003, FR-ACC-005, FR-ACC-006, FR-ACC-007, FR-ACC-008, FR-ACC-009, FR-ACC-010, FR-ACC-011, FR-ACC-016, FR-ACC-017, FR-ACC-021, FR-ACC-022, FR-ACC-023, FR-ACC-027, FR-ACC-029, FR-ACC-030, FR-ACC-031, FR-ACC-038, FR-ACC-039, FR-ACC-040, FR-ACC-041; mở rộng / extended: FR-ACC-002, FR-ACC-004, FR-ACC-012, FR-ACC-020, FR-ACC-025; BR-ACC-001, BR-ACC-002, BR-ACC-003, BR-ACC-004, BR-ACC-005, BR-ACC-006, BR-ACC-007 |
| [10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT)](10-reporting.md) | Dashboard theo vai trò. | FR-RPT-001; R-ACC-01, R-ACC-02, R-ACC-03, R-ACC-05, R-ACC-07, R-ACC-08, R-ACC-09, R-ACC-10, R-ACC-11 |
| [11 · Tích hợp / Integrations (INT)](11-integrations.md) | Tích hợp nhà cung cấp HĐĐT; HĐĐT đầu vào; nhập sao kê ngân hàng; xuất dữ liệu kê khai thuế; nhật ký tích hợp, chống trùng lặp, hàng đợi. | FR-INT-001, FR-INT-002, FR-INT-003, FR-INT-013, FR-INT-018, FR-INT-019, FR-INT-020 |

## 3. NFR bắt đầu áp dụng / NFRs starting in this phase

- **VI:** Không có NFR mới; các NFR của giai đoạn trước vẫn áp dụng.
- **EN:** No new NFRs; those from earlier phases still apply.

## 4. Điều kiện hoàn thành / Exit criteria

- **VI:** Vận hành song song 1 kỳ kế toán và khóa sổ thành công trên ERP; HĐĐT phát hành trực tiếp từ ERP.
- **EN:** One accounting period run in parallel and closed successfully in the ERP; e-invoices issued directly from the ERP.

## 5. Ghi chú / Notes

- **VI:** **Go-live kế toán.**
- **EN:** **Accounting go-live.**
