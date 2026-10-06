import AppError from "../errors/AppError.js";
import { error } from "../utils/Response.js";
const ErrorHandler = (err, req, res, next) => {
  console.error(err.stack);
  //handler for AppError instances
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(error(err.statusCode, err.message));
  }

  //handler for other errors ( error that not defined in AppError class)
  res.status(500).json(error(500, "Internal Server Error"));
};

export default ErrorHandler;
