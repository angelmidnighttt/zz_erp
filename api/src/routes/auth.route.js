import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createUserDto,
  loginUserDto,
  userIdParamDto,
  assignRolesDto,
} from "../dtos/auth.dto.js";
import { authenticate } from "../middlewares/authenticate.js";
import { requirePermission } from "../middlewares/requirePermission.js";
import { FUNCTIONS, ACTIONS } from "../constant/permission.js";

const route = Router();

route.post(
  "/login",
  validate({ body: loginUserDto }),
  asyncHandler(AuthController.login),
);

route.post(
  "/user",
  authenticate,
  requirePermission(FUNCTIONS.USER_ROLE, ACTIONS.C),
  validate({ body: createUserDto }),
  asyncHandler(AuthController.createUser),
);

route.get(
  "/roles",
  authenticate,
  requirePermission(FUNCTIONS.USER_ROLE, ACTIONS.V),
  asyncHandler(AuthController.getRoles),
);

route.post(
  "/users/:id/roles",
  authenticate,
  requirePermission(FUNCTIONS.USER_ROLE, ACTIONS.E),
  validate({ params: userIdParamDto, body: assignRolesDto }),
  asyncHandler(AuthController.assignRoles),
);

export default route;
