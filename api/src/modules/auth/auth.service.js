import AuthRepo from "./auth.repo.js";
import { AUTH_EVENTS } from "./auth.events.js";
import { hashPassword, comparePassword } from "../../shared/utils/password.js";
import transaction from "../../shared/db/transaction.js";
import eventBus from "../../shared/events/event-bus.js";
import ApiError from "../../shared/utils/ApiError.js";
import { createAccessToken, createRefreshToken } from "../../shared/utils/jwt.js";

class AuthService {
  async login({ email, password }) {
    const existedUser = await AuthRepo.getUserByEmail({ email });
    // khong tim thay 1 phan tu se tra ve 404, nhung neu gia tri tra ve la 1 array nhung khong co phan tu nao thi van tra ve 200 va array null
    if (!existedUser) throw new ApiError(404, "User not found");

    const isValidPassword = await comparePassword(
      password,
      existedUser.password_hash,
    );
    if (!isValidPassword)
      throw new ApiError(401, "Invalid username or password");

    await AuthRepo.updateLastLogin({ userId: existedUser.id });
    return {
      id: existedUser.id,
      email: existedUser.email,
      token: {
        accessToken: createAccessToken(existedUser),
        refreshToken: createRefreshToken(existedUser),
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
}

export default new AuthService();
