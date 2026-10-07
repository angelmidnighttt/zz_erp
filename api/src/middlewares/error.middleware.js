import { error } from "../utils/Response.js";

//handle error global
const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const message = statusCode == 500 ? "Internal Server Error" : err.message;

  return res.status(statusCode).json(error(statusCode, message));
};

export default errorHandler;
