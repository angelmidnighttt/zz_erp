/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const AUDIT_FKS = [
  ["users", "created_by"],
  ["users", "updated_by"],
  ["user_roles", "assigned_by"],
  ["refresh_tokens", "created_by"],
  ["refresh_tokens", "updated_by"],
];

// hien tai dang nham khi user a tao user b, khi xoa user a thi user b cung bi xoa -> fix loi nay
const recreateAuditFks = async (knex, onDelete) => {
  for (const [tableName, column] of AUDIT_FKS) {
    await knex.schema.alterTable(tableName, (table) => {
      table.dropForeign(column);
    });
    await knex.schema.alterTable(tableName, (table) => {
      const fk = table
        .foreign(column)
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE");
      if (onDelete) fk.onDelete(onDelete);
    });
  }
};

exports.up = async function (knex) {
  await recreateAuditFks(knex);

  await knex.raw(`
        CREATE FUNCTION trg_users_revoke_tokens_on_lock() RETURNS trigger
        LANGUAGE plpgsql AS $$
        BEGIN
            UPDATE refresh_tokens
                SET revoked_at = now()
            WHERE user_id = NEW.id
                AND revoked_at IS NULL;
            RETURN NEW;
        END;
        $$;

        CREATE TRIGGER users_revoke_tokens_on_lock
        AFTER UPDATE OF is_locked ON users
        FOR EACH ROW
        WHEN (NEW.is_locked AND NOT OLD.is_locked)
        EXECUTE PROCEDURE trg_users_revoke_tokens_on_lock();
        `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`   
        DROP TRIGGER IF EXISTS users_revoke_tokens_on_lock ON users;
        DROP FUNCTION IF EXISTS trg_users_revoke_tokens_on_lock();
        `);

  await recreateAuditFks(knex, "CASCADE");
};
