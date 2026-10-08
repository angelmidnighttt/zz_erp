# Tài liệu dự án ERP / ERP Project Documentation

> **Phiên bản / Version:** 0.5 — Bản nháp / Draft
> **Ngày / Date:** 2026-10-06
> **Trạng thái / Status:** Chờ các bên liên quan xem xét / Pending stakeholder review

Bộ tài liệu đặc tả yêu cầu **song ngữ (Tiếng Việt / English)** cho hệ thống ERP. Phạm vi hiện tại **không bao gồm phân hệ Sản xuất (Manufacturing)**; kiến trúc phải cho phép bổ sung phân hệ này về sau.

Bilingual **(Vietnamese / English)** requirements specification for the ERP system. The current scope **excludes the Manufacturing module**; the architecture must allow it to be added later.

---

## Cấu trúc thư mục / Folder layout

```text
docs/
├── README.md                     Mục lục / Index (tệp này / this file)
├── common/                       Dùng chung mọi giai đoạn / Shared by all phases
│   ├── 00-overview.md            Tổng quan, phạm vi, lộ trình / Overview, scope, roadmap
│   ├── 12-non-functional.md      Yêu cầu phi chức năng / Non-functional requirements
│   └── 13-glossary.md            Thuật ngữ / Glossary
├── phase-01-foundation/          Mỗi giai đoạn một thư mục / One folder per phase
│   ├── README.md                 Mục tiêu, phạm vi, điều kiện hoàn thành / Goal, scope, exit criteria
│   ├── 01-roles-permissions.md   Phần việc của phân hệ trong giai đoạn này / The module's work in this phase
│   └── 02-system-administration.md
├── phase-02-organization-master-data/
└── …
```

- **VI:** Mỗi thư mục giai đoạn chỉ chứa những gì cần làm trong giai đoạn đó. Mỗi phân hệ có một tệp với tên cố định (`04-sales.md`, `06-inventory.md`…) trong mọi giai đoạn có phần việc của nó; đầu tệp có liên kết sang các giai đoạn khác của cùng phân hệ.
- **EN:** Each phase folder holds only what must be built in that phase. A module keeps the same file name (`04-sales.md`, `06-inventory.md`…) in every phase where it has work; the top of each file links to the module's other phases.

## Giai đoạn / Phases

| Giai đoạn / Phase | Nội dung (VI) | Scope (EN) |
|---|---|---|
| [`P1` — Nền tảng](phase-01-foundation/README.md) | Thiết lập dự án & triển khai; người dùng, đăng nhập, đổi mật khẩu, vai trò & quyền theo chức năng × hành động | Project setup & deployment; users, sign-in, password change, roles & function × action permissions |
| [`P2` — Tổ chức & danh mục](phase-02-organization-master-data/README.md) | Hoàn thiện tài khoản & phân quyền (quên mật khẩu, khóa tài khoản, vai trò nghiệp vụ, nhật ký, VI / EN); doanh nghiệp, chi nhánh, phòng ban, sản phẩm, đối tác, kho, bảng giá | Account & access completion (forgot password, lockout, business roles, audit log, VI / EN); company, branches, departments, products, partners, warehouses, price lists |
| [`P3` — Kho cơ bản](phase-03-inventory/README.md) | Nhập / xuất / chuyển kho, kiểm kê, tính giá, đánh số chứng từ, mẫu in | Receipts / issues / transfers, counts, costing, document numbering, print templates |
| [`P4` — Mua hàng cơ bản](phase-04-purchasing/README.md) | Đơn mua, nhận hàng, hóa đơn nhà cung cấp, trả hàng | POs, receiving, vendor bills, returns |
| [`P5` — Bán hàng cơ bản](phase-05-sales/README.md) | Báo giá, đơn bán, giao hàng, hóa đơn, trả hàng | Quotations, orders, deliveries, invoices, returns |
| [`P6` — Công nợ & thu chi](phase-06-receivables-payables-cash/README.md) | Công nợ phải thu / phải trả, phiếu thu / chi, ngân hàng; **go-live vận hành** | AR / AP, cash receipts / payments, bank; **operations go-live** |
| [`P7` — Phê duyệt & kiểm soát](phase-07-approvals-controls/README.md) | Luồng duyệt, phạm vi dữ liệu, hạn mức, quyền theo trường, phân tách nhiệm vụ, MFA | Approval flows, data scope, limits, field-level permissions, segregation of duties, MFA |
| [`P8` — Hoàn thiện mua – bán – kho](phase-08-operations-completion/README.md) | Lô / serial, giữ hàng, đề nghị mua, báo giá nâng cao | Lots / serials, reservations, purchase requests, advanced quotations |
| [`P9` — Kế toán đầy đủ & HĐĐT](phase-09-accounting-einvoicing/README.md) | Sổ cái, thuế, BCTC, khóa sổ, tích hợp HĐĐT; **go-live kế toán** | GL, tax, financial statements, period close, e-invoice integration; **accounting go-live** |
| [`P10` — Mở rộng](phase-10-expansion/README.md) | Nhân sự & tiền lương, CRM, tài sản cố định, khuyến mãi, dashboard nâng cao | HR & payroll, CRM, fixed assets, promotions, advanced dashboards |
| [`P11` — Nâng cao](phase-11-advanced/README.md) | Sàn TMĐT, vận chuyển, Open API ngân hàng, BI và các tính năng "có thì tốt" | Marketplaces, carriers, bank Open API, BI and nice-to-have features |

- **VI:** Các giai đoạn được sắp theo thứ tự phụ thuộc. P1 – P5 là mốc nội bộ, nghiệm thu trên dữ liệu thử; từ P3 đến P6 chưa có luồng duyệt. Lộ trình và điều kiện hoàn thành chi tiết ở [00 · Tổng quan](common/00-overview.md), mục 9.
- **EN:** Phases are ordered by dependency. P1 – P5 are internal milestones accepted on test data; there are no approval flows from P3 to P6. The detailed roadmap and exit criteria are in [00 · Overview](common/00-overview.md), section 9.

## Tài liệu dùng chung / Shared documents

| # | Tài liệu / Document |
|---|---|
| 00 | [Tổng quan dự án / Project overview](common/00-overview.md) |
| 12 | [Yêu cầu phi chức năng / Non-functional requirements](common/12-non-functional.md) |
| 13 | [Thuật ngữ / Glossary](common/13-glossary.md) |

| Mã / Code | Phân hệ (VI) | Module (EN) | Tệp / File |
|---|---|---|---|
| ROL | Vai trò & phân quyền | Roles & permissions | `01-roles-permissions.md` |
| SYS | Quản trị hệ thống | System administration | `02-system-administration.md` |
| MDM | Dữ liệu danh mục | Master data | `03-master-data.md` |
| SAL | Bán hàng | Sales | `04-sales.md` |
| PUR | Mua hàng | Purchasing | `05-purchasing.md` |
| INV | Kho | Inventory | `06-inventory.md` |
| ACC | Kế toán – Tài chính | Accounting & Finance | `07-accounting-finance.md` |
| HRM | Nhân sự – Tiền lương | HR & Payroll | `08-hr-payroll.md` |
| CRM | Quản lý quan hệ khách hàng | CRM | `09-crm.md` |
| RPT | Báo cáo & Dashboard | Reporting & Dashboards | `10-reporting.md` |
| INT | Tích hợp | Integrations | `11-integrations.md` |

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

### Yêu cầu làm qua nhiều giai đoạn / Requirements delivered over several phases

- **VI:** Yêu cầu làm dạng đơn giản trước được ghi `Must` · `P1` (mở rộng / extended: `P2`). Phần mở rộng nằm trong bảng "Mở rộng yêu cầu của giai đoạn trước" của tệp cùng phân hệ trong thư mục giai đoạn đó.
- **EN:** A requirement delivered in a simple form first is tagged `Must` · `P1` (mở rộng / extended: `P2`). The extension is listed in the "Extensions to earlier-phase requirements" table of the same module's file in that phase folder.

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

1. Các chủ sở hữu nghiệp vụ xem xét tài liệu từng giai đoạn và trả lời mục **Câu hỏi mở**.
   Business owners review each phase's documents and answer the **Open questions** sections.
2. Chốt phạm vi P1 – P6 (đến go-live vận hành) và ký duyệt phiên bản 1.0. P1 không phụ thuộc vào câu hỏi mở nghiệp vụ nên có thể bắt đầu ngay.
   Freeze the P1 – P6 scope (up to the operations go-live) and sign off version 1.0. P1 does not depend on the business open questions and can start now.
3. Chuyển các yêu cầu đã duyệt thành user story / backlog.
   Convert approved requirements into user stories / backlog items.
