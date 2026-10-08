import { error } from "../utils/response.js";

//handle error global
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  if (statusCode === 500) console.error(err);
  const message = statusCode === 500 ? "Internal Server Error" : err.message;

  return res.status(statusCode).json(error(statusCode, message));
};

export default errorHandler;
