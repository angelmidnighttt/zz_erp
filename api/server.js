import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//middlewares
// Enable CORS
app.use(cors());
//protect http headers
app.use(helmet());
//reduce the size of the response body
app.use(compression());
//parse incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/test",(req,res)=>{
  const { name, age } = req.body;
  res.json({ message: `Hello ${name}, you are ${age} years old.` });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});