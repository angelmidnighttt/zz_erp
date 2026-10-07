import { Router } from "express";
import AuthRoute from "./auth.route.js";

const route = Router();

route.use("/auth", AuthRoute);

export default route;
