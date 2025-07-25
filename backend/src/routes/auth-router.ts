import { Router } from "express";

import { authController } from "../controllers/index.js";
import { validate } from "../middlewares/validate.js";
import { authValidation } from "../validations/index.js";

export const authRouter = Router();

authRouter.post(
  "/register",
  authValidation.validateRegistration,
  validate,
  authController.register
);

authRouter.post(
  "/login",
  authValidation.validateLogin,
  validate,
  authController.login
);
