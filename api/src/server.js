import express from "express";

const app = express();

const hostname = "localhost";
const port = 8017;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Running at ${hostname}:${port}/`);
});
