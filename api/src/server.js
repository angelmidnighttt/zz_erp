import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();

//middlewares
//protects the app from some well-known web vulnerabilities by setting HTTP headers appropriately
app.use(helmet());
//reduces the size of the response body and hence improves the speed of a web app
app.use(compression());
//allows cross-origin requests from different domains
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//logs HTTP requests and errors
app.use(morgan("dev"));

const hostname = "localhost";
const port = 8017;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/api", (req, res) => {
  const { name, email } = req.body;
  res.json({ message: `Hello ${name}, your email is ${email}` });
});

app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Running at ${hostname}:${port}/`);
});
