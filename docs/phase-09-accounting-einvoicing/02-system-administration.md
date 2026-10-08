# 02 · Quản trị hệ thống / System Administration (SYS) — Giai đoạn 9 / Phase 9

[← Giai đoạn 9 · Kế toán đầy đủ & HĐĐT / Phase 9 · Full accounting & e-invoicing](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/02-system-administration.md) · [P2](../phase-02-organization-master-data/02-system-administration.md) · [P3](../phase-03-inventory/02-system-administration.md) · [P6](../phase-06-receivables-payables-cash/02-system-administration.md) · [P7](../phase-07-approvals-controls/02-system-administration.md) · [P8](../phase-08-operations-completion/02-system-administration.md) · [P10](../phase-10-expansion/02-system-administration.md) · [P11](../phase-11-advanced/02-system-administration.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Mẫu biên bản đối chiếu công nợ.
- **EN:** Balance confirmation template.

## 1. Yêu cầu chức năng / Functional requirements

**Mở rộng yêu cầu của giai đoạn trước / Extensions to earlier-phase requirements**

| Mã / ID | Mở rộng (VI) | Extension (EN) |
|---|---|---|
| FR-SYS-021 | Mẫu biên bản đối chiếu công nợ (`FR-ACC-016`). | Balance confirmation template (`FR-ACC-016`). |

## 2. Mô hình dữ liệu / Data model

- **VI:** Không đổi lược đồ. Biên bản đối chiếu công nợ là loại chứng từ `BCF` (khai báo ở [07 · Kế toán](07-accounting-finance.md)); mẫu in là các dòng `print_templates` mặc định cho VI, EN và song ngữ. Nội dung HTML của mẫu nằm trong mã nguồn dưới dạng partial, bảng chỉ tham chiếu tên partial.
- **EN:** No schema change. The balance confirmation is document type `BCF` (declared in [07 · Accounting](07-accounting-finance.md)); its print templates are default `print_templates` rows for VI, EN and bilingual. The template HTML lives in source code as partials; the table only references the partial name.

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 07-accounting-finance.md (P9)

INSERT INTO print_templates (document_type, language, name, body, is_default) VALUES
  ('BCF', 'VI',        'Biên bản đối chiếu công nợ',                   '{{> balance_confirmation_vi}}', true),
  ('BCF', 'EN',        'Balance confirmation statement',               '{{> balance_confirmation_en}}', true),
  ('BCF', 'BILINGUAL', 'Biên bản đối chiếu công nợ / Balance confirmation', '{{> balance_confirmation_bi}}', true);
```

</details>
