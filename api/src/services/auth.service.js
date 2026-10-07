import AuthRepo from "../repositories/auth.repo.js";
import ApiError from "../utils/ApiError.js";
import bcryptjs from "bcryptjs";
import { createAccessToken, createRefreshToken } from "../utils/jwt.js";
class AuthService {
  async login(email, password) {
    const existedUser = await AuthRepo.getUserByEmail(email);
    // khong tim thay 1 phan tu se tra ve 404, nhung neu gia tri tra ve la 1 array nhung khong co phan tu nao thi van tra ve 200 va array null
    if (!existedUser) throw new ApiError(404, "User not found");
    const isValidPassword = await bcryptjs.compare(
      password,
      existedUser.password_hash,
    );
    if (!isValidPassword)
      throw new ApiError(401, "Invalid username or password");
    return {
      id: existedUser.id,
      email: existedUser.email,
      token: {
        accessToken: createAccessToken(existedUser),
        refreshToken: createRefreshToken(existedUser),
      },
    };
  }
}

export default new AuthService();
