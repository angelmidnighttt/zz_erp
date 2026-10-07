import ApiError from "../utils/ApiError.js";
import { success } from "../utils/Response.js";

export default class AuthController {
  async login(req, res) {
    return res.status(200).json(success("Login success"));
  }
}
