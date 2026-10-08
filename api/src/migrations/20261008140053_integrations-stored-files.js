/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const auditColumns = (knex, table) => {
  table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  table.uuid("created_by").references("id").inTable("users");
  table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  table.uuid("updated_by").references("id").inTable("users");
};
exports.up = async function (knex) {
  // chi luu metadata, file se luu o S3 hoac cloudinary
  await knex.schema.createTable("stored_files", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("storage_bucket", 63).notNullable();
    table.string("storage_key", 500).notNullable();
    table.string("original_name", 255).notNullable();
    table.string("content_type", 100).notNullable();
    table.bigInteger("size_bytes").notNullable();
    table.specificType("checksum_sha256", "char(64)").notNullable();
    table.boolean("is_encrypted").notNullable().defaultTo(true);
    auditColumns(knex, table);
    table.unique(["storage_bucket", "storage_key"]);
    table.check("?? >= 0", ["size_bytes"], "stored_files_size_bytes_check");
  });

  //table luu third-party
  await knex.schema.createTable("integrations_credentials", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("provider_code", 50).notNullable();
    table.string("name", 150).notNullable();
    table.jsonb("config").notNullable();
    table.binary("secret_ciphertext").notNullable();
    table.string("secret_key_id", 100).notNullable();
    table.string("secret_hint", 20);
    table.boolean("is_active").notNullable().defaultTo(true);
    table.integer("version").notNullable().defaultTo(1);
    auditColumns(knex, table);
    table.unique(["provider_code", "name"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema
    .dropTableIfExists("integrations_credentials")
    .dropTableIfExists("stored_files");
};
