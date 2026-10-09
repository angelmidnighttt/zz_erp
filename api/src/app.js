
import express from "express";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";

import helmet from "helmet";
import morgan from "morgan";
import route from "./modules/index.js";
import notFound from "./shared/middlewares/notfound.middleware.js";
import errorHandler from "./shared/middlewares/error.middleware.js";

const app = express();

//middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.use("/api/v1", route);

app.use(notFound);
app.use(errorHandler);

export default app;
