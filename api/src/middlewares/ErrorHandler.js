import AppError from "../errors/AppError.js";
const ErrorHandler = (err, req, res, next) => {
  console.error(err.stack);
  //handler for AppError instances
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  //handler for other errors ( error that not defined in AppError class)
  res.status(500).json({ message: "Internal Server Error" });
};

export default ErrorHandler;
