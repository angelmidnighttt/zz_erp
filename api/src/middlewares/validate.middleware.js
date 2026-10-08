import { error } from "../utils/response.js";

const validate = (schemas) => {
  return (req, res, next) => {
    const validated = {};
    const errors = {};

    for (const [key, schema] of Object.entries(schemas)) {
      const result = schema.safeParse(req[key]);
      if (!result.success) {
        errors[key] = result.error.flatten().fieldErrors;
        continue;
      }
      validated[key] = result.data;
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(error(400, errors));
    }
    req.validated = validated;
    next();
  };
};

export default validate;
