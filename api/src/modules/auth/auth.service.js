import AuthRepo from "./auth.repo.js";
import { AUTH_EVENTS } from "./auth.events.js";
import { hashPassword, comparePassword } from "../../shared/utils/password.js";
import transaction from "../../shared/db/transaction.js";
import eventBus from "../../shared/events/event-bus.js";
import ApiError from "../../shared/utils/ApiError.js";
import {
  REFRESH_TOKEN_TTL_MS,
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
  hashToken,
} from "../../shared/utils/jwt.js";
import { logger } from "../../shared/logger/logger.js";

//test thu cai log
const securityLog = logger.child({ module: "auth", type: "security" });

class AuthService {
  // Tao refresh token va luu hash vao DB; id dung de noi token cu -> token moi khi rotate
  async #saveRefreshToken(user) {
    const refreshToken = createRefreshToken(user);
    const { id } = await AuthRepo.createRefreshToken({
      userId: user.id,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
    });
    return { id, refreshToken };
  }

  async login({ email, password }) {
    const existedUser = await AuthRepo.getUserByEmail({ email });
    // khong tim thay 1 phan tu se tra ve 404, nhung neu gia tri tra ve la 1 array nhung khong co phan tu nao thi van tra ve 200 va array null
    if (!existedUser) {
      securityLog.warn({ email }, "login failed: unknow email");
      throw new ApiError(404, "User not found");
    }

    const isValidPassword = await comparePassword(
      password,
      existedUser.password_hash,
    );
    if (!isValidPassword)
      throw new ApiError(401, "Invalid username or password");
    if (existedUser.is_locked) throw new ApiError(403, "Account is locked");

    await AuthRepo.updateLastLogin({ userId: existedUser.id });
    const { refreshToken } = await this.#saveRefreshToken(existedUser);
    return {
      id: existedUser.id,
      email: existedUser.email,
      token: {
        accessToken: createAccessToken(existedUser),
        refreshToken,
      },
    };
  }

  async createUser({ email, username, fullName, password }) {
    // bam mat khau truoc khi mo transaction de khong giu connection lau
    const passwordHash = await hashPassword(password);

    return transaction.run(async () => {
      const existedUser = await AuthRepo.getUserByEmail({ email });
      if (existedUser) throw new ApiError(400, "User already exists");

      const user = await AuthRepo.createUser({
        email,
        username,
        fullName,
        passwordHash,
      });
      await eventBus.emit(AUTH_EVENTS.USER_CREATED, { user });
      return user;
    });
  }

  async getRoles() {
    return AuthRepo.getRoles();
  }

  async assignRoles({ userId, rolesId }) {
    return transaction.run(async () => {
      const userRoles = await AuthRepo.assignRoles({ userId, rolesId });
      await eventBus.emit(AUTH_EVENTS.ROLES_ASSIGNED, { userId, rolesId });
      return userRoles;
    });
  }

  async getMe({ userId }) {
    console.log(userId);
    const rows = await AuthRepo.getPerrmissionsByUserId({ userId });
    const dataUser = Object.values(
      rows.reduce((acc, row) => {
        if (!acc[row.id]) {
          acc[row.id] = {
            id: row.id,
            email: row.email,
            full_name: row.full_name,
            permissions: [],
          };
        }
        acc[row.id].permissions.push({
          function_code: row.function_code,
          action: row.action,
        });
        return acc;
      }, {}),
    );
    return dataUser;
  }

  // Rotation: moi lan refresh thu hoi token cu va cap token moi
  async refreshToken({ refreshToken }) {
    if (!refreshToken) throw new ApiError(401, "Missing refresh token");

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new ApiError(401, "Invalid refresh token");
    }

    const user = await AuthRepo.getUserById({ userId: payload.id });
    if (!user || user.is_locked)
      throw new ApiError(401, "Invalid refresh token");

    return transaction.run(async () => {
      const newToken = await this.#saveRefreshToken(user);
      // token cu da bi thu hoi / het han thi throw -> rollback luon token moi vua tao
      const revoked = await AuthRepo.revokeRefreshToken({
        tokenHash: hashToken(refreshToken),
        replacedById: newToken.id,
      });
      if (!revoked) throw new ApiError(401, "Invalid refresh token");

      return {
        accessToken: createAccessToken(user),
        refreshToken: newToken.refreshToken,
      };
    });
  }

  async logout({ refreshToken }) {
    if (!refreshToken) return;
    await AuthRepo.revokeRefreshToken({ tokenHash: hashToken(refreshToken) });
  }

  async getUsers({ search, sort, page, pageSize }) {
    return AuthRepo.getUsers({ search, sort, page, pageSize });
  }
}
export default new AuthService();
