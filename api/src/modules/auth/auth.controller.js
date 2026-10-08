import authService from "./auth.service.js";
import { success } from "../../shared/utils/response.js";

class AuthController {
  async login(req, res) {
    const user = await authService.login(req.validated.body);
    res.cookie("refreshToken", user.token.refreshToken, { httpOnly: true });
    return res.status(200).json(success(user));
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
}

export default new AuthController();
