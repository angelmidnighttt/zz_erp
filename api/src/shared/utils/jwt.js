import jwt from "jsonwebtoken";
import { createHash, randomUUID } from "node:crypto";

const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const createAccessToken = ({ id, email }) =>
  jwt.sign({ id, email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

// jwtid de 2 token tao trong cung 1 giay van khac nhau (token_hash la unique)
const createRefreshToken = ({ id, email }) =>
  jwt.sign({ id, email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_TTL_MS / 1000,
    jwtid: randomUUID(),
  });

const verifyAccessToken = (token) =>
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

const verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

// DB chi luu hash cua refresh token, lo DB cung khong dung lai duoc token
const hashToken = (token) => createHash("sha256").update(token).digest("hex");

export {
  REFRESH_TOKEN_TTL_MS,
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  hashToken,
};
