# 11 · Tích hợp / Integrations (INT) — Giai đoạn 11 / Phase 11

[← Giai đoạn 11 · Nâng cao / Phase 11 · Advanced](README.md)

Các giai đoạn khác của phân hệ / Other phases of this module: [P2](../phase-02-organization-master-data/11-integrations.md) · [P3](../phase-03-inventory/11-integrations.md) · [P7](../phase-07-approvals-controls/11-integrations.md) · [P9](../phase-09-accounting-einvoicing/11-integrations.md) · [P10](../phase-10-expansion/11-integrations.md)

---

## Phạm vi giai đoạn / Phase scope

- **VI:** Open API ngân hàng; Zalo ZNS / SMS; tỷ giá tự động; sàn TMĐT; đơn vị vận chuyển; webhook; chữ ký số.
- **EN:** Bank Open API; Zalo ZNS / SMS; automatic exchange rates; marketplaces; carriers; webhooks; digital signatures.

## 1. Tổng quan tích hợp / Integration overview

| Mã / ID | Hệ thống (VI) | System (EN) | Hướng / Direction | Ưu tiên / Priority | Giai đoạn / Phase |
|---|---|---|---|---|---|
| FR-INT-004 | Open API ngân hàng | Bank Open API | Hai chiều / Two-way | Could | P11 |
| FR-INT-007 | Zalo ZNS / SMS | Zalo ZNS / SMS | ERP → Ngoài / External | Could | P11 |
| FR-INT-008 | Tỷ giá ngân hàng | Bank exchange rates | Ngoài / External → ERP | Could | P11 |
| FR-INT-011 | Sàn thương mại điện tử | E-commerce marketplaces | Hai chiều / Two-way | Could | P11 |
| FR-INT-012 | Đơn vị vận chuyển | Shipping carriers | Hai chiều / Two-way | Could | P11 |
| FR-INT-015 | Webhook | Webhooks | ERP → Ngoài / External | Could | P11 |
| FR-INT-016 | Chữ ký số | Digital signatures | ERP ↔ dịch vụ ký / signing service | Could | P11 |

## 2. Yêu cầu chức năng / Functional requirements

**Ngân hàng & thanh toán / Banking & payments**

#### FR-INT-004 · Open API ngân hàng / Bank Open API
`Could` · `P11`

- **VI:** Với ngân hàng hỗ trợ: nhận thông báo biến động số dư theo thời gian thực, tự động khớp khoản thu; tạo lệnh chi từ đề nghị thanh toán đã duyệt (có xác thực bổ sung).
- **EN:** For supporting banks: receive real-time balance notifications and auto-match receipts; initiate payments from approved payment requests (with additional authentication).

**Thông báo / Notifications**

#### FR-INT-007 · Zalo ZNS / SMS
`Could` · `P11`

- **VI:** Gửi thông báo đơn hàng, giao hàng, nhắc nợ qua Zalo ZNS hoặc SMS theo mẫu đã đăng ký.
- **EN:** Send order, delivery and payment-reminder notifications via Zalo ZNS or SMS using registered templates.

**Dữ liệu tham chiếu / Reference data**

#### FR-INT-008 · Tỷ giá tự động / Automatic exchange rates
`Could` · `P11`

- **VI:** Lấy tỷ giá hằng ngày từ nguồn ngân hàng được chọn và lưu vào bảng tỷ giá (`FR-MDM-016`).
- **EN:** Fetch daily rates from a selected bank source into the rate table (`FR-MDM-016`).

**Thiết bị & kênh kinh doanh / Devices & sales channels**

#### FR-INT-011 · Sàn thương mại điện tử / E-commerce marketplaces
`Could` · `P11`

- **VI:** Đồng bộ đơn hàng từ các sàn (ví dụ Shopee, Lazada, TikTok Shop) về ERP, đẩy tồn kho khả dụng lên sàn, đối soát doanh thu và phí sàn.
- **EN:** Sync orders from marketplaces (e.g. Shopee, Lazada, TikTok Shop) into the ERP, push available stock to the marketplaces, reconcile payouts and fees.

#### FR-INT-012 · Đơn vị vận chuyển / Shipping carriers
`Could` · `P11`

- **VI:** Tạo vận đơn với đơn vị vận chuyển (ví dụ GHN, GHTK, Viettel Post), theo dõi hành trình, đối soát tiền thu hộ (COD).
- **EN:** Create shipments with carriers (e.g. GHN, GHTK, Viettel Post), track deliveries, reconcile cash-on-delivery (COD) remittances.

**Thuế, API & hạ tầng / Tax, API & infrastructure**

#### FR-INT-015 · Webhook / Webhooks
`Could` · `P11`

- **VI:** Gửi sự kiện (đơn hàng được tạo / xác nhận, hóa đơn phát hành, thanh toán ghi nhận…) tới URL đăng ký, có chữ ký HMAC và cơ chế gửi lại.
- **EN:** Deliver events (order created / confirmed, invoice issued, payment recorded…) to registered URLs, signed with HMAC and with retries.

#### FR-INT-016 · Chữ ký số / Digital signatures
`Could` · `P11`

- **VI:** Ký số chứng từ PDF (hợp đồng, biên bản đối chiếu) bằng chữ ký số USB token hoặc dịch vụ ký số từ xa.
- **EN:** Digitally sign PDF documents (contracts, balance confirmations) using USB-token certificates or remote signing services.

## 3. Mô hình dữ liệu / Data model

- **VI:** Mọi tích hợp mới dùng lại nền tảng của P9: thông tin xác thực ở `integration_credentials`, lời gọi ra qua `integration_jobs` có khóa chống trùng, nhật ký ở `integration_logs`. Dữ liệu nhận vào (biến động số dư, đơn hàng sàn, trạng thái vận đơn) đều có khóa ngoài duy nhất theo nguồn để xử lý lại an toàn. Lệnh chi qua Open API chỉ gửi khi đã xác thực bổ sung (`second_factor_at`). Webhook ký HMAC bằng bí mật mã hóa của từng đăng ký và gửi lại theo `next_attempt_at`.
- **EN:** Every new integration reuses the P9 foundation: credentials in `integration_credentials`, outbound calls through idempotent `integration_jobs`, logs in `integration_logs`. Inbound data (balance notifications, marketplace orders, shipment statuses) carries a unique external key per source so reprocessing is safe. Open API payment orders are only sent after additional authentication (`second_factor_at`). Webhooks are HMAC-signed with each subscription's encrypted secret and retried per `next_attempt_at`.

| Bảng / Table | Mục đích (VI) | Purpose (EN) |
|---|---|---|
| `bank_notifications`, `bank_payment_orders` | Biến động số dư thời gian thực, tự khớp khoản thu; lệnh chi từ đề nghị thanh toán đã duyệt (`FR-INT-004`). | Real-time balance notifications auto-matched to receipts; payment orders from approved payment requests (`FR-INT-004`). |
| `message_templates`, `outbound_messages` | Mẫu đã đăng ký và tin Zalo ZNS / SMS đã gửi (`FR-INT-007`). | Registered templates and sent Zalo ZNS / SMS messages (`FR-INT-007`). |
| `marketplace_shops`, `marketplace_product_links`, `marketplace_orders`, `marketplace_settlements` | Gian hàng, ánh xạ sản phẩm / đẩy tồn, đơn đồng bộ về `sales_orders`, đối soát doanh thu và phí sàn (`FR-INT-011`). | Shops, product mapping / stock push, orders synced into `sales_orders`, payout and fee reconciliation (`FR-INT-011`). |
| `carrier_accounts`, `shipments`, `shipment_events`, `cod_remittances`, `cod_remittance_lines` | Vận đơn, hành trình, đối soát tiền thu hộ (`FR-INT-012`). | Shipments, tracking, cash-on-delivery reconciliation (`FR-INT-012`). |
| `webhook_subscriptions`, `webhook_deliveries` | Đăng ký nhận sự kiện và lịch sử gửi (`FR-INT-015`). | Event subscriptions and delivery history (`FR-INT-015`). |
| `signature_requests` | Yêu cầu ký số PDF bằng USB token hoặc ký số từ xa (`FR-INT-016`). | PDF signing requests via USB token or remote signing (`FR-INT-016`). |

<details>
<summary>Xem DDL / Show DDL</summary>

```sql
-- Chạy sau / Run after: 09-crm.md (P11)

INSERT INTO system_settings (key, value) VALUES
  ('fx.auto_source_bank', 'null'),  -- FR-INT-008: ngân hàng lấy tỷ giá / rate source bank
  ('fx.auto_fetch_time',  '"08:30"')
ON CONFLICT (key) DO NOTHING;

-- ===== Open API ngân hàng / Bank Open API (FR-INT-004) =====
CREATE TABLE bank_notifications (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_account_id   uuid        NOT NULL REFERENCES company_bank_accounts(id),
  external_txn_id   varchar(100) NOT NULL,
  direction         varchar(6)  NOT NULL CHECK (direction IN ('CREDIT','DEBIT')),
  amount            dm_amount   NOT NULL,
  description       text,
  txn_time          timestamptz NOT NULL,
  raw               jsonb,
  match_status      statement_match_status NOT NULL DEFAULT 'UNMATCHED',
  cash_document_id  uuid        REFERENCES cash_documents(id),
  received_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (bank_account_id, external_txn_id)
);

CREATE TYPE bank_order_status AS ENUM ('CREATED','AWAITING_2FA','SUBMITTED','SUCCEEDED','FAILED','CANCELLED');

CREATE TABLE bank_payment_orders (
  id                  uuid              PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_request_id  uuid              NOT NULL REFERENCES payment_requests(id),
  bank_account_id     uuid              NOT NULL REFERENCES company_bank_accounts(id),
  amount              dm_amount         NOT NULL CHECK (amount > 0),
  status              bank_order_status NOT NULL DEFAULT 'CREATED',
  idempotency_key     varchar(150)      NOT NULL UNIQUE,
  external_ref        varchar(100),
  second_factor_at    timestamptz,      -- xác thực bổ sung / additional authentication
  submitted_by        uuid              REFERENCES users(id),
  submitted_at        timestamptz,
  cash_document_id    uuid              REFERENCES cash_documents(id),
  last_error          text,
  created_at          timestamptz       NOT NULL DEFAULT now(),
  CHECK (status NOT IN ('SUBMITTED','SUCCEEDED') OR second_factor_at IS NOT NULL)
);

-- ===== Zalo ZNS / SMS (FR-INT-007) =====
CREATE TYPE message_channel AS ENUM ('ZNS','SMS');
CREATE TYPE message_status  AS ENUM ('QUEUED','SENT','DELIVERED','FAILED');

CREATE TABLE message_templates (
  id                    uuid            PRIMARY KEY DEFAULT gen_random_uuid(),
  channel               message_channel NOT NULL,
  code                  varchar(50)     NOT NULL,  -- 'ORDER_CONFIRMED','DELIVERY','PAYMENT_REMINDER'…
  provider_template_id  varchar(100)    NOT NULL,  -- mã mẫu đã đăng ký / registered template ID
  params_schema         jsonb           NOT NULL DEFAULT '[]',
  is_active             boolean         NOT NULL DEFAULT true,
  UNIQUE (channel, code)
);

CREATE TABLE outbound_messages (
  id                   uuid            PRIMARY KEY DEFAULT gen_random_uuid(),
  channel              message_channel NOT NULL,
  template_id          uuid            NOT NULL REFERENCES message_templates(id),
  to_phone             varchar(20)     NOT NULL,
  params               jsonb           NOT NULL,
  entity_type          varchar(50),
  entity_id            uuid,
  status               message_status  NOT NULL DEFAULT 'QUEUED',
  provider_message_id  varchar(100),
  cost                 dm_amount,
  attempts             smallint        NOT NULL DEFAULT 0,
  last_error           text,
  sent_at              timestamptz,
  created_at           timestamptz     NOT NULL DEFAULT now()
);
CREATE INDEX ON outbound_messages (entity_type, entity_id);

-- ===== Sàn TMĐT / Marketplaces (FR-INT-011) =====
CREATE TYPE marketplace_platform AS ENUM ('SHOPEE','LAZADA','TIKTOK_SHOP','OTHER');

CREATE TABLE marketplace_shops (
  id                    uuid                 PRIMARY KEY DEFAULT gen_random_uuid(),
  platform              marketplace_platform NOT NULL,
  external_shop_id      varchar(100)         NOT NULL,
  name                  varchar(150)         NOT NULL,
  credential_id         uuid                 NOT NULL REFERENCES integration_credentials(id),
  branch_id             uuid                 NOT NULL REFERENCES branches(id),
  warehouse_id          uuid                 NOT NULL REFERENCES warehouses(id),
  customer_id           uuid                 NOT NULL REFERENCES partners(id),  -- khách lẻ đại diện / generic customer
  last_order_sync_at    timestamptz,
  last_stock_push_at    timestamptz,
  is_active             boolean              NOT NULL DEFAULT true,
  UNIQUE (platform, external_shop_id)
);

CREATE TABLE marketplace_product_links (
  shop_id           uuid         NOT NULL REFERENCES marketplace_shops(id),
  product_id        uuid         NOT NULL REFERENCES products(id),
  external_item_id  varchar(100) NOT NULL,
  external_sku      varchar(100),
  push_stock        boolean      NOT NULL DEFAULT true,
  PRIMARY KEY (shop_id, external_item_id)
);

CREATE TABLE marketplace_orders (
  id                 uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id            uuid         NOT NULL REFERENCES marketplace_shops(id),
  external_order_id  varchar(100) NOT NULL,
  external_status    varchar(50),
  raw                jsonb        NOT NULL,
  sales_order_id     uuid         REFERENCES sales_orders(id),
  synced_at          timestamptz  NOT NULL DEFAULT now(),
  error              text,
  UNIQUE (shop_id, external_order_id)
);

CREATE TABLE marketplace_settlements (
  id                      uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id                 uuid         NOT NULL REFERENCES marketplace_shops(id),
  external_settlement_id  varchar(100) NOT NULL,
  period_from             date,
  period_to               date,
  gross_vnd               dm_amount    NOT NULL,
  fees_vnd                dm_amount    NOT NULL DEFAULT 0,
  net_vnd                 dm_amount    NOT NULL,
  details                 jsonb,       -- phí theo đơn / fees per order
  cash_document_id        uuid         REFERENCES cash_documents(id),
  UNIQUE (shop_id, external_settlement_id)
);

-- ===== Đơn vị vận chuyển / Carriers (FR-INT-012) =====
CREATE TYPE carrier_code AS ENUM ('GHN','GHTK','VIETTEL_POST','OTHER');
CREATE TYPE shipment_status AS ENUM ('CREATED','PICKED_UP','IN_TRANSIT','DELIVERED','FAILED','RETURNED','CANCELLED');

CREATE TABLE carrier_accounts (
  id             uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier        carrier_code NOT NULL,
  name           varchar(150) NOT NULL,
  credential_id  uuid         NOT NULL REFERENCES integration_credentials(id),
  is_active      boolean      NOT NULL DEFAULT true
);

CREATE TABLE shipments (
  id                  uuid            PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_account_id  uuid            NOT NULL REFERENCES carrier_accounts(id),
  stock_document_id   uuid            NOT NULL REFERENCES stock_documents(id),
  tracking_no         varchar(50)     NOT NULL,
  status              shipment_status NOT NULL DEFAULT 'CREATED',
  cod_amount          dm_amount       NOT NULL DEFAULT 0,
  shipping_fee        dm_amount,
  delivered_at        timestamptz,
  raw                 jsonb,
  created_at          timestamptz     NOT NULL DEFAULT now(),
  created_by          uuid            REFERENCES users(id),
  UNIQUE (carrier_account_id, tracking_no)
);

CREATE TABLE shipment_events (
  id           bigint          GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  shipment_id  uuid            NOT NULL REFERENCES shipments(id),
  event_time   timestamptz     NOT NULL,
  status       shipment_status NOT NULL,
  description  text,
  UNIQUE (shipment_id, event_time, status)
);

CREATE TABLE cod_remittances (
  id                  uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_account_id  uuid         NOT NULL REFERENCES carrier_accounts(id),
  external_ref        varchar(100) NOT NULL,
  remittance_date     date         NOT NULL,
  total_cod_vnd       dm_amount    NOT NULL,
  total_fee_vnd       dm_amount    NOT NULL DEFAULT 0,
  net_vnd             dm_amount    NOT NULL,
  cash_document_id    uuid         REFERENCES cash_documents(id),
  UNIQUE (carrier_account_id, external_ref)
);

CREATE TABLE cod_remittance_lines (
  remittance_id  uuid      NOT NULL REFERENCES cod_remittances(id),
  shipment_id    uuid      NOT NULL REFERENCES shipments(id),
  cod_vnd        dm_amount NOT NULL,
  fee_vnd        dm_amount NOT NULL DEFAULT 0,
  PRIMARY KEY (remittance_id, shipment_id)
);

-- ===== Webhook (FR-INT-015) =====
CREATE TABLE webhook_subscriptions (
  id                 uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  api_client_id      uuid         REFERENCES api_clients(id),
  url                varchar(500) NOT NULL CHECK (url LIKE 'https://%'),
  event_types        text[]       NOT NULL,  -- 'sales_order.confirmed', 'customer_invoice.issued'…
  secret_ciphertext  bytea        NOT NULL,
  secret_key_id      varchar(100) NOT NULL,
  is_active          boolean      NOT NULL DEFAULT true,
  created_at         timestamptz  NOT NULL DEFAULT now(),
  created_by         uuid         REFERENCES users(id)
);

CREATE TYPE webhook_delivery_status AS ENUM ('PENDING','DELIVERED','FAILED','DEAD');

CREATE TABLE webhook_deliveries (
  id               bigint                  GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  subscription_id  uuid                    NOT NULL REFERENCES webhook_subscriptions(id),
  event_id         uuid                    NOT NULL,  -- gửi kèm để bên nhận chống trùng / sent for receiver-side dedup
  event_type       varchar(100)            NOT NULL,
  payload          jsonb                   NOT NULL,
  status           webhook_delivery_status NOT NULL DEFAULT 'PENDING',
  attempts         smallint                NOT NULL DEFAULT 0,
  next_attempt_at  timestamptz             NOT NULL DEFAULT now(),
  response_status  smallint,
  last_error       text,
  delivered_at     timestamptz,
  created_at       timestamptz             NOT NULL DEFAULT now(),
  UNIQUE (subscription_id, event_id)
);
CREATE INDEX webhook_deliveries_due ON webhook_deliveries (next_attempt_at) WHERE status IN ('PENDING','FAILED');

-- ===== Chữ ký số / Digital signatures (FR-INT-016) =====
CREATE TYPE signing_method    AS ENUM ('USB_TOKEN','REMOTE');
CREATE TYPE signature_status  AS ENUM ('PENDING','SIGNED','FAILED','CANCELLED');

CREATE TABLE signature_requests (
  id                   uuid             PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type          varchar(50)      NOT NULL,  -- 'employment_contract', 'balance_confirmation'…
  entity_id            uuid             NOT NULL,
  file_id              uuid             NOT NULL REFERENCES stored_files(id),
  signed_file_id       uuid             REFERENCES stored_files(id),
  signer_user_id       uuid             NOT NULL REFERENCES users(id),
  method               signing_method   NOT NULL,
  credential_id        uuid             REFERENCES integration_credentials(id),  -- dịch vụ ký từ xa / remote signing service
  certificate_serial   varchar(100),
  certificate_subject  text,
  status               signature_status NOT NULL DEFAULT 'PENDING',
  signed_at            timestamptz,
  external_ref         varchar(100),
  last_error           text,
  created_at           timestamptz      NOT NULL DEFAULT now(),
  CHECK (status <> 'SIGNED' OR signed_file_id IS NOT NULL)
);
CREATE INDEX ON signature_requests (entity_type, entity_id);
```

</details>
