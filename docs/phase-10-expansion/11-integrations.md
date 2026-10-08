# 11 · Tích hợp / Integrations (INT) — Giai đoạn 10 / Phase 10

[← Giai đoạn 10 · Mở rộng / Phase 10 · Expansion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/11-integrations.md) · [P7](../phase-07-approvals-controls/11-integrations.md) · [P9](../phase-09-accounting-einvoicing/11-integrations.md) · [P11](../phase-11-advanced/11-integrations.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Mã QR VietQR; tra cứu mã số thuế; máy chấm công; REST API công khai.
- **EN:** VietQR codes; tax ID lookup; time clocks; public REST API.

## 1. Tổng quan tích hợp / Integration overview

| Mã / ID | Hệ thống (VI) | System (EN) | Hướng / Direction | Ưu tiên / Priority | Giai đoạn / Phase |
|---|---|---|---|---|---|
| FR-INT-005 | Mã QR chuyển khoản (VietQR) | Payment QR codes (VietQR) | ERP → chứng từ / documents | Should | P10 |
| FR-INT-009 | Tra cứu mã số thuế | Tax ID lookup | Ngoài / External → ERP | Should | P10 |
| FR-INT-010 | Máy chấm công | Time clocks | Thiết bị / Device → ERP | Should | P10 |
| FR-INT-014 | REST API công khai | Public REST API | Hai chiều / Two-way | Should | P10 |

## 2. Yêu cầu chức năng / Functional requirements

**Ngân hàng & thanh toán / Banking & payments**

#### FR-INT-005 · Mã QR chuyển khoản / Payment QR codes
`Should` · `P10`

- **VI:** In mã QR chuyển khoản theo chuẩn VietQR trên báo giá, hóa đơn, thông báo nợ, với nội dung chuyển khoản chứa số chứng từ để tự động đối soát.
- **EN:** Print VietQR transfer codes on quotations, invoices and statements, with the transfer description containing the document number for automatic matching.

**Dữ liệu tham chiếu / Reference data**

#### FR-INT-009 · Tra cứu mã số thuế / Tax ID lookup
`Should` · `P10`

- **VI:** Tra cứu tên, địa chỉ, trạng thái hoạt động của doanh nghiệp theo mã số thuế qua dịch vụ hợp pháp; tự điền vào hồ sơ đối tác.
- **EN:** Look up company name, address and operating status by tax ID through a lawful service; pre-fill partner records.

**Thiết bị & kênh kinh doanh / Devices & sales channels**

#### FR-INT-010 · Máy chấm công / Time clocks
`Should` · `P10`

- **VI:** Nhập dữ liệu chấm công từ máy chấm công (qua file hoặc SDK / API của hãng) vào phân hệ Nhân sự.
- **EN:** Import attendance data from time clocks (via file or vendor SDK / API) into the HR module.

**Thuế, API & hạ tầng / Tax, API & infrastructure**

#### FR-INT-014 · REST API công khai / Public REST API
`Should` · `P10`

- **VI:** Cung cấp REST API có phiên bản (`/api/v1`), tài liệu OpenAPI; xác thực bằng OAuth2 client credentials hoặc API key; phân quyền theo phạm vi (scope); giới hạn tần suất gọi.
- **EN:** Provide a versioned REST API (`/api/v1`) with OpenAPI docs; authenticate via OAuth2 client credentials or API keys; scope-based authorization; rate limiting.
