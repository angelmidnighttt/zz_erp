import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import dotenv from "dotenv";
import router from "./src/routes/index.js";
import NotFound from "./src/middlewares/NotFound.js";
import ErrorHandler from "./src/middlewares/ErrorHandler.js";
dotenv.config();

const app = express();

//middlewares
//allow cross-origin requests
app.use(
  cors({
    origin: "localhost:3000",
    credentials: true,
  }),
);
//decrease the size of the response body and improve performance
app.use(compression());
//protect the app from some well-known web vulnerabilities by setting HTTP headers appropriately
app.use(helmet());
//parse incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(NotFound);
app.use(ErrorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
