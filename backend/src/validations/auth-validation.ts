import { body } from "express-validator";

export const validateRegistration = [
  body("email").trim().isEmail().withMessage("Email is invalid."),
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric.")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters long."),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
];

export const validateLogin = [
  body("username").trim().notEmpty().withMessage("Username cannot be empty."),
  body("password").trim().notEmpty().withMessage("Password cannot be empty."),
];
