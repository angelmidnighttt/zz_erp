import {
  APP_FUNCTIONS,
  ROLES,
  DEFAULT_MATRIX,
  ACTIONS,
} from "../constant/permission.js";

//use onConflict to ignore duplicate seed
export const seed = async (knex) => {
  await knex("app_functions").insert(APP_FUNCTIONS).onConflict("code").merge();
  await knex("roles")
    .insert(ROLES.map((r) => ({ ...r, is_system: true })))
    .onConflict("code")
    .merge();

  const roleIdByCode = Object.fromEntries(
    (await knex("roles").select("id", "code")).map((r) => [r.code, r.id]),
  );
  const rows = Object.entries(DEFAULT_MATRIX).flatMap(([functionCode, cells]) =>
    Object.entries(cells).flatMap(([roleCode, letters]) =>
      [...letters].map((l) => ({
        role_id: roleIdByCode[roleCode],
        function_code: functionCode,
        action: ACTIONS[l],
      })),
    ),
  );
  await knex("role_permissions")
    .insert(rows)
    .onConflict(["role_id", "function_code", "action"])
    .ignore();
};
