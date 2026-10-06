import AppError from "../errors/AppError.js";
import { success,error } from "../utils/Response.js";
export default class AuthController {
  static async login(req, res) {
    if (req.body.name === "thong") {
      throw new AppError("Invalid username", 400);
    }
    return res.status(200).json(success({message: "Login successful"}));
  }
}
