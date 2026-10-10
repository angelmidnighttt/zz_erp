import pino from "pino";

// viet 1 file request context de giu thong tin cua request dang chay trong process cua node
import { requestContext } from "./request-context.js";

// muc dich : log json 1 dong, kem id de truy vet request tu dau den khi finish, khong chua du lieu nhay cam nhu password, token, ...

//vua lam vua doc docs chu minh cung k nam :v
export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: { service: "api", env: process.env.NODE_ENV ?? "development" },
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  mixin: () => ({ ...requestContext.getStore() }),
  //du lieu nhay cam
  redact: {
    paths: [
      "password",
      "*.password",
      "password_hash",
      "*.password_hash",
      "token",
      "*.token",
      "accessToken",
      "*.accessToken",
      "refreshToken",
      "*.refreshToken",
      "req.headers.authorization",
      "*.req.headers.cookie",
    ],
    censor: "REDACTED",
  },
});
