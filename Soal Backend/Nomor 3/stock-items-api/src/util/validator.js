import { validationResult } from "express-validator";

const checkError = (statusCode) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(statusCode).json({ errors: errors.array() });
    }
    next();
  };
};

export { checkError };
