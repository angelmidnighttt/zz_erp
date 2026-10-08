import ApiError from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) throw new ApiError(401, "Unauthorized");
  const token = header.split(" ")[1];
  if (!token) throw new ApiError(401, "Unauthorized");
  try {
    // ae nho bat eslint de clean code, co the bao warning console.log de clean tren production
    console.log("come here");
    req.user = verifyAccessToken(token);
  } catch {
    throw new ApiError(401, "Unauthorized");
  }
  next();
};
