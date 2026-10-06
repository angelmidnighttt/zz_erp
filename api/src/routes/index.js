import Router from "express";
import AuthRoute from "./AuthRoute.js";

const router = Router();

router.use("/auth", AuthRoute);

export default router;
