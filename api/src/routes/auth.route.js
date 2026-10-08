import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.middleware.js";
import { createUserDto, loginUserDto,assignRolesDto } from "../dtos/auth.dto.js";
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

route.get('/roles',authenticate,requirePermission("SYS.USER_ROLE","VIEW"),asyncHandler(AuthController.getRoles));

route.post("/users/:id/roles",authenticate,requirePermission("SYS.USER_ROLE","EDIT"),validate({body:assignRolesDto}),asyncHandler(AuthController.assignRoles));
export default route;
