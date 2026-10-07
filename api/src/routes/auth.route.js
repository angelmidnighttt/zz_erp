import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const route = Router();

route.post("/login", new AuthController().login);

export default route;