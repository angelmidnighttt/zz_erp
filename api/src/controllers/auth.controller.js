import authService from "../services/auth.service.js";
import { success, error } from "../utils/response.js";
class AuthController {
  async login(req, res) {
    console.log("req", req.validated);
    return await authService
      .login(req.validated.body.email, req.validated.body.password)
      .then((user) => {
        res.cookie("refreshToken", user.token.refreshToken, { httpOnly: true });
        return res.status(200).json(success(user));
      });
  }

  async createUser(req, res) {
    return await authService
      .createUser(req.validated.body)
      .then((user) => res.status(200).json(success(user)));
  }
}

export default new AuthController();
