import type { NextFunction, Request, Response } from "express";

import { Prisma } from "../../generated/prisma/client.js";
import { config } from "../config/config.js";
import { APIError } from "../utils/api-error.js";

export function errorConverter(
  err: APIError | Error | Prisma.PrismaClientKnownRequestError,
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  if (err instanceof APIError) {
    next(err);
  } else if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002" &&
    err.meta
  ) {
    next(new APIError(409, `This ${err.meta["target"]} is already in use.`));
  } else {
    next(new APIError(500, "Something went wrong."));
  }
}

export function errorHandler(
  err: APIError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (config.nodeEnv === "development") {
    console.error(err.stack);
  }
  res.status(err.statusCode).json({ message: err.message });
}
