# 11 · Tích hợp / Integrations (INT) — Giai đoạn 9 / Phase 9

[← Giai đoạn 9 · Kế toán đầy đủ & HĐĐT / Phase 9 · Full accounting & e-invoicing](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/11-integrations.md) · [P7](../phase-07-approvals-controls/11-integrations.md) · [P10](../phase-10-expansion/11-integrations.md) · [P11](../phase-11-advanced/11-integrations.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Tích hợp nhà cung cấp HĐĐT; HĐĐT đầu vào; nhập sao kê ngân hàng; xuất dữ liệu kê khai thuế; nhật ký tích hợp, chống trùng lặp, hàng đợi.
- **EN:** E-invoice provider integration; inbound e-invoices; bank statement import; tax filing export; integration log, idempotency, queues.

## 1. Tổng quan tích hợp / Integration overview

| Mã / ID | Hệ thống (VI) | System (EN) | Hướng / Direction | Ưu tiên / Priority | Giai đoạn / Phase |
|---|---|---|---|---|---|
| FR-INT-001 | Nhà cung cấp hóa đơn điện tử | E-invoice provider | ERP → NCC / provider | Must | P9 |
| FR-INT-002 | Hóa đơn điện tử đầu vào | Inbound e-invoices | Ngoài / External → ERP | Should | P9 |
| FR-INT-003 | Sao kê ngân hàng (file) | Bank statements (file) | Ngân hàng / Bank → ERP | Should | P9 |
| FR-INT-013 | Kê khai thuế (XML) | Tax filing (XML) | ERP → file | Should | P9 |

## 2. Yêu cầu chức năng / Functional requirements

**Hóa đơn điện tử / E-invoicing**

#### FR-INT-001 · Tích hợp nhà cung cấp hóa đơn điện tử / E-invoice provider integration
`Must` · `P9`

- **VI:** Tích hợp qua API với ít nhất một nhà cung cấp dịch vụ hóa đơn điện tử; thiết kế theo mô hình adapter để thay hoặc thêm nhà cung cấp mà không sửa nghiệp vụ. Hỗ trợ: phát hành hóa đơn (có mã / không có mã của cơ quan thuế), ký số, gửi khách hàng, tra cứu trạng thái, hủy, điều chỉnh, thay thế, thông báo hóa đơn có sai sót, phiếu xuất kho kiêm vận chuyển nội bộ điện tử; lưu bản XML và PDF trên ERP.
- **EN:** Integrate via API with at least one e-invoice provider; use an adapter pattern so providers can be replaced or added without changing business logic. Support: issuing invoices (with / without tax authority code), digital signing, sending to customers, status lookup, cancellation, adjustment, replacement, erroneous-invoice notification, electronic internal transfer notes; store XML and PDF copies in the ERP.

#### FR-INT-002 · Hóa đơn điện tử đầu vào / Inbound e-invoices
`Should` · `P9`

- **VI:** Nhận hóa đơn đầu vào qua email hoặc tải file XML; đồng bộ danh sách hóa đơn mua vào từ cổng hóa đơn điện tử của cơ quan thuế (trực tiếp hoặc qua nhà cung cấp, tùy khả năng kỹ thuật và pháp lý); đối chiếu với hóa đơn đã ghi nhận để phát hiện hóa đơn thiếu hoặc sai lệch.
- **EN:** Receive inbound invoices via email or XML upload; sync the list of purchase invoices from the tax authority's e-invoice portal (directly or via a provider, subject to technical and legal feasibility); reconcile with recorded bills to detect missing or mismatched invoices.

**Ngân hàng & thanh toán / Banking & payments**

#### FR-INT-003 · Nhập sao kê ngân hàng / Bank statement import
`Should` · `P9`

- **VI:** Nhập sao kê theo định dạng của từng ngân hàng (Excel, CSV, MT940) với bộ ánh xạ cột cấu hình được; phục vụ đối chiếu ngân hàng (`FR-ACC-027`).
- **EN:** Import statements in each bank's format (Excel, CSV, MT940) with configurable column mappings; feeds bank reconciliation (`FR-ACC-027`).

**Thuế, API & hạ tầng / Tax, API & infrastructure**

#### FR-INT-013 · Xuất dữ liệu kê khai thuế / Tax filing export
`Should` · `P9`

- **VI:** Xuất tờ khai và bảng kê theo định dạng XML của phần mềm hỗ trợ kê khai thuế hiện hành (`FR-ACC-030`).
- **EN:** Export returns and listings in the XML format of the current tax filing software (`FR-ACC-030`).

## 3. Yêu cầu chung cho tích hợp / General integration requirements

| Mã / ID | Yêu cầu (VI) | Requirement (EN) | Ưu tiên / Priority |
|---|---|---|---|
| FR-INT-018 | Nhật ký tích hợp: lưu yêu cầu / phản hồi (che dữ liệu nhạy cảm), trạng thái, số lần thử; màn hình theo dõi và xử lý lỗi. | Integration log: store requests / responses (sensitive data masked), status, attempts; monitoring and error-handling screen. | Must · P9 |
| FR-INT-019 | Chống trùng lặp (idempotency): một chứng từ không bao giờ được phát hành hai lần khi gửi lại. | Idempotency: a document must never be issued twice on retry. | Must · P9 |
| FR-INT-020 | Xử lý bất đồng bộ qua hàng đợi, thử lại có giãn cách tăng dần; thông báo cho người phụ trách khi lỗi kéo dài. | Asynchronous processing via queues, retries with exponential backoff; alert the owner on persistent failures. | Must · P9 |
