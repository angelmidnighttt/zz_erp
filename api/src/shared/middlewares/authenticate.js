import { requestContext } from "../logger/request-context.js";
import ApiError from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {
  const [scheme, token] = req.headers.authorization?.split(" ") ?? [];
  if (scheme !== "Bearer" || !token) throw new ApiError(401, "Unauthorized");

  try {
    req.user = verifyAccessToken(token);
    console.log("req.user", req.user);
  } catch {
    throw new ApiError(401, "Unauthorized");
  }

  // luu vao request context
  const context = requestContext.getStore();
  if (context) context.userId = req.user.id;
  next();
};
