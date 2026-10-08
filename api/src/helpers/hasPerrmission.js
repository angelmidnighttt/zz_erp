import database from "../configs/database.js";

export const hasPermission = async (userId, permissionCode, action) => {
  const checkPerrmission = await database("user_roles as ur")
    .join("roles as r", "ur.role_id", "r.id")
    .join("role_permissions as rp", "r.id", "rp.role_id")
    .where({ user_id: userId, function_code: permissionCode, action: action })
    .first();
  return checkPerrmission ? true : false;
};
