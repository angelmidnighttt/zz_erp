import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.middleware.js";
import { createUserDto } from "../dtos/auth.dto.js";

const route = Router();

route.post(
  "/login",
  validate({ body: createUserDto }),
  asyncHandler(new AuthController().login),
);

export default route;
