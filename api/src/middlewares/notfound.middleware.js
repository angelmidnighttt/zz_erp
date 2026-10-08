import { error } from "../utils/response.js";

const notFound = (req, res, next) => {
  return res.status(404).json(error(404, "Route not found"));
};

export default notFound;
