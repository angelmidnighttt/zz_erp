import ApiError from "../utils/ApiError.js";
import { hasPermission } from "../helpers/hasPermission.js";

export const requirePermission = (functionCode, action) => {
  return async (req, res, next) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const allowed = await hasPermission({
      userId: req.user.id,
      functionCode,
      action,
    });
    if (!allowed) throw new ApiError(403, "Forbidden");
    next();
  };
};
