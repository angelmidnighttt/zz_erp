# 07 · Kế toán – Tài chính / Accounting & Finance (ACC) — Giai đoạn 2 / Phase 2

[← Giai đoạn 2 · Tổ chức & danh mục / Phase 2 · Organization & master data](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P6](../phase-06-receivables-payables-cash/07-accounting-finance.md) · [P9](../phase-09-accounting-einvoicing/07-accounting-finance.md) · [P10](../phase-10-expansion/07-accounting-finance.md) · [P11](../phase-11-advanced/07-accounting-finance.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Năm tài chính & kỳ kế toán.
- **EN:** Fiscal years & periods.

## 1. Yêu cầu chức năng / Functional requirements

**Thiết lập / Setup**

#### FR-ACC-002 · Năm tài chính & kỳ kế toán / Fiscal years & periods
`Must` · `P2` (mở rộng / extended: `P9`)

- **VI:** Khai báo năm tài chính (có thể khác năm dương lịch), kỳ kế toán theo tháng; mỗi kỳ có trạng thái mở / khóa.
- **EN:** Define fiscal years (may differ from the calendar year) with monthly periods; each period is open or locked.

## 2. Quy tắc nghiệp vụ / Business rules

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-ACC-009 | Số tiền lưu bằng kiểu số thập phân chính xác, không dùng số thực dấu phẩy động. | Amounts are stored as exact decimals, never floating point. | P2 |

| Mã / ID | Quy tắc (VI) | Rule (EN) | Giai đoạn / Phase |
|---|---|---|---|
| BR-ACC-008 | Dữ liệu và chứng từ kế toán được lưu trữ tối thiểu 10 năm, không xóa vật lý. | Accounting data and documents are retained for at least 10 years and never physically deleted. | P3 |

## 3. Mô hình dữ liệu / Data model

- **VI:** `BR-ACC-009` được đáp ứng bằng các domain `dm_*` khai báo ở [02 · Quản trị hệ thống](02-system-administration.md). `BR-ACC-008` (không xóa vật lý) áp dụng từ P3: tài khoản cơ sở dữ liệu của ứng dụng không được cấp quyền `DELETE` trên bảng chứng từ đã ghi sổ. Trạng thái khóa theo từng phân hệ được bổ sung ở P9 (`FR-ACC-011`).
- **EN:** `BR-ACC-009` is met by the `dm_*` domains declared in [02 · System Administration](02-system-administration.md). `BR-ACC-008` (no physical deletion) applies from P3: the application's database account is not granted `DELETE` on posted document tables. Per-module lock status is added in P9 (`FR-ACC-011`).

| Bảng / Table | Mục đích (VI) | Purpose (EN) |
|---|---|---|
| `fiscal_years` | Năm tài chính, có thể khác năm dương lịch; các năm không chồng lấn. | Fiscal years, possibly not calendar years; years never overlap. |
| `fiscal_periods` | Kỳ kế toán theo tháng, trạng thái mở / khóa. Cho phép tới 15 kỳ cho năm tài chính đầu tiên dài hơn 12 tháng. | Monthly periods, open / locked. Up to 15 periods to allow a first fiscal year longer than 12 months. |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 02-system-administration.md (P2)

CREATE TYPE period_status AS ENUM ('OPEN','LOCKED');

CREATE TABLE fiscal_years (
  id          uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  code        varchar(20)   NOT NULL UNIQUE,  -- vd / e.g. 'FY2026'
  start_date  date          NOT NULL,
  end_date    date          NOT NULL,
  status      period_status NOT NULL DEFAULT 'OPEN',
  version     integer       NOT NULL DEFAULT 1,
  created_at  timestamptz   NOT NULL DEFAULT now(),
  created_by  uuid          REFERENCES users(id),
  updated_at  timestamptz   NOT NULL DEFAULT now(),
  updated_by  uuid          REFERENCES users(id),
  CHECK (end_date > start_date),
  EXCLUDE USING gist (daterange(start_date, end_date, '[]') WITH &&)
);

CREATE TABLE fiscal_periods (
  id              uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  fiscal_year_id  uuid          NOT NULL REFERENCES fiscal_years(id),
  period_no       smallint      NOT NULL CHECK (period_no BETWEEN 1 AND 15),
  start_date      date          NOT NULL,
  end_date        date          NOT NULL,
  status          period_status NOT NULL DEFAULT 'OPEN',
  locked_at       timestamptz,
  locked_by       uuid          REFERENCES users(id),
  version         integer       NOT NULL DEFAULT 1,
  created_at      timestamptz   NOT NULL DEFAULT now(),
  created_by      uuid          REFERENCES users(id),
  updated_at      timestamptz   NOT NULL DEFAULT now(),
  updated_by      uuid          REFERENCES users(id),
  UNIQUE (fiscal_year_id, period_no),
  CHECK (end_date >= start_date),
  EXCLUDE USING gist (daterange(start_date, end_date, '[]') WITH &&)
);
```

</details>
