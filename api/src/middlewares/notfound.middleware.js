import {error} from "../utils/Response.js";

const notFound = (req, res, next) => {
    return res.status(404).json(error("Route not found"));
}

export default notFound;