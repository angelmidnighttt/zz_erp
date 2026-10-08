# 11 · Tích hợp / Integrations (INT) — Giai đoạn 10 / Phase 10

[← Giai đoạn 10 · Mở rộng / Phase 10 · Expansion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/11-integrations.md) · [P3](../phase-03-inventory/11-integrations.md) · [P7](../phase-07-approvals-controls/11-integrations.md) · [P9](../phase-09-accounting-einvoicing/11-integrations.md) · [P11](../phase-11-advanced/11-integrations.md)

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

## 3. Mô hình dữ liệu / Data model

- **VI:** Mã VietQR được sinh khi in từ mã BIN ngân hàng của tài khoản nhận và nội dung chứa số chứng từ; không lưu ảnh QR (`FR-INT-005`). Kết quả tra cứu mã số thuế được lưu đệm và cập nhật `partners.tax_status`, dùng cho cảnh báo `BR-PUR-006` (`FR-INT-009`). Máy chấm công ánh xạ mã chấm công trên thiết bị với nhân viên (`FR-INT-010`). Ứng dụng gọi REST API công khai được cấp `api_clients` với phạm vi (scope) và giới hạn tần suất; bí mật chỉ lưu dạng băm (`FR-INT-014`).
- **EN:** VietQR codes are generated at print time from the receiving account's bank BIN and a description containing the document number; QR images are not stored (`FR-INT-005`). Tax ID lookup results are cached and update `partners.tax_status`, which drives the `BR-PUR-006` warning (`FR-INT-009`). Time clocks map device user codes to employees (`FR-INT-010`). Applications calling the public REST API get `api_clients` with scopes and rate limits; secrets are stored hashed only (`FR-INT-014`).

| Bảng / Table | Mục đích (VI) | Purpose (EN) |
|---|---|---|
| `company_bank_accounts.bank_bin`, `vietqr_enabled` | Thông tin sinh mã VietQR. | VietQR generation data. |
| `tax_lookup_cache`, `partners.tax_status` | Kết quả tra cứu và trạng thái mã số thuế đối tác. | Lookup results and partner tax status. |
| `attendance_devices`, `attendance_device_users` | Máy chấm công và ánh xạ mã chấm công ↔ nhân viên. | Time clocks and device user code ↔ employee mapping. |
| `api_clients` | Ứng dụng tích hợp: OAuth2 client credentials hoặc API key, scope, giới hạn tần suất. | Integration clients: OAuth2 client credentials or API key, scopes, rate limits. |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 08-hr-payroll.md (P10)

-- FR-INT-005
ALTER TABLE company_bank_accounts
  ADD COLUMN bank_bin        varchar(8),               -- mã BIN NAPAS / NAPAS bank BIN
  ADD COLUMN vietqr_enabled  boolean NOT NULL DEFAULT false,
  ADD CONSTRAINT company_bank_accounts_vietqr_check CHECK (NOT vietqr_enabled OR bank_bin IS NOT NULL);

-- FR-INT-009, BR-PUR-006
CREATE TYPE tax_status AS ENUM ('ACTIVE','SUSPENDED','CLOSED','RISK','NOT_FOUND','UNKNOWN');

CREATE TABLE tax_lookup_cache (
  tax_code    dm_tax_code  PRIMARY KEY,
  name        varchar(255),
  address     text,
  status      tax_status   NOT NULL,
  raw         jsonb,
  fetched_at  timestamptz  NOT NULL DEFAULT now()
);

ALTER TABLE partners
  ADD COLUMN tax_status             tax_status NOT NULL DEFAULT 'UNKNOWN',
  ADD COLUMN tax_status_checked_at  timestamptz;

-- FR-INT-010
CREATE TABLE attendance_devices (
  id              uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  code            varchar(30)  NOT NULL UNIQUE,
  name            varchar(150) NOT NULL,
  vendor          varchar(50),
  serial_no       varchar(100),
  ip_address      inet,
  branch_id       uuid         REFERENCES branches(id),
  credential_id   uuid         REFERENCES integration_credentials(id),
  last_synced_at  timestamptz,
  is_active       boolean      NOT NULL DEFAULT true,
  created_at      timestamptz  NOT NULL DEFAULT now(),
  created_by      uuid         REFERENCES users(id)
);

CREATE TABLE attendance_device_users (
  device_id         uuid        NOT NULL REFERENCES attendance_devices(id),
  device_user_code  varchar(30) NOT NULL,
  employee_id       uuid        NOT NULL REFERENCES employees(id),
  PRIMARY KEY (device_id, device_user_code)
);

ALTER TABLE attendance_records
  ADD CONSTRAINT attendance_records_device_fk FOREIGN KEY (device_id) REFERENCES attendance_devices(id);

-- FR-INT-014
CREATE TYPE api_auth_type AS ENUM ('OAUTH_CLIENT','API_KEY');

CREATE TABLE api_clients (
  id                     uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  name                   varchar(150)  NOT NULL,
  auth_type              api_auth_type NOT NULL,
  client_id              varchar(64)   NOT NULL UNIQUE,  -- hoặc tiền tố API key / or API key prefix
  secret_hash            text          NOT NULL,
  scopes                 text[]        NOT NULL DEFAULT '{}',  -- vd / e.g. {sales.read, sales.write}
  rate_limit_per_minute  integer       NOT NULL DEFAULT 60 CHECK (rate_limit_per_minute > 0),
  owner_user_id          uuid          REFERENCES users(id),
  expires_at             timestamptz,
  last_used_at           timestamptz,
  is_active              boolean       NOT NULL DEFAULT true,
  created_at             timestamptz   NOT NULL DEFAULT now(),
  created_by             uuid          REFERENCES users(id),
  revoked_at             timestamptz
);
```

</details>
