import ApiError from "../utils/ApiError.js";
import { hasPermission } from "../helpers/hasPerrmission.js";
export const requirePermission = (permissionCode, action) => {
  return (req, res, next) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");

    if (!hasPermission(req.user.id, permissionCode, action))
      throw new ApiError(403, "Forbidden");
    next();
  };
};
