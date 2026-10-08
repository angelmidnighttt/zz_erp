# 10 · Báo cáo & Dashboard / Reporting & Dashboards (RPT) — Giai đoạn 10 / Phase 10

[← Giai đoạn 10 · Mở rộng / Phase 10 · Expansion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P3](../phase-03-inventory/10-reporting.md) · [P4](../phase-04-purchasing/10-reporting.md) · [P5](../phase-05-sales/10-reporting.md) · [P6](../phase-06-receivables-payables-cash/10-reporting.md) · [P7](../phase-07-approvals-controls/10-reporting.md) · [P8](../phase-08-operations-completion/10-reporting.md) · [P9](../phase-09-accounting-einvoicing/10-reporting.md) · [P11](../phase-11-advanced/10-reporting.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Dashboard nâng cao.
- **EN:** Advanced dashboards.

## 1. Yêu cầu chức năng / Functional requirements

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-RPT-001 | Dashboard nâng cao: người dùng tùy chỉnh thành phần hiển thị; biểu đồ xu hướng theo thời gian. | Advanced dashboards: user-customizable widgets; trend charts over time. |

## 2. Danh mục báo cáo chuẩn / Standard report catalog

| Mã / Code | Báo cáo (VI) | Report (EN) | Phân hệ / Module | Giai đoạn / Phase |
|---|---|---|---|---|
| R-ACC-12 | Sổ tài sản cố định, bảng tính khấu hao | Fixed-asset register, depreciation schedule | ACC | P10 |
| R-HRM-01 | Bảng lương tổng hợp | Payroll summary | HRM | P10 |
| R-HRM-02 | Báo cáo bảo hiểm, thuế TNCN | Insurance and PIT reports | HRM | P10 |
| R-CRM-01 | Phễu bán hàng, dự báo doanh số | Sales funnel, revenue forecast | CRM | P10 |

## 3. Mô hình dữ liệu / Data model

- **VI:** Dashboard cá nhân là `dashboards` có `owner_user_id` (thay cho `role_id`); người dùng thêm, xóa, sắp xếp widget và chọn biểu đồ xu hướng qua `dashboard_widgets.config` (mở rộng `FR-RPT-001`). Báo cáo mới đăng ký như các giai đoạn trước; R-HRM-01, R-HRM-02 mặc định theo quyền Xem trên `HRM.PAYROLL` và vẫn chịu quyền theo trường `HRM.PAYROLL.salary`.
- **EN:** Personal dashboards are `dashboards` rows with `owner_user_id` (instead of `role_id`); users add, remove and arrange widgets and choose trend charts via `dashboard_widgets.config` (`FR-RPT-001` extension). New reports are registered as in earlier phases; R-HRM-01 and R-HRM-02 default to View on `HRM.PAYROLL` and remain subject to the `HRM.PAYROLL.salary` field permission.

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 07-accounting-finance.md, 08-hr-payroll.md, 09-crm.md (P10)

-- FR-RPT-001 (mở rộng / extension)
ALTER TABLE dashboards
  ADD COLUMN owner_user_id uuid REFERENCES users(id),
  ADD CONSTRAINT dashboards_role_or_owner CHECK (num_nonnulls(role_id, owner_user_id) <= 1);
CREATE INDEX ON dashboards (owner_user_id);

INSERT INTO app_functions (code, module, name_vi, name_en, supported_actions, sort_order) VALUES
  ('RPT.R-ACC-12', 'RPT', 'Sổ TSCĐ, bảng tính khấu hao',   'Fixed-asset register, depreciation schedule', '{VIEW,PRINT,EXPORT}', 9412),
  ('RPT.R-HRM-01', 'RPT', 'Bảng lương tổng hợp',          'Payroll summary',                             '{VIEW,PRINT,EXPORT}', 9501),
  ('RPT.R-HRM-02', 'RPT', 'Báo cáo bảo hiểm, thuế TNCN',  'Insurance and PIT reports',                   '{VIEW,PRINT,EXPORT}', 9502),
  ('RPT.R-CRM-01', 'RPT', 'Phễu bán hàng, dự báo doanh số', 'Sales funnel, revenue forecast',            '{VIEW,PRINT,EXPORT}', 9601)
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (role_id, function_code, action)
SELECT rp.role_id, m.report_code, a
FROM (VALUES ('RPT.R-ACC-12', 'ACC.FIXED_ASSET'), ('RPT.R-HRM-01', 'HRM.PAYROLL'),
             ('RPT.R-HRM-02', 'HRM.PAYROLL'),     ('RPT.R-CRM-01', 'CRM.OPPORTUNITY')) AS m(report_code, source_function)
JOIN role_permissions rp ON rp.function_code = m.source_function AND rp.action = 'VIEW'
CROSS JOIN unnest('{VIEW,PRINT,EXPORT}'::permission_action[]) AS a
ON CONFLICT DO NOTHING;

-- R-ACC-12
CREATE VIEW rpt_fixed_asset_register AS
SELECT fa.id AS asset_id, fa.code, fa.name, fa.group_id, fa.branch_id, fa.in_service_date, fa.method,
       fa.useful_life_months, fa.original_cost_vnd, fa.accumulated_dep_vnd,
       fa.original_cost_vnd - fa.accumulated_dep_vnd AS net_book_value_vnd,
       fa.status,
       (SELECT sum(l.amount_vnd) FROM asset_depreciation_lines l
          JOIN asset_depreciation_runs r ON r.id = l.run_id AND r.status = 'POSTED'
         WHERE l.asset_id = fa.id)                    AS posted_depreciation_vnd
FROM fixed_assets fa;

-- R-HRM-01
CREATE VIEW rpt_payroll_summary AS
SELECT r.id AS payroll_run_id, r.doc_no, r.branch_id, r.period_year, r.period_month, r.run_type, r.status,
       ps.department_id,
       count(*)                  AS employees,
       sum(ps.gross_income)      AS gross_income,
       sum(ps.si_employee + ps.hi_employee + ps.ui_employee) AS insurance_employee,
       sum(ps.si_employer + ps.hi_employer + ps.ui_employer) AS insurance_employer,
       sum(ps.pit)               AS pit,
       sum(ps.net_pay)           AS net_pay
FROM payroll_runs r
JOIN payslips ps ON ps.payroll_run_id = r.id
GROUP BY r.id, r.doc_no, r.branch_id, r.period_year, r.period_month, r.run_type, r.status, ps.department_id;

-- R-HRM-02
CREATE VIEW rpt_insurance_pit AS
SELECT r.period_year, r.period_month, ps.employee_id, ep.personal_tax_code, ep.social_insurance_no,
       ps.insurance_base, ps.si_employee, ps.hi_employee, ps.ui_employee,
       ps.si_employer, ps.hi_employer, ps.ui_employer, ps.union_fee_employer,
       ps.taxable_income, ps.family_deduction, ps.assessable_income, ps.pit
FROM payslips ps
JOIN payroll_runs r            ON r.id = ps.payroll_run_id AND r.status IN ('APPROVED','POSTED','PAID')
LEFT JOIN employee_profiles ep ON ep.employee_id = ps.employee_id;

-- R-CRM-01: dự báo = giá trị × xác suất / forecast = value × probability
CREATE VIEW rpt_crm_funnel AS
SELECT o.owner_id, o.department_id, s.code AS stage_code, s.sort_order, o.status,
       date_trunc('month', o.expected_close_date)::date AS expected_close_month,
       count(*)                                          AS opportunities,
       sum(o.expected_value)                             AS pipeline_value,
       round(sum(o.expected_value * o.probability / 100), 0) AS weighted_forecast
FROM crm_opportunities o
JOIN crm_stages s ON s.id = o.stage_id
GROUP BY o.owner_id, o.department_id, s.code, s.sort_order, o.status, 6;
```

</details>
