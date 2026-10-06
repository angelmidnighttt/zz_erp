# 02 · Quản trị hệ thống / System Administration (SYS) — Giai đoạn 10 / Phase 10

[← Giai đoạn 10 · Mở rộng / Phase 10 · Expansion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/02-system-administration.md) · [P2](../phase-02-organization-master-data/02-system-administration.md) · [P3](../phase-03-inventory/02-system-administration.md) · [P7](../phase-07-approvals-controls/02-system-administration.md) · [P8](../phase-08-operations-completion/02-system-administration.md) · [P9](../phase-09-accounting-einvoicing/02-system-administration.md) · [P11](../phase-11-advanced/02-system-administration.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Ủy quyền duyệt; bình luận & nhắc tên; duyệt song song.
- **EN:** Approval delegation; comments & mentions; parallel approval.

## 1. Yêu cầu chức năng / Functional requirements

**Luồng phê duyệt / Approval workflow**

#### FR-SYS-017 · Ủy quyền duyệt / Approval delegation
`Should` · `P10`

- **VI:** Người duyệt ủy quyền cho người khác trong một khoảng thời gian (ví dụ khi nghỉ phép). Chứng từ được duyệt theo ủy quyền ghi rõ "duyệt thay".
- **EN:** Approvers delegate to another user for a period (e.g. during leave). Documents approved under delegation are marked "approved on behalf of".

**Tiện ích dùng chung / Common utilities**

#### FR-SYS-024 · Trao đổi trên chứng từ / Comments & mentions
`Should` · `P10`

- **VI:** Người dùng bình luận trên chứng từ, nhắc tên (@mention) đồng nghiệp để nhận thông báo.
- **EN:** Users comment on documents and @mention colleagues to notify them.
