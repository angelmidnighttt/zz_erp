import express from "express";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();

//middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

export default app;