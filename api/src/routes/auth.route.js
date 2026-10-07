import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const route = Router();

route.post("/login", asyncHandler(new AuthController().login));

export default route;
