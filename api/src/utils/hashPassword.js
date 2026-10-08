import bcryptjs from "bcryptjs";

const SALT_ROUNDS = 10;

export const hashPassword = (password) => bcryptjs.hash(password, SALT_ROUNDS);

export const comparePassword = (password, passwordHash) =>
  bcryptjs.compare(password, passwordHash);
