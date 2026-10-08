import database from "../configs/database.js";

export const hasPermission = async ({ userId, functionCode, action }) => {
  const permission = await database("user_roles as ur")
    .join("roles as r", "ur.role_id", "r.id")
    .join("role_permissions as rp", "r.id", "rp.role_id")
    .where({
      "ur.user_id": userId,
      "rp.function_code": functionCode,
      "rp.action": action,
    })
    .first("rp.action");
  return Boolean(permission);
};
