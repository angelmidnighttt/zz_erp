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

## 5. Mô hình dữ liệu / Data model

- **VI:** Tệp nhị phân nằm trên kho lưu trữ S3; cơ sở dữ liệu chỉ giữ siêu dữ liệu. Đây là khối DDL đầu tiên của P2 (các bảng khác của P2 tham chiếu `stored_files`).
- **EN:** Binary files live in S3-compatible storage; the database only holds metadata. This is the first DDL block of P2 (other P2 tables reference `stored_files`).

| Bảng / Table | Mục đích (VI) | Purpose (EN) |
|---|---|---|
| `stored_files` | Siêu dữ liệu của mọi tệp trên kho lưu trữ: đính kèm, logo, XML / PDF hóa đơn, bản in (`FR-INT-017`). | Metadata of every stored object: attachments, logo, invoice XML / PDF, printouts (`FR-INT-017`). |
| `integration_credentials` | Thông tin xác thực bên thứ ba, phần bí mật mã hóa ở tầng ứng dụng; API không bao giờ trả lại (`FR-INT-021`). | Third-party credentials, with the secret encrypted in the application layer and never returned by the API (`FR-INT-021`). |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: P1

CREATE TABLE stored_files (
  id               uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_bucket   varchar(63)  NOT NULL,
  storage_key      varchar(500) NOT NULL,          -- khóa đối tượng / object key
  original_name    varchar(255) NOT NULL,
  content_type     varchar(100) NOT NULL,
  size_bytes       bigint       NOT NULL CHECK (size_bytes >= 0),
  checksum_sha256  char(64)     NOT NULL,
  is_encrypted     boolean      NOT NULL DEFAULT true,  -- mã hóa phía máy chủ / server-side encryption
  created_at       timestamptz  NOT NULL DEFAULT now(),
  created_by       uuid         REFERENCES users(id),
  updated_at       timestamptz  NOT NULL DEFAULT now(),
  updated_by       uuid         REFERENCES users(id),
  UNIQUE (storage_bucket, storage_key)
);

-- secret_ciphertext: AES-256-GCM, khóa lấy từ KMS / biến môi trường, không lưu trong DB
-- secret_ciphertext: AES-256-GCM with the key from KMS / environment, never stored in the DB
CREATE TABLE integration_credentials (
  id                 uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_code      varchar(50)  NOT NULL,         -- vd / e.g. 'SMTP', 'EINVOICE_VNPT'
  name               varchar(150) NOT NULL,
  config             jsonb        NOT NULL DEFAULT '{}',  -- tham số không bí mật / non-secret settings
  secret_ciphertext  bytea        NOT NULL,
  secret_key_id      varchar(100) NOT NULL,         -- phục vụ xoay khóa / for key rotation
  secret_hint        varchar(20),                   -- vd 4 ký tự cuối / e.g. last 4 characters
  is_active          boolean      NOT NULL DEFAULT true,
  version            integer      NOT NULL DEFAULT 1,
  created_at         timestamptz  NOT NULL DEFAULT now(),
  created_by         uuid         REFERENCES users(id),
  updated_at         timestamptz  NOT NULL DEFAULT now(),
  updated_by         uuid         REFERENCES users(id),
  UNIQUE (provider_code, name)
);
```

</details>

## 6. Câu hỏi mở / Open questions

| # | Câu hỏi (VI) | Question (EN) |
|---|---|---|
| Q-INT-01 | Nhà cung cấp HĐĐT hiện tại và tài liệu API của họ? | Current e-invoice provider and its API documentation? |
| Q-INT-02 | Doanh nghiệp đang bán trên những sàn TMĐT nào, sản lượng đơn / ngày? | Which marketplaces are used, and how many orders per day? |
| Q-INT-03 | Có hệ thống nội bộ nào khác cần kết nối (website, phần mềm cũ)? | Any other internal systems to connect (website, legacy software)? |
