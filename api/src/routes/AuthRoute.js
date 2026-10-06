import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import AsyncHandler from "../middlewares/asyncHandler.js";

const router = Router();

router.post("/login", AsyncHandler(AuthController.login));

export default router;
