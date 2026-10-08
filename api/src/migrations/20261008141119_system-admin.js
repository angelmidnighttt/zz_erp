// docs/phase-02-organization-master-data/02-system-administration.md — mục 4
// Chạy sau: 20261008090000_p2-integrations-stored-files (stored_files)
// users.employee_id và FK tới employees (manager / head) thêm ở migration 03-master-data

// created_by / updated_by không ON DELETE CASCADE (FR-SYS-004, BR-SYS-002)
const auditColumns = (knex, table) => {
  table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  table.uuid("created_by").references("id").inTable("users");
  table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  table.uuid("updated_by").references("id").inTable("users");
};

export const up = async function (knex) {
  await knex.raw(`
    CREATE EXTENSION IF NOT EXISTS unaccent;
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
    CREATE EXTENSION IF NOT EXISTS btree_gist;

    -- FR-SYS-028, NFR-L10N-004: unaccent() chỉ là STABLE nên phải bọc lại để dùng trong index
    CREATE FUNCTION f_unaccent(text) RETURNS text
    LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT
    AS $$ SELECT public.unaccent('public.unaccent'::regdictionary, $1) $$;

    -- NFR-DAT-001, BR-ACC-009: số thập phân chính xác, không dùng float
    CREATE DOMAIN dm_amount AS numeric(20,4);
    CREATE DOMAIN dm_qty    AS numeric(18,4);
    CREATE DOMAIN dm_price  AS numeric(20,6);
    CREATE DOMAIN dm_rate   AS numeric(18,6) CHECK (VALUE > 0);
    CREATE DOMAIN dm_pct    AS numeric(9,4)  CHECK (VALUE BETWEEN 0 AND 100);

    -- FR-MDM-012: 10 số, 10-3 số hoặc 12 số; chữ số kiểm tra kiểm ở tầng ứng dụng
    -- (viết dạng a|b|c thay cho "(-...)?" vì knex.raw coi "?" là binding)
    CREATE DOMAIN dm_tax_code AS varchar(14)
      CHECK (VALUE ~ '^([0-9]{10}|[0-9]{10}-[0-9]{3}|[0-9]{12})$');

    CREATE TYPE accounting_regime AS ENUM ('TT99_2025', 'TT133_2016');
    CREATE TYPE import_status AS ENUM ('UPLOADED', 'VALIDATING', 'VALIDATION_FAILED', 'IMPORTING', 'COMPLETED', 'FAILED');
  `);

  // FR-SYS-001: một pháp nhân → bảng chỉ có một dòng (id luôn = true)
  await knex.schema.createTable("company_profile", function (table) {
    table.boolean("id").primary().defaultTo(true);
    table.string("name", 255).notNullable();
    table.string("name_en", 255);
    table.string("short_name", 100);
    table.specificType("tax_code", "dm_tax_code").notNullable();
    table.text("address").notNullable();
    table.text("address_en");
    table.string("phone", 30);
    table.string("email", 255);
    table.string("website", 255);
    table.string("legal_representative", 150).notNullable();
    table.string("representative_title", 100);
    table.uuid("logo_file_id").references("id").inTable("stored_files");
    // FK tới currencies(code) thêm ở migration 03-master-data
    table.specificType("functional_currency_code", "char(3)").notNullable().defaultTo("VND");
    table.specificType("accounting_regime", "accounting_regime").notNullable();
    table.smallint("fiscal_year_start_month").notNullable().defaultTo(1).checkBetween([1, 12]);
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
    table.check("??", ["id"], "company_profile_single_row");
  });

  // FR-SYS-002
  await knex.schema.createTable("branches", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("code", 10).notNullable().unique(); // vd 'HN' trong SO-HN-2610-00001
    table.string("name", 255).notNullable();
    table.string("name_en", 255);
    table.text("address");
    table.specificType("tax_code", "dm_tax_code").checkRegex("^[0-9]{10}-[0-9]{3}$"); // MST chi nhánh 10-3
    table.uuid("manager_employee_id"); // FK thêm ở migration 03-master-data
    table.boolean("is_active").notNullable().defaultTo(true);
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
  });

  // FR-SYS-003: cây không giới hạn cấp; lấy phòng ban con bằng WITH RECURSIVE theo parent_id
  await knex.schema.createTable("departments", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("code", 20).notNullable().unique();
    table.string("name", 255).notNullable();
    table.string("name_en", 255);
    table.uuid("parent_id").references("id").inTable("departments").index();
    table.uuid("branch_id").references("id").inTable("branches"); // NULL = dùng chung
    table.uuid("head_employee_id"); // FK thêm ở migration 03-master-data
    table.boolean("is_active").notNullable().defaultTo(true);
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
    table.check("?? <> ??", ["parent_id", "id"], "departments_parent_not_self");
  });

  // FR-SYS-020: khóa – giá trị JSON; giai đoạn sau thêm khóa bằng seed, không đổi lược đồ
  await knex.schema.createTable("system_settings", function (table) {
    table.string("key", 100).primary();
    table.jsonb("value").notNullable();
    table.text("description");
    auditColumns(knex, table);
  });

  // FR-SYS-023: tham chiếu đa hình entity_type / entity_id, không có FK
  await knex.schema.createTable("attachments", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("entity_type", 50).notNullable(); // vd 'product', 'partner', 'sales_order'
    table.uuid("entity_id").notNullable();
    table.uuid("file_id").notNullable().references("id").inTable("stored_files");
    table.string("description", 255);
    auditColumns(knex, table);
    table.index(["entity_type", "entity_id"]);
  });

  // FR-SYS-026: mỗi lượt nhập chạy trong một giao dịch, lỗi theo dòng lưu ở errors
  await knex.schema.createTable("import_jobs", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("template_code", 50).notNullable(); // vd 'MDM.PRODUCT', 'OPENING_AR'
    table.uuid("file_id").notNullable().references("id").inTable("stored_files");
    table.specificType("status", "import_status").notNullable().defaultTo("UPLOADED");
    table.integer("total_rows");
    table.integer("error_rows");
    table.jsonb("errors"); // [{row, column, message_vi, message_en}]
    table.uuid("error_file_id").references("id").inTable("stored_files"); // tệp Excel có đánh dấu lỗi
    table.timestamp("started_at");
    table.timestamp("finished_at");
    auditColumns(knex, table);
  });
};

export const down = async function (knex) {
  await knex.schema
    .dropTableIfExists("import_jobs")
    .dropTableIfExists("attachments")
    .dropTableIfExists("system_settings")
    .dropTableIfExists("departments")
    .dropTableIfExists("branches")
    .dropTableIfExists("company_profile");

  // giữ lại extension: dùng chung, có thể đã có sẵn trước migration này
  await knex.raw(`
    DROP TYPE IF EXISTS import_status;
    DROP TYPE IF EXISTS accounting_regime;
    DROP DOMAIN IF EXISTS dm_tax_code;
    DROP DOMAIN IF EXISTS dm_pct;
    DROP DOMAIN IF EXISTS dm_rate;
    DROP DOMAIN IF EXISTS dm_price;
    DROP DOMAIN IF EXISTS dm_qty;
    DROP DOMAIN IF EXISTS dm_amount;
    DROP FUNCTION IF EXISTS f_unaccent(text);
  `);
};
