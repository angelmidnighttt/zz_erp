import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.middleware.js";
import { createUserDto, loginUserDto } from "../dtos/auth.dto.js";

const route = Router();

route.post(
  "/login",
  validate({ body: loginUserDto }),
  asyncHandler(AuthController.login),
);

export default route;
