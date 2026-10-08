# 02 · Quản trị hệ thống / System Administration (SYS) — Giai đoạn 10 / Phase 10

[← Giai đoạn 10 · Mở rộng / Phase 10 · Expansion](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P1](../phase-01-foundation/02-system-administration.md) · [P2](../phase-02-organization-master-data/02-system-administration.md) · [P3](../phase-03-inventory/02-system-administration.md) · [P6](../phase-06-receivables-payables-cash/02-system-administration.md) · [P7](../phase-07-approvals-controls/02-system-administration.md) · [P8](../phase-08-operations-completion/02-system-administration.md) · [P9](../phase-09-accounting-einvoicing/02-system-administration.md) · [P11](../phase-11-advanced/02-system-administration.md)

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

## 2. Mô hình dữ liệu / Data model

- **VI:** Người được ủy quyền thấy trong hộp chờ duyệt cả chứng từ của người ủy quyền (hàm `approval_inbox_effective`); hành động duyệt thay ghi `on_behalf_of_user_id` để hiển thị "duyệt thay" (`FR-SYS-017`). Duyệt song song: mỗi bước có quy tắc `ANY` (một người duyệt là đủ) hoặc `ALL` (mọi người duyệt của bước đều phải duyệt) — `FR-SYS-015`. Bình luận gắn đa hình với mọi chứng từ; nhắc tên tạo thông báo loại `MENTION` (`FR-SYS-024`).
- **EN:** A delegate's inbox also shows the delegator's documents (`approval_inbox_effective`); actions taken under delegation record `on_behalf_of_user_id` to show "approved on behalf of" (`FR-SYS-017`). Parallel approval: each step has an `ANY` rule (one approver suffices) or `ALL` (every approver of the step must approve) — `FR-SYS-015`. Comments attach polymorphically to any document; mentions create `MENTION` notifications (`FR-SYS-024`).

| Bảng / Table | Mục đích (VI) | Purpose (EN) |
|---|---|---|
| `approval_delegations` | Ủy quyền duyệt trong khoảng thời gian, cho mọi hoặc một số loại chứng từ. | Approval delegation for a period, for all or selected document types. |
| `approval_actions.on_behalf_of_user_id` | Người được duyệt thay. | The user approved on behalf of. |
| `approval_flow_steps.approval_rule` | `ANY` / `ALL` cho duyệt song song. | `ANY` / `ALL` for parallel approval. |
| `document_comments`, `comment_mentions` | Bình luận, trả lời và nhắc tên trên chứng từ. | Comments, replies and mentions on documents. |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 01-roles-permissions.md (P10)

-- ===== Ủy quyền duyệt / Approval delegation (FR-SYS-017) =====
CREATE TABLE approval_delegations (
  id                 uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  delegator_user_id  uuid        NOT NULL REFERENCES users(id),
  delegate_user_id   uuid        NOT NULL REFERENCES users(id),
  valid_from         timestamptz NOT NULL,
  valid_to           timestamptz NOT NULL,
  document_types     varchar(10)[],  -- NULL = mọi loại / all types
  reason             text,
  is_active          boolean     NOT NULL DEFAULT true,
  created_at         timestamptz NOT NULL DEFAULT now(),
  created_by         uuid        REFERENCES users(id),
  CHECK (delegator_user_id <> delegate_user_id),
  CHECK (valid_to > valid_from)
);
CREATE INDEX ON approval_delegations (delegate_user_id) WHERE is_active;

ALTER TABLE approval_actions ADD COLUMN on_behalf_of_user_id uuid REFERENCES users(id);

CREATE FUNCTION approval_inbox_effective(p_user_id uuid)
RETURNS TABLE (request_id uuid, on_behalf_of_user_id uuid)
LANGUAGE sql STABLE AS $$
  SELECT i.id, NULL::uuid FROM approval_inbox(p_user_id) i
  UNION
  SELECT i.id, d.delegator_user_id
  FROM approval_delegations d
  CROSS JOIN LATERAL approval_inbox(d.delegator_user_id) i
  WHERE d.delegate_user_id = p_user_id AND d.is_active
    AND now() BETWEEN d.valid_from AND d.valid_to
    AND (d.document_types IS NULL OR i.document_type = ANY (d.document_types))
    AND i.submitted_by <> p_user_id                                   -- BR-ROL-001
$$;

-- ===== Duyệt song song / Parallel approval (FR-SYS-015) =====
CREATE TYPE approval_rule AS ENUM ('ANY','ALL');
ALTER TABLE approval_flow_steps ADD COLUMN approval_rule approval_rule NOT NULL DEFAULT 'ANY';

-- ===== Bình luận & nhắc tên / Comments & mentions (FR-SYS-024) =====
CREATE TABLE document_comments (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type  varchar(50) NOT NULL,
  entity_id    uuid        NOT NULL,
  parent_id    uuid        REFERENCES document_comments(id),  -- trả lời / reply
  body         text        NOT NULL,
  author_id    uuid        NOT NULL REFERENCES users(id),
  created_at   timestamptz NOT NULL DEFAULT now(),
  edited_at    timestamptz,
  deleted_at   timestamptz
);
CREATE INDEX ON document_comments (entity_type, entity_id, created_at);

CREATE TABLE comment_mentions (
  comment_id   uuid        NOT NULL REFERENCES document_comments(id),
  user_id      uuid        NOT NULL REFERENCES users(id),
  notified_at  timestamptz,
  PRIMARY KEY (comment_id, user_id)
);

INSERT INTO notification_types (code, name_vi, name_en) VALUES
  ('MENTION', 'Được nhắc tên trong bình luận', 'Mentioned in a comment')
ON CONFLICT (code) DO NOTHING;
```

</details>
