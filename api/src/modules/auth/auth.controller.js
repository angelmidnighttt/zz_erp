import authService from "./auth.service.js";
import { success } from "../../shared/utils/response.js";
import { REFRESH_TOKEN_TTL_MS } from "../../shared/utils/jwt.js";

const REFRESH_COOKIE = "refreshToken";
// clearCookie phai cung path voi luc set thi trinh duyet moi xoa
const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/api/v1/auth",
};

const setRefreshCookie = (res, refreshToken) =>
  res.cookie(REFRESH_COOKIE, refreshToken, {
    ...refreshCookieOptions,
    maxAge: REFRESH_TOKEN_TTL_MS,
  });

class AuthController {
  // refresh token chi nam trong cookie httpOnly, khong tra ve body de JS khong doc duoc
  async login(req, res) {
    const { id, email, token } = await authService.login(req.validated.body);
    setRefreshCookie(res, token.refreshToken);
    return res
      .status(200)
      .json(success({ id, email, token: { accessToken: token.accessToken } }));
  }

  async createUser(req, res) {
    const user = await authService.createUser(req.validated.body);
    return res.status(200).json(success(user));
  }

  async getRoles(req, res) {
    const roles = await authService.getRoles();
    return res.status(200).json(success(roles));
  }

  async assignRoles(req, res) {
    const userRoles = await authService.assignRoles({
      userId: req.validated.params.id,
      rolesId: req.validated.body.rolesId,
    });
    return res.status(200).json(success(userRoles));
  }

  async getMe(req, res) {
    const user = await authService.getMe({ userId: req.user.id });
    return res.status(200).json(success(user));
  }

  async refreshToken(req, res) {
    const { accessToken, refreshToken } = await authService.refreshToken({
      refreshToken: req.cookies[REFRESH_COOKIE],
    });
    setRefreshCookie(res, refreshToken);
    return res.status(200).json(success({ accessToken }));
  }

  async logout(req, res) {
    await authService.logout({ refreshToken: req.cookies[REFRESH_COOKIE] });
    res.clearCookie(REFRESH_COOKIE, refreshCookieOptions);
    return res.status(200).json(success(null));
  }
}

export default new AuthController();
