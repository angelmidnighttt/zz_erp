import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.middleware.js";
import { createUserDto, loginUserDto } from "../dtos/auth.dto.js";
import { authenticate } from "../middlewares/authenticate.js";
import { requirePermission } from "../middlewares/requirePermission.js";

const route = Router();

route.post(
  "/login",
  validate({ body: loginUserDto }),
  asyncHandler(AuthController.login),
);

route.post(
  "/user",
  authenticate,
  requirePermission("SYS.USER_ROLE", "CREATE"),
  validate({ body: createUserDto }),
  asyncHandler(AuthController.createUser),
);

export default route;
