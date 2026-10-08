# 11 · Tích hợp / Integrations (INT) — Giai đoạn 2 / Phase 2

[← Giai đoạn 2 · Tổ chức & danh mục / Phase 2 · Organization & master data](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P7](../phase-07-approvals-controls/11-integrations.md) · [P9](../phase-09-accounting-einvoicing/11-integrations.md) · [P10](../phase-10-expansion/11-integrations.md) · [P11](../phase-11-advanced/11-integrations.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Lưu trữ tệp. Gửi email (cho quên mật khẩu) chuyển sang [P7](../phase-07-approvals-controls/11-integrations.md).
- **EN:** File storage. Email sending (for forgot password) moved to [P7](../phase-07-approvals-controls/11-integrations.md).

## 1. Mục tiêu / Objectives

- **VI:** Kết nối ERP với các hệ thống bên ngoài bắt buộc (hóa đơn điện tử, ngân hàng, email) và các kênh kinh doanh; giảm nhập liệu thủ công; bảo đảm dữ liệu trao đổi an toàn, không trùng lặp và truy vết được.
- **EN:** Connect the ERP to mandatory external systems (e-invoicing, banks, email) and business channels; reduce manual data entry; ensure exchanged data is secure, deduplicated and traceable.

## 2. Tổng quan tích hợp / Integration overview

| Mã / ID | Hệ thống (VI) | System (EN) | Hướng / Direction | Ưu tiên / Priority | Giai đoạn / Phase |
|---|---|---|---|---|---|
| FR-INT-017 | Lưu trữ tệp | File storage | ERP → kho lưu trữ / storage | Must | P2 |

## 3. Yêu cầu chức năng / Functional requirements

**Thuế, API & hạ tầng / Tax, API & infrastructure**

#### FR-INT-017 · Lưu trữ tệp / File storage
`Must` · `P2`

- **VI:** Lưu tệp đính kèm, XML / PDF hóa đơn, bản in trên kho lưu trữ đối tượng tương thích S3, có mã hóa và sao lưu.
- **EN:** Store attachments, invoice XML / PDF and printouts on S3-compatible object storage with encryption and backup.

## 4. Yêu cầu chung cho tích hợp / General integration requirements

| Mã / ID | Yêu cầu (VI) | Requirement (EN) | Ưu tiên / Priority |
|---|---|---|---|
| FR-INT-021 | Thông tin xác thực của bên thứ ba được lưu mã hóa, không hiển thị lại sau khi nhập. | Third-party credentials are stored encrypted and never displayed after entry. | Must · P2 |

## 5. Câu hỏi mở / Open questions

| # | Câu hỏi (VI) | Question (EN) |
|---|---|---|
| Q-INT-01 | Nhà cung cấp HĐĐT hiện tại và tài liệu API của họ? | Current e-invoice provider and its API documentation? |
| Q-INT-02 | Doanh nghiệp đang bán trên những sàn TMĐT nào, sản lượng đơn / ngày? | Which marketplaces are used, and how many orders per day? |
| Q-INT-03 | Có hệ thống nội bộ nào khác cần kết nối (website, phần mềm cũ)? | Any other internal systems to connect (website, legacy software)? |
