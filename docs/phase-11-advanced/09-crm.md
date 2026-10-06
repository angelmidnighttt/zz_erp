# 09 · Quản lý quan hệ khách hàng / CRM — Giai đoạn 11 / Phase 11

[← Giai đoạn 11 · Nâng cao / Phase 11 · Advanced](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P10](../phase-10-expansion/09-crm.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Thu thập lead tự động; khiếu nại & chăm sóc khách hàng; phân khúc khách hàng.
- **EN:** Automatic lead capture; complaints & customer care; customer segmentation.

## 1. Yêu cầu chức năng / Functional requirements

#### FR-CRM-002 · Thu thập lead tự động / Automatic lead capture
`Could` · `P11`

- **VI:** Tạo lead tự động từ form website, quảng cáo thu thập khách hàng tiềm năng trên mạng xã hội, Zalo OA (qua API / webhook `FR-INT-014`, `FR-INT-015`).
- **EN:** Create leads automatically from website forms, social media lead ads and Zalo OA (via API / webhooks `FR-INT-014`, `FR-INT-015`).

#### FR-CRM-008 · Khiếu nại & chăm sóc khách hàng / Complaints & customer care
`Could` · `P11`

- **VI:** Ghi nhận phiếu khiếu nại / yêu cầu hỗ trợ, phân công xử lý, thời hạn xử lý (SLA), trạng thái, kết quả.
- **EN:** Record complaint / support tickets, assign handlers, SLA deadlines, status and resolution.

#### FR-CRM-009 · Phân khúc khách hàng / Customer segmentation
`Could` · `P11`

- **VI:** Phân khúc khách hàng theo doanh số, tần suất mua, lần mua gần nhất (RFM) và thuộc tính tùy chọn.
- **EN:** Segment customers by revenue, purchase frequency, recency (RFM) and custom attributes.
