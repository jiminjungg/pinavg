import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { APIError } from "../utils/api-error.js";

export function validate(req: Request, _: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors
      .array()
      .map((err) => err.msg)
      .join(" ");
    return next(new APIError(400, messages));
  }
  return next();
}
