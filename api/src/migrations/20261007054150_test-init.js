export const up = function (knex) {
  return knex
    .raw(
      `
    create TYPE permission_action as ENUM ( 'VIEW', 'CREATE', 'EDIT', 'DELETE', 'APPROVE', 'CANCEL', 'PRINT', 'EXPORT', 'IMPORT' );
    `,
    )
    .then(() => {
      return knex.schema
        .createTable("users", function (table) {
          table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
          table.string("username").notNullable().unique();
          table.string("email").notNullable().unique();
          table.string("full_name").notNullable();
          table.string("password_hash").notNullable();
          table.boolean("is_locked").defaultTo(false);
          table.timestamp("password_changed_at");
          table.timestamp("last_login_at");
          table.timestamp("created_at").defaultTo(knex.fn.now());
          table.timestamp("updated_at").defaultTo(knex.fn.now());
          table
            .uuid("created_by")
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
          table
            .uuid("updated_by")
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        })
        .createTable("roles", function (table) {
          table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
          table.string("code").notNullable().unique();
          table.string("name_vi").notNullable();
          table.string("name_en").notNullable();
          table.string("description");
          table.boolean("is_system").defaultTo(false);
          table.boolean("is_active").defaultTo(true);
          table.timestamp("created_at").defaultTo(knex.fn.now());
          table.timestamp("updated_at").defaultTo(knex.fn.now());
          table
            .uuid("created_by")
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE");
          table
            .uuid("updated_by")
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE");
        })
        .createTable("app_functions", function (table) {
          table.string("code").notNullable().unique();
          table.string("module").notNullable();
          table.string("name_vi").notNullable();
          table.string("name_en").notNullable();
          table
            .specificType("supported_actions", "permission_action[]")
            .notNullable();
          table.boolean("is_active").defaultTo(true);
          table.integer("sort_order").defaultTo(0);
        })
        .createTable("user_roles", function (table) {
          table
            .uuid("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
          table
            .uuid("role_id")
            .notNullable()
            .references("id")
            .inTable("roles")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
          table.timestamp("assigned_at").defaultTo(knex.fn.now());
          table
            .uuid("assigned_by")
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
          table.primary(["user_id", "role_id"]);
        })
        .createTable("role_permissions", function (table) {
          table
            .uuid("role_id")
            .notNullable()
            .references("id")
            .inTable("roles")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
          table
            .string("function_code")
            .notNullable()
            .references("code")
            .inTable("app_functions")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
          table.string("action").notNullable();
          table.timestamp("created_at").defaultTo(knex.fn.now());
          table
            .uuid("created_by")
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE");
          table.primary(["role_id", "function_code", "action"]);
        })

        .createTable("refresh_tokens", function (table) {
          table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
          table
            .uuid("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
          table.string("token_hash").notNullable().unique();
          table.timestamp("expires_at").notNullable();
          table.timestamp("revoked_at");
          table
            .uuid("replaced_by_id")
            .references("id")
            .inTable("refresh_tokens");
          table.timestamp("created_at").defaultTo(knex.fn.now());
          table.timestamp("updated_at").defaultTo(knex.fn.now());
          table
            .uuid("created_by")
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
          table
            .uuid("updated_by")
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        });
    });
};

export const down = function (knex) {
  return knex.schema
    .dropTableIfExists("refresh_tokens")
    .dropTableIfExists("role_permissions")
    .dropTableIfExists("user_roles")
    .dropTableIfExists("app_functions")
    .dropTableIfExists("roles")
    .dropTableIfExists("users")
    .then(() => knex.raw("drop type if exists permission_action"));
};

export const config = { transaction: false };
