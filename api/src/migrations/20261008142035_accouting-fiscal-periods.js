// docs/phase-02-organization-master-data/07-accounting-finance.md — mục 3
// Chạy sau: 20261008090100_p2-system-administration (btree_gist cho EXCLUDE)

// created_by / updated_by không ON DELETE CASCADE (FR-SYS-004, BR-SYS-002)
const auditColumns = (knex, table) => {
  table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  table.uuid("created_by").references("id").inTable("users");
  table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  table.uuid("updated_by").references("id").inTable("users");
};

export const up = async function (knex) {
  await knex.raw(`CREATE TYPE period_status AS ENUM ('OPEN', 'LOCKED');`);

  // FR-ACC-002: năm tài chính có thể khác năm dương lịch
  await knex.schema.createTable("fiscal_years", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("code", 20).notNullable().unique(); // vd 'FY2026'
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();
    table.specificType("status", "period_status").notNullable().defaultTo("OPEN");
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
    table.check("?? > ??", ["end_date", "start_date"], "fiscal_years_date_range");
  });

  // FR-ACC-002: kỳ theo tháng, tới 15 kỳ cho năm tài chính đầu tiên dài hơn 12 tháng
  await knex.schema.createTable("fiscal_periods", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.uuid("fiscal_year_id").notNullable().references("id").inTable("fiscal_years");
    table.smallint("period_no").notNullable().checkBetween([1, 15], "fiscal_periods_period_no_check");
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();
    table.specificType("status", "period_status").notNullable().defaultTo("OPEN");
    table.timestamp("locked_at");
    table.uuid("locked_by").references("id").inTable("users");
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
    table.unique(["fiscal_year_id", "period_no"]);
    table.check("?? >= ??", ["end_date", "start_date"], "fiscal_periods_date_range");
  });

  // FR-ACC-002: các năm / các kỳ không chồng lấn thời gian
  await knex.raw(`
    ALTER TABLE fiscal_years ADD CONSTRAINT fiscal_years_no_overlap
      EXCLUDE USING gist (daterange(start_date, end_date, '[]') WITH &&);
    ALTER TABLE fiscal_periods ADD CONSTRAINT fiscal_periods_no_overlap
      EXCLUDE USING gist (daterange(start_date, end_date, '[]') WITH &&);
  `);
};

export const down = async function (knex) {
  await knex.schema.dropTableIfExists("fiscal_periods").dropTableIfExists("fiscal_years");
  await knex.raw(`DROP TYPE IF EXISTS period_status;`);
};
