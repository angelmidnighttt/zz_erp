# 08 · Nhân sự – Tiền lương / HR & Payroll (HRM) — Giai đoạn 11 / Phase 11

[← Giai đoạn 11 · Nâng cao / Phase 11 · Advanced](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P10](../phase-10-expansion/08-hr-payroll.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Sơ đồ tổ chức, quá trình công tác; cổng nhân viên tự phục vụ; chấm công bằng điện thoại.
- **EN:** Org chart, employment history; employee self-service portal; mobile check-in.

## 1. Yêu cầu chức năng / Functional requirements

**Hồ sơ nhân sự / Employee records**

#### FR-HRM-002 · Sơ đồ tổ chức & chức danh / Org chart & job titles
`Should` · `P11`

- **VI:** Hiển thị sơ đồ tổ chức theo phòng ban và quan hệ báo cáo; danh mục chức danh, cấp bậc.
- **EN:** Display the org chart by department and reporting lines; maintain job titles and grades.

#### FR-HRM-004 · Quá trình công tác / Employment history
`Should` · `P11`

- **VI:** Ghi nhận bổ nhiệm, điều chuyển, thay đổi lương, khen thưởng, kỷ luật, nghỉ việc; mỗi thay đổi có ngày hiệu lực và quyết định đính kèm.
- **EN:** Record promotions, transfers, salary changes, rewards, disciplinary actions, terminations; each change has an effective date and an attached decision.

**Tự phục vụ / Self-service**

#### FR-HRM-017 · Cổng nhân viên / Employee portal
`Should` · `P11`

- **VI:** Nhân viên xem hồ sơ của mình, phiếu lương, số ngày phép còn lại; gửi đơn nghỉ phép, làm thêm giờ, tạm ứng, đề nghị cập nhật thông tin cá nhân; giao diện dùng tốt trên điện thoại.
- **EN:** Employees view their profile, payslips and leave balance; submit leave, overtime, advance and personal-data update requests; mobile-friendly UI.

## 2. Mô hình dữ liệu / Data model

- **VI:** Chức danh và cấp bậc thành danh mục; sơ đồ tổ chức dựng từ cây phòng ban và `employee_profiles.direct_manager_id` (`FR-HRM-002`). Quá trình công tác lưu từng sự kiện có ngày hiệu lực và quyết định đính kèm (`FR-HRM-004`). Cổng nhân viên dùng vai trò `EMP` với phạm vi `OWN`: xem hồ sơ và phiếu lương của chính mình, gửi đơn nghỉ / làm thêm / tạm ứng và yêu cầu cập nhật thông tin cá nhân — yêu cầu này đi luồng duyệt rồi mới ghi vào hồ sơ (`FR-HRM-017`). Chấm công bằng điện thoại ghi tọa độ, độ chính xác, Wi-Fi và vùng địa lý hợp lệ (`FR-HRM-006`).
- **EN:** Job titles and grades become catalogs; the org chart is built from the department tree and `employee_profiles.direct_manager_id` (`FR-HRM-002`). Employment history stores each event with an effective date and attached decision (`FR-HRM-004`). The employee portal uses the `EMP` role with `OWN` scope: view one's own profile and payslips, submit leave / overtime / advance requests and personal-data update requests — the latter go through approval before being written to the profile (`FR-HRM-017`). Mobile check-in records coordinates, accuracy, Wi-Fi and the matched geofence (`FR-HRM-006`).

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 07-accounting-finance.md (P11)

-- ===== Chức danh & cấp bậc / Job titles & grades (FR-HRM-002) =====
CREATE TABLE job_grades (
  id         uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  code       varchar(20)  NOT NULL UNIQUE,
  name       varchar(100) NOT NULL,
  level      smallint     NOT NULL,
  is_active  boolean      NOT NULL DEFAULT true
);

CREATE TABLE job_titles (
  id         uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  code       varchar(20)  NOT NULL UNIQUE,
  name       varchar(150) NOT NULL,
  name_en    varchar(150),
  is_active  boolean      NOT NULL DEFAULT true
);

ALTER TABLE employee_profiles
  ADD COLUMN job_title_id  uuid REFERENCES job_titles(id),
  ADD COLUMN job_grade_id  uuid REFERENCES job_grades(id);  -- thay cột grade dạng chữ / replaces the free-text grade

-- ===== Quá trình công tác / Employment history (FR-HRM-004) =====
CREATE TYPE employment_event_type AS ENUM
  ('APPOINTMENT','TRANSFER','SALARY_CHANGE','REWARD','DISCIPLINE','TERMINATION');

CREATE TABLE employment_history (
  id                    uuid                  PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id           uuid                  NOT NULL REFERENCES employees(id),
  event_type            employment_event_type NOT NULL,
  effective_date        date                  NOT NULL,
  decision_no           varchar(50),
  from_department_id    uuid                  REFERENCES departments(id),
  to_department_id      uuid                  REFERENCES departments(id),
  from_job_title_id     uuid                  REFERENCES job_titles(id),
  to_job_title_id       uuid                  REFERENCES job_titles(id),
  old_salary            dm_amount,
  new_salary            dm_amount,
  amount                dm_amount,            -- thưởng / phạt / reward or penalty
  description           text,
  decision_file_id      uuid                  REFERENCES stored_files(id),
  created_at            timestamptz           NOT NULL DEFAULT now(),
  created_by            uuid                  REFERENCES users(id)
);
CREATE INDEX ON employment_history (employee_id, effective_date);

-- ===== Cổng nhân viên / Employee portal (FR-HRM-017) =====
INSERT INTO document_types (code, module, name_vi, name_en, function_code, table_name, sort_order, approval_mode) VALUES
  ('PDC', 'HRM', 'Yêu cầu cập nhật thông tin cá nhân', 'Personal data change', 'HRM.EMPLOYEE',
   'personal_data_change_requests', 840, 'SINGLE');

CREATE TABLE personal_data_change_requests (
  id           uuid           PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id  uuid           NOT NULL REFERENCES employees(id),
  changes      jsonb          NOT NULL,   -- {field: {before, after}}
  status       request_status NOT NULL DEFAULT 'DRAFT',
  applied_at   timestamptz,
  owner_id     uuid           REFERENCES users(id),
  created_at   timestamptz    NOT NULL DEFAULT now(),
  created_by   uuid           REFERENCES users(id),
  updated_at   timestamptz    NOT NULL DEFAULT now(),
  updated_by   uuid           REFERENCES users(id)
);

-- EMP chỉ thấy dữ liệu của mình (phạm vi OWN) / EMP only sees their own data (OWN scope)
INSERT INTO role_permissions (role_id, function_code, action, data_scope)
SELECT r.id, m.function_code, a, 'OWN'
FROM (VALUES ('HRM.EMPLOYEE', 'V'), ('HRM.PAYROLL', 'V')) AS m(function_code, letters)
JOIN roles r ON r.code = 'EMP'
CROSS JOIN LATERAL perm_letters(m.letters) AS a
ON CONFLICT DO NOTHING;

INSERT INTO role_field_grants (role_id, field_code, access)
SELECT r.id, 'HRM.PAYROLL.salary', 'VIEW' FROM roles r WHERE r.code = 'EMP'
ON CONFLICT DO NOTHING;

-- ===== Chấm công bằng điện thoại / Mobile check-in (FR-HRM-006) =====
ALTER TYPE attendance_source ADD VALUE 'MOBILE';

CREATE TABLE attendance_geofences (
  id           uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  name         varchar(150)  NOT NULL,
  branch_id    uuid          REFERENCES branches(id),
  latitude     numeric(9,6)  NOT NULL,
  longitude    numeric(9,6)  NOT NULL,
  radius_m     integer       NOT NULL CHECK (radius_m > 0),
  wifi_bssids  text[],                       -- Wi-Fi văn phòng được chấp nhận / accepted office Wi-Fi
  is_active    boolean       NOT NULL DEFAULT true
);

ALTER TABLE attendance_records
  ADD COLUMN latitude     numeric(9,6),
  ADD COLUMN longitude    numeric(9,6),
  ADD COLUMN accuracy_m   numeric(8,2),
  ADD COLUMN wifi_bssid   varchar(17),
  ADD COLUMN geofence_id  uuid REFERENCES attendance_geofences(id);
```

</details>
