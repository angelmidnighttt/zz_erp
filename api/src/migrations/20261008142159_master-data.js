// docs/phase-02-organization-master-data/03-master-data.md — mục 4
// Chạy sau: 20261008090100_p2-system-administration (dm_*, f_unaccent, pg_trgm, btree_gist,
// company_profile, branches, departments), 20261008090200_p2-accounting-fiscal-periods
// Dữ liệu khởi tạo (currencies, taxes, payment_*) nằm ở seeds/04-master-data.js
// BR-MDM-003: khóa ngoại không cascade; ngừng dùng bằng is_active = false

// created_by / updated_by không ON DELETE CASCADE (FR-SYS-004, BR-SYS-002)
const auditColumns = (knex, table) => {
  table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  table.uuid("created_by").references("id").inTable("users");
  table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  table.uuid("updated_by").references("id").inTable("users");
};

export const up = async function (knex) {
  await knex.raw(`
    CREATE TYPE exchange_rate_source AS ENUM ('MANUAL', 'FILE');
    CREATE TYPE vat_category AS ENUM ('RATED', 'NOT_SUBJECT', 'NOT_DECLARED'); -- có thuế suất / KCT / KKKNT
    CREATE TYPE payment_term_type AS ENUM ('IMMEDIATE', 'NET_DAYS', 'EOM_PLUS_DAYS');
    CREATE TYPE payment_method_type AS ENUM ('CASH', 'BANK_TRANSFER', 'CARD', 'NETTING');
    CREATE TYPE product_type AS ENUM ('STOCKABLE', 'CONSUMABLE', 'SERVICE');
    CREATE TYPE warehouse_type AS ENUM ('NORMAL', 'IN_TRANSIT', 'CONSIGNMENT', 'DEFECTIVE');
    CREATE TYPE partner_group_type AS ENUM ('CUSTOMER', 'SUPPLIER', 'BOTH');
    CREATE TYPE partner_kind AS ENUM ('ORGANIZATION', 'INDIVIDUAL');
  `);

  // ===== Tiền tệ & tỷ giá (FR-MDM-016) =====
  await knex.schema.createTable("currencies", function (table) {
    table.specificType("code", "char(3)").primary().checkRegex("^[A-Z]{3}$", "currencies_code_check"); // ISO 4217
    table.string("name", 100).notNullable();
    table.string("name_en", 100).notNullable();
    table.string("symbol", 10).notNullable();
    table.smallint("decimals").notNullable().defaultTo(2).checkBetween([0, 4], "currencies_decimals_check");
    table.string("words_major_vi", 30).notNullable(); // 'đồng', 'đô la Mỹ'
    table.string("words_minor_vi", 30); // 'xu', 'cent'
    table.string("words_major_en", 30).notNullable(); // 'dong', 'US dollars'
    table.string("words_minor_en", 30);
    table.boolean("is_active").notNullable().defaultTo(true);
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
  });

  // FR-SYS-001: đồng tiền hạch toán phải có trong danh mục tiền tệ
  await knex.schema.alterTable("company_profile", function (table) {
    table.foreign("functional_currency_code", "company_profile_currency_fk").references("code").inTable("currencies");
  });

  // BR-MDM-005: tra tỷ giá gần nhất rate_date <= ngày chứng từ; không lưu dòng cho VND (tỷ giá = 1)
  await knex.schema.createTable("exchange_rates", function (table) {
    table.specificType("currency_code", "char(3)").notNullable().references("code").inTable("currencies");
    table.date("rate_date").notNullable();
    table.specificType("buying_rate", "dm_rate");
    table.specificType("selling_rate", "dm_rate");
    table.specificType("transfer_rate", "dm_rate").notNullable();
    table.specificType("source", "exchange_rate_source").notNullable().defaultTo("MANUAL");
    auditColumns(knex, table);
    table.primary(["currency_code", "rate_date"]);
  });

  // ===== Thuế suất (FR-MDM-017) =====
  await knex.schema.createTable("taxes", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("code", 20).notNullable().unique(); // 'VAT10', 'VAT8', 'VAT5', 'VAT0', 'KCT', 'KKKNT'
    table.string("name", 100).notNullable();
    table.string("name_en", 100).notNullable();
    table.specificType("category", "vat_category").notNullable().defaultTo("RATED");
    table.specificType("rate", "dm_pct"); // NULL khi KCT / KKKNT
    table.date("valid_from").notNullable();
    table.date("valid_to");
    table.string("input_account_code", 20); // vd 1331 (FK ở P9)
    table.string("output_account_code", 20); // vd 33311
    table.boolean("is_active").notNullable().defaultTo(true);
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
    table.check("(?? = 'RATED') = (?? IS NOT NULL)", ["category", "rate"], "taxes_rate_by_category");
    table.check("?? IS NULL OR ?? >= ??", ["valid_to", "valid_to", "valid_from"], "taxes_valid_range");
  });

  // ===== Thanh toán (FR-MDM-018 – 020) =====
  await knex.schema.createTable("payment_terms", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("code", 20).notNullable().unique();
    table.string("name", 100).notNullable();
    table.string("name_en", 100).notNullable();
    table.specificType("term_type", "payment_term_type").notNullable();
    table.smallint("days").notNullable().defaultTo(0);
    table.boolean("is_active").notNullable().defaultTo(true);
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
    table.check("?? >= 0", ["days"], "payment_terms_days_check");
    table.check("?? <> 'IMMEDIATE' OR ?? = 0", ["term_type", "days"], "payment_terms_immediate_no_days");
  });

  await knex.schema.createTable("payment_methods", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("code", 20).notNullable().unique();
    table.string("name", 100).notNullable();
    table.string("name_en", 100).notNullable();
    table.specificType("method_type", "payment_method_type").notNullable();
    table.string("default_account_code", 20); // 1111 / 1121… (FK ở P9)
    table.boolean("is_active").notNullable().defaultTo(true);
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
  });

  // FR-MDM-020: tài khoản ngân hàng của công ty (TK 112x)
  await knex.schema.createTable("company_bank_accounts", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("account_no", 30).notNullable();
    table.string("account_name", 255).notNullable();
    table.string("bank_name", 150).notNullable();
    table.string("bank_branch", 150);
    table.specificType("currency_code", "char(3)").notNullable().references("code").inTable("currencies");
    table.string("gl_account_code", 20).notNullable(); // 112x (FK ở P9)
    table.uuid("branch_id").references("id").inTable("branches");
    table.boolean("is_active").notNullable().defaultTo(true);
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
    table.unique(["bank_name", "account_no"]);
  });

  // ===== Sản phẩm (FR-MDM-001 – 003) =====
  await knex.schema.createTable("uoms", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("code", 20).notNullable().unique();
    table.string("name", 50).notNullable();
    table.string("name_en", 50).notNullable();
    table.boolean("is_active").notNullable().defaultTo(true);
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
  });

  // FR-MDM-002: cây nhóm sản phẩm
  await knex.schema.createTable("product_categories", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("code", 30).notNullable().unique();
    table.string("name", 255).notNullable();
    table.string("name_en", 255);
    table.uuid("parent_id").references("id").inTable("product_categories").index();
    table.uuid("default_tax_id").references("id").inTable("taxes"); // sản phẩm kế thừa nếu không khai riêng
    table.boolean("is_active").notNullable().defaultTo(true);
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
    table.check("?? <> ??", ["parent_id", "id"], "product_categories_parent_not_self");
  });

  // FR-MDM-001; BR-MDM-002: service chặn đổi base_uom_id khi đã có stock_moves
  await knex.schema.createTable("products", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("code", 50).notNullable().unique();
    table.string("name", 255).notNullable();
    table.string("name_en", 255);
    table.specificType("product_type", "product_type").notNullable().defaultTo("STOCKABLE"); // BR-MDM-006
    table.uuid("category_id").notNullable().references("id").inTable("product_categories").index();
    table.uuid("base_uom_id").notNullable().references("id").inTable("uoms");
    table.string("barcode", 50).unique();
    table.string("brand", 100);
    table.text("specification");
    table.decimal("weight_kg", 12, 4);
    table.decimal("length_cm", 10, 2);
    table.decimal("width_cm", 10, 2);
    table.decimal("height_cm", 10, 2);
    table.uuid("default_tax_id").references("id").inTable("taxes"); // NULL = theo nhóm
    table.specificType("ref_sale_price", "dm_price");
    table.specificType("ref_purchase_price", "dm_price");
    table.boolean("is_active").notNullable().defaultTo(true);
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
  });

  // FR-MDM-003: không cần dòng cho đơn vị cơ bản (hệ số 1)
  await knex.schema.createTable("product_uoms", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.uuid("product_id").notNullable().references("id").inTable("products");
    table.uuid("uom_id").notNullable().references("id").inTable("uoms");
    table.specificType("factor", "dm_rate").notNullable(); // 1 thùng = 24 chai → factor = 24
    table.string("barcode", 50).unique();
    table.boolean("is_active").notNullable().defaultTo(true);
    auditColumns(knex, table);
    table.unique(["product_id", "uom_id"]);
  });

  // ===== Nhân viên & kho (FR-MDM-021, FR-MDM-022) =====
  await knex.schema.createTable("employees", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("code", 20).notNullable().unique();
    table.string("full_name", 150).notNullable();
    table.uuid("department_id").references("id").inTable("departments");
    table.string("job_title", 100);
    table.string("email", 255);
    table.string("phone", 30);
    table.boolean("is_active").notNullable().defaultTo(true);
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
  });

  // FR-SYS-004 (mở rộng P2): liên kết người dùng với nhân viên
  await knex.schema.alterTable("users", function (table) {
    table.uuid("employee_id").unique().references("id").inTable("employees");
  });

  // FR-SYS-002, FR-SYS-003: người phụ trách chi nhánh / trưởng phòng ban
  await knex.schema.alterTable("branches", function (table) {
    table.foreign("manager_employee_id", "branches_manager_fk").references("id").inTable("employees");
  });
  await knex.schema.alterTable("departments", function (table) {
    table.foreign("head_employee_id", "departments_head_fk").references("id").inTable("employees");
  });

  // FR-MDM-021: kho thuộc chi nhánh, có loại kho
  await knex.schema.createTable("warehouses", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("code", 20).notNullable().unique();
    table.string("name", 255).notNullable();
    table.string("name_en", 255);
    table.uuid("branch_id").notNullable().references("id").inTable("branches");
    table.text("address");
    table.uuid("keeper_employee_id").references("id").inTable("employees");
    table.specificType("warehouse_type", "warehouse_type").notNullable().defaultTo("NORMAL");
    table.boolean("is_active").notNullable().defaultTo(true);
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
  });

  // ===== Bảng giá bán (FR-MDM-025) =====
  await knex.schema.createTable("price_lists", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("code", 30).notNullable().unique();
    table.string("name", 255).notNullable();
    table.string("name_en", 255);
    table.specificType("currency_code", "char(3)").notNullable().defaultTo("VND").references("code").inTable("currencies");
    table.boolean("prices_include_tax").notNullable().defaultTo(false); // FR-SAL-009
    table.boolean("is_default").notNullable().defaultTo(false); // bảng giá chung (FR-SAL-007)
    table.boolean("is_active").notNullable().defaultTo(true);
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
  });

  await knex.schema.createTable("price_list_items", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.uuid("price_list_id").notNullable().references("id").inTable("price_lists");
    table.uuid("product_id").notNullable().references("id").inTable("products");
    table.uuid("uom_id").notNullable().references("id").inTable("uoms");
    table.specificType("price", "dm_price").notNullable();
    table.date("valid_from").notNullable();
    table.date("valid_to"); // NULL = không thời hạn
    auditColumns(knex, table);
    table.check("?? >= 0", ["price"], "price_list_items_price_check");
    table.check("?? IS NULL OR ?? >= ??", ["valid_to", "valid_to", "valid_from"], "price_list_items_valid_range");
  });

  // ===== Đối tác (FR-MDM-009 – 014) =====
  // FR-MDM-014
  await knex.schema.createTable("partner_groups", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("code", 30).notNullable().unique();
    table.string("name", 255).notNullable();
    table.string("name_en", 255);
    table.specificType("group_type", "partner_group_type").notNullable().defaultTo("CUSTOMER");
    table.uuid("price_list_id").references("id").inTable("price_lists"); // bảng giá của nhóm
    table.boolean("is_active").notNullable().defaultTo(true);
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
  });

  // FR-MDM-009: một bảng cho cả khách hàng và nhà cung cấp
  await knex.schema.createTable("partners", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("code", 50).notNullable().unique();
    table.string("name", 255).notNullable();
    table.string("name_en", 255);
    table.string("short_name", 100);
    table.specificType("partner_kind", "partner_kind").notNullable().defaultTo("ORGANIZATION");
    table.boolean("is_customer").notNullable().defaultTo(false);
    table.boolean("is_supplier").notNullable().defaultTo(false);
    table.specificType("tax_code", "dm_tax_code").index(); // FR-MDM-012
    table.text("billing_address");
    table.string("phone", 30);
    table.string("email", 255);
    table.string("einvoice_email", 255);
    table.specificType("currency_code", "char(3)").notNullable().defaultTo("VND").references("code").inTable("currencies");
    // Khách hàng (FR-MDM-010)
    table.uuid("customer_group_id").references("id").inTable("partner_groups");
    table.uuid("salesperson_id").references("id").inTable("employees");
    table.uuid("price_list_id").references("id").inTable("price_lists");
    table.uuid("customer_payment_term_id").references("id").inTable("payment_terms");
    table.specificType("credit_limit", "dm_amount"); // NULL = không giới hạn
    table.smallint("max_overdue_days");
    table.string("receivable_account_code", 20); // 131 (FK ở P9)
    // Nhà cung cấp (FR-MDM-011)
    table.uuid("supplier_group_id").references("id").inTable("partner_groups");
    table.uuid("supplier_payment_term_id").references("id").inTable("payment_terms");
    table.smallint("lead_time_days");
    table.string("incoterm", 3); // FOB, CIF…
    table.string("payable_account_code", 20); // 331 (FK ở P9)
    table.boolean("is_active").notNullable().defaultTo(true);
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
    table.check("?? >= 0", ["credit_limit"], "partners_credit_limit_check");
    table.check("?? >= 0", ["max_overdue_days"], "partners_max_overdue_days_check");
    table.check("?? >= 0", ["lead_time_days"], "partners_lead_time_days_check");
    table.check("?? OR ??", ["is_customer", "is_supplier"], "partners_customer_or_supplier");
  });

  await knex.schema.createTable("partner_addresses", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.uuid("partner_id").notNullable().references("id").inTable("partners").index();
    table.string("label", 100);
    table.text("address").notNullable();
    table.string("receiver", 150);
    table.string("phone", 30);
    table.boolean("is_default").notNullable().defaultTo(false);
    table.boolean("is_active").notNullable().defaultTo(true);
    auditColumns(knex, table);
  });

  await knex.schema.createTable("partner_contacts", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.uuid("partner_id").notNullable().references("id").inTable("partners").index();
    table.string("full_name", 150).notNullable();
    table.string("job_title", 100);
    table.string("phone", 30);
    table.string("email", 255);
    table.boolean("is_primary").notNullable().defaultTo(false);
    table.boolean("is_active").notNullable().defaultTo(true);
    auditColumns(knex, table);
  });

  await knex.schema.createTable("partner_bank_accounts", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.uuid("partner_id").notNullable().references("id").inTable("partners");
    table.string("account_no", 30).notNullable();
    table.string("account_name", 255).notNullable();
    table.string("bank_name", 150).notNullable();
    table.string("bank_branch", 150);
    table.specificType("currency_code", "char(3)").notNullable().defaultTo("VND").references("code").inTable("currencies");
    table.boolean("is_default").notNullable().defaultTo(false);
    table.boolean("is_active").notNullable().defaultTo(true);
    auditColumns(knex, table);
    table.unique(["partner_id", "bank_name", "account_no"]);
  });

  // Index biểu thức / index một phần / EXCLUDE — builder không hỗ trợ
  await knex.raw(`
    -- FR-SYS-028: tìm không dấu; truy vấn phải dùng đúng biểu thức này
    CREATE INDEX products_search_idx ON products
      USING gin (lower(f_unaccent(code || ' ' || name)) gin_trgm_ops);
    CREATE INDEX employees_search_idx ON employees
      USING gin (lower(f_unaccent(code || ' ' || full_name)) gin_trgm_ops);
    CREATE INDEX partners_search_idx ON partners
      USING gin (lower(f_unaccent(code || ' ' || name)) gin_trgm_ops);

    -- FR-SAL-007: mỗi đồng tiền tối đa một bảng giá chung
    CREATE UNIQUE INDEX price_lists_one_default ON price_lists (currency_code) WHERE is_default;

    -- FR-MDM-025: dòng giá cùng sản phẩm + đơn vị tính không chồng lấn thời gian hiệu lực
    ALTER TABLE price_list_items ADD CONSTRAINT price_list_items_no_overlap
      EXCLUDE USING gist (price_list_id WITH =, product_id WITH =, uom_id WITH =,
                          daterange(valid_from, valid_to, '[]') WITH &&);

    -- mỗi đối tác tối đa một địa chỉ giao hàng mặc định
    CREATE UNIQUE INDEX partner_addresses_one_default ON partner_addresses (partner_id) WHERE is_default;
  `);
};

export const down = async function (knex) {
  await knex.schema
    .dropTableIfExists("partner_bank_accounts")
    .dropTableIfExists("partner_contacts")
    .dropTableIfExists("partner_addresses")
    .dropTableIfExists("partners")
    .dropTableIfExists("partner_groups")
    .dropTableIfExists("price_list_items")
    .dropTableIfExists("price_lists")
    .dropTableIfExists("warehouses");

  // gỡ các FK / cột đã thêm vào bảng của migration trước, rồi mới xóa employees
  await knex.schema.alterTable("departments", function (table) {
    table.dropForeign("head_employee_id", "departments_head_fk");
  });
  await knex.schema.alterTable("branches", function (table) {
    table.dropForeign("manager_employee_id", "branches_manager_fk");
  });
  await knex.schema.alterTable("users", function (table) {
    table.dropColumn("employee_id"); // kéo theo users_employee_id_unique / _foreign
  });

  await knex.schema
    .dropTableIfExists("employees")
    .dropTableIfExists("product_uoms")
    .dropTableIfExists("products")
    .dropTableIfExists("product_categories")
    .dropTableIfExists("uoms")
    .dropTableIfExists("company_bank_accounts")
    .dropTableIfExists("payment_methods")
    .dropTableIfExists("payment_terms")
    .dropTableIfExists("taxes")
    .dropTableIfExists("exchange_rates");

  await knex.schema.alterTable("company_profile", function (table) {
    table.dropForeign("functional_currency_code", "company_profile_currency_fk");
  });
  await knex.schema.dropTableIfExists("currencies");

  await knex.raw(`
    DROP TYPE IF EXISTS partner_kind;
    DROP TYPE IF EXISTS partner_group_type;
    DROP TYPE IF EXISTS warehouse_type;
    DROP TYPE IF EXISTS product_type;
    DROP TYPE IF EXISTS payment_method_type;
    DROP TYPE IF EXISTS payment_term_type;
    DROP TYPE IF EXISTS vat_category;
    DROP TYPE IF EXISTS exchange_rate_source;
  `);
};
// le ra 1 module chia ra 1 schema db ma minh quen mat, lo roi lam vay luon