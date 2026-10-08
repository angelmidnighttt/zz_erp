import jwt from "jsonwebtoken";

const createAccessToken = ({ id, email }) =>
  jwt.sign({ id, email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

const createRefreshToken = ({ id, email }) =>
  jwt.sign({ id, email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

const verifyAccessToken = (token) =>
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

export { createAccessToken, createRefreshToken, verifyAccessToken };
