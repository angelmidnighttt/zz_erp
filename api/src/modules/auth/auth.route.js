import { Router } from "express";
import AuthController from "./auth.controller.js";
import asyncHandler from "../../shared/middlewares/asyncHandler.js";
import validate from "../../shared/middlewares/validate.middleware.js";
import {
  createUserDto,
  loginUserDto,
  userIdParamDto,
  assignRolesDto,
} from "./auth.dto.js";
import { authenticate } from "../../shared/middlewares/authenticate.js";
import { requirePermission } from "../../shared/middlewares/requirePermission.js";
import { FUNCTIONS, ACTIONS } from "../../shared/constants/permission.js";

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

route.get(
  "/me",
  authenticate,
  asyncHandler(AuthController.getMe),
);

// Khong qua authenticate: access token luc nay thuong da het han, xac thuc bang cookie refreshToken
route.post("/refresh", asyncHandler(AuthController.refreshToken));
route.post("/logout", asyncHandler(AuthController.logout));

export default route;
