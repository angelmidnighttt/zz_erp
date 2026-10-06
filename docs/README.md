# Tài liệu dự án ERP / ERP Project Documentation

> **Phiên bản / Version:** 0.4 — Bản nháp / Draft
> **Ngày / Date:** 2026-10-06
> **Trạng thái / Status:** Chờ các bên liên quan xem xét / Pending stakeholder review

Bộ tài liệu đặc tả yêu cầu **song ngữ (Tiếng Việt / English)** cho hệ thống ERP. Phạm vi hiện tại **không bao gồm phân hệ Sản xuất (Manufacturing)**; kiến trúc phải cho phép bổ sung phân hệ này về sau.

Bilingual **(Vietnamese / English)** requirements specification for the ERP system. The current scope **excludes the Manufacturing module**; the architecture must allow it to be added later.

---

## Mục lục / Table of contents

| # | Tài liệu / Document | Mã / Code | Giai đoạn / Phase |
|---|---|---|---|
| 00 | [Tổng quan dự án / Project overview](requirements/00-overview.md) | — | — |
| 01 | [Vai trò & phân quyền / Roles & permissions](requirements/01-roles-permissions.md) | ROL | P1 – P7 |
| 02 | [Quản trị hệ thống / System administration](requirements/02-system-administration.md) | SYS | P1 – P11 |
| 03 | [Dữ liệu danh mục / Master data](requirements/03-master-data.md) | MDM | P2 – P11 |
| 04 | [Bán hàng / Sales](requirements/04-sales.md) | SAL | P5 – P11 |
| 05 | [Mua hàng / Purchasing](requirements/05-purchasing.md) | PUR | P4 – P11 |
| 06 | [Kho / Inventory](requirements/06-inventory.md) | INV | P3 – P11 |
| 07 | [Kế toán – Tài chính / Accounting & Finance](requirements/07-accounting-finance.md) | ACC | P2 – P11 |
| 08 | [Nhân sự – Tiền lương / HR & Payroll](requirements/08-hr-payroll.md) | HRM | P10 – P11 |
| 09 | [Quản lý quan hệ khách hàng / CRM](requirements/09-crm.md) | CRM | P10 – P11 |
| 10 | [Báo cáo & Dashboard / Reporting & Dashboards](requirements/10-reporting.md) | RPT | P3 – P11 |
| 11 | [Tích hợp / Integrations](requirements/11-integrations.md) | INT | P1 – P11 |
| 12 | [Yêu cầu phi chức năng / Non-functional requirements](requirements/12-non-functional.md) | NFR | P1 |
| 13 | [Thuật ngữ / Glossary](requirements/13-glossary.md) | — | — |

---

## Quy ước / Conventions

### Mã yêu cầu / Requirement IDs

Định dạng / Format: `<Loại>-<Phân hệ>-<Số thứ tự>` / `<Type>-<Module>-<Sequence>`

| Loại / Type | Ý nghĩa (VI) | Meaning (EN) | Ví dụ / Example |
|---|---|---|---|
| `FR` | Yêu cầu chức năng | Functional requirement | `FR-SAL-012` |
| `BR` | Quy tắc nghiệp vụ | Business rule | `BR-INV-003` |
| `NFR` | Yêu cầu phi chức năng | Non-functional requirement | `NFR-SEC-005` |
| `AC` | Tiêu chí chấp nhận | Acceptance criterion | `AC-1` (trong một FR / within an FR) |
| `A` / `C` / `Q` | Giả định / Ràng buộc / Câu hỏi mở | Assumption / Constraint / Open question | `A-03`, `Q-05` |

Mã đã cấp **không được tái sử dụng**. Yêu cầu bị loại bỏ được đánh dấu ~~gạch ngang~~ kèm lý do.
Issued IDs are **never reused**. Removed requirements are marked ~~struck through~~ with a reason.

### Mức ưu tiên (MoSCoW) / Priority

| Mức / Level | Ý nghĩa (VI) | Meaning (EN) |
|---|---|---|
| `Must` | Bắt buộc — thiếu thì không thể vận hành chính thức | Mandatory — cannot go live without it |
| `Should` | Nên có — quan trọng nhưng có giải pháp tạm thời | Important, but a workaround exists |
| `Could` | Có thể có — làm khi còn nguồn lực | Nice to have, if capacity allows |
| `Won't` | Không làm trong giai đoạn này | Not in this phase |

### Giai đoạn / Phases

| Mã / Code | Giai đoạn (VI) | Phase (EN) |
|---|---|---|
| `P1` | Xác thực & phân quyền — người dùng, đăng nhập, vai trò & quyền, nhật ký kiểm toán | Authentication & authorization — users, sign-in, roles & permissions, audit log |
| `P2` | Tổ chức & danh mục — doanh nghiệp, chi nhánh, phòng ban, sản phẩm, đối tác, kho, bảng giá | Organization & master data — company, branches, departments, products, partners, warehouses, price lists |
| `P3` | Kho cơ bản — nhập / xuất / chuyển kho, kiểm kê, tính giá, đánh số chứng từ, mẫu in | Basic inventory — receipts / issues / transfers, counts, costing, document numbering, print templates |
| `P4` | Mua hàng cơ bản — đơn mua, nhận hàng, hóa đơn nhà cung cấp, trả hàng | Basic purchasing — POs, receiving, vendor bills, returns |
| `P5` | Bán hàng cơ bản — báo giá, đơn bán, giao hàng, hóa đơn, trả hàng | Basic sales — quotations, orders, deliveries, invoices, returns |
| `P6` | Công nợ & thu chi — công nợ phải thu / phải trả, phiếu thu / chi, ngân hàng; **go-live vận hành** | Receivables, payables & cash — AR / AP, cash receipts / payments, bank; **operations go-live** |
| `P7` | Phê duyệt & kiểm soát — luồng duyệt, phạm vi dữ liệu, hạn mức, quyền theo trường, MFA | Approvals & controls — approval flows, data scope, limits, field-level permissions, MFA |
| `P8` | Hoàn thiện mua – bán – kho — lô / serial, giữ hàng, đề nghị mua, báo giá nâng cao | Operations completion — lots / serials, reservations, purchase requests, advanced quotations |
| `P9` | Kế toán đầy đủ & HĐĐT — sổ cái, thuế, BCTC, khóa sổ, tích hợp HĐĐT; **go-live kế toán** | Full accounting & e-invoicing — GL, tax, financial statements, period close, e-invoice integration; **accounting go-live** |
| `P10` | Mở rộng — nhân sự & tiền lương, CRM, tài sản cố định, khuyến mãi, dashboard nâng cao | Expansion — HR & payroll, CRM, fixed assets, promotions, advanced dashboards |
| `P11` | Nâng cao — sàn TMĐT, vận chuyển, Open API ngân hàng, BI và các tính năng "có thì tốt" | Advanced — marketplaces, carriers, bank Open API, BI and nice-to-have features |

- **VI:** Các giai đoạn được sắp theo thứ tự phụ thuộc. P1 – P5 là mốc nội bộ, nghiệm thu trên dữ liệu thử; từ P3 đến P6 chưa có luồng duyệt (xem [00 · Tổng quan](requirements/00-overview.md), mục 9).
- **EN:** Phases are ordered by dependency. P1 – P5 are internal milestones accepted on test data; there are no approval flows from P3 to P6 (see [00 · Overview](requirements/00-overview.md), section 9).
- **VI:** Trong mỗi tài liệu phân hệ, mục Yêu cầu chức năng mở đầu bằng bảng tóm tắt theo giai đoạn, sau đó các yêu cầu được nhóm theo giai đoạn. Yêu cầu làm dạng đơn giản trước được ghi `Must` · `P1` (mở rộng / extended: `P7`); phần mở rộng nằm trong bảng "Mở rộng yêu cầu của giai đoạn trước" của giai đoạn đó.
- **EN:** In each module document, the Functional requirements section opens with a per-phase summary table, then groups requirements by phase. A requirement delivered in a simple form first is tagged `Must` · `P1` (mở rộng / extended: `P7`); the extension is listed in the "Extensions to earlier-phase requirements" table of that phase.

### Cách đọc một yêu cầu / How to read a requirement

```text
#### FR-SAL-001 · Tạo báo giá / Create quotation
`Must` · `P5`

- VI: Nội dung yêu cầu bằng tiếng Việt.
- EN: Requirement text in English.
```

- "Hệ thống phải…" / "The system shall…" = bắt buộc / mandatory.
- "Hệ thống nên…" / "The system should…" = khuyến nghị / recommended.
- Khi có khác biệt giữa hai ngôn ngữ, **bản Tiếng Việt được ưu tiên áp dụng**.
  In case of discrepancy between the two languages, **the Vietnamese version prevails**.

---

## Bước tiếp theo / Next steps

1. Các chủ sở hữu nghiệp vụ xem xét từng tài liệu phân hệ và trả lời mục **Câu hỏi mở**.
   Business owners review each module document and answer the **Open questions** sections.
2. Chốt phạm vi P1 – P6 (đến go-live vận hành) và ký duyệt phiên bản 1.0. P1 không phụ thuộc vào câu hỏi mở nghiệp vụ nên có thể bắt đầu ngay.
   Freeze the P1 – P6 scope (up to the operations go-live) and sign off version 1.0. P1 does not depend on the business open questions and can start now.
3. Chuyển các yêu cầu đã duyệt thành user story / backlog.
   Convert approved requirements into user stories / backlog items.
