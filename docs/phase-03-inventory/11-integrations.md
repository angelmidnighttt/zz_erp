# 11 · Tích hợp / Integrations (INT) — Giai đoạn 3 / Phase 3

[← Giai đoạn 3 · Kho cơ bản / Phase 3 · Basic inventory](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/11-integrations.md) · [P7](../phase-07-approvals-controls/11-integrations.md) · [P9](../phase-09-accounting-einvoicing/11-integrations.md) · [P10](../phase-10-expansion/11-integrations.md) · [P11](../phase-11-advanced/11-integrations.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Lưu trữ tệp (chuyển từ [P2](../phase-02-organization-master-data/11-integrations.md)), phục vụ đính kèm (`FR-SYS-023`), logo doanh nghiệp và bản in (`FR-SYS-021`).
- **EN:** File storage (moved from [P2](../phase-02-organization-master-data/11-integrations.md)), serving attachments (`FR-SYS-023`), the company logo and printouts (`FR-SYS-021`).

## 1. Yêu cầu chức năng / Functional requirements

**Thuế, API & hạ tầng / Tax, API & infrastructure**

#### FR-INT-017 · Lưu trữ tệp / File storage
`Must` · `P3`

- **VI:** Lưu tệp đính kèm, XML / PDF hóa đơn, bản in trên kho lưu trữ đối tượng tương thích S3, có mã hóa và sao lưu.
- **EN:** Store attachments, invoice XML / PDF and printouts on S3-compatible object storage with encryption and backup.

## 2. Mô hình dữ liệu / Data model

- **VI:** Không đổi lược đồ: dùng bảng `stored_files` đã tạo ở [P2](../phase-02-organization-master-data/11-integrations.md). Tệp nhị phân nằm trên kho lưu trữ; cơ sở dữ liệu chỉ giữ siêu dữ liệu.
- **EN:** No schema change: uses the `stored_files` table created in [P2](../phase-02-organization-master-data/11-integrations.md). Binary files live in the object storage; the database only holds metadata.
