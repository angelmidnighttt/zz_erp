import { error } from "../utils/response.js";

//handle error global
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  // loi nao xuat phat ma server khong handle duoc thi ghi vao log luon
  if (statusCode >= 500) logger.error({ err }, "unhandler error");
  const message = statusCode === 500 ? "Internal Server Error" : err.message;

  return res.status(statusCode).json(error(statusCode, message));
};

export default errorHandler;
