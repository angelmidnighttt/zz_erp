import AppError from "../errors/AppError.js";
export default class AuthController {
  static async login(req, res) {
    if (req.body.name === "thong") {
      throw new AppError("Invalid username", 400);
    }
  }
}
