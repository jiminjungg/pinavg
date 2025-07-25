import type { NextFunction, Request, Response } from "express";

import { authService } from "../services/index.js";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, username, password } = req.body;

  try {
    const newUser = await authService.registerUser(email, username, password);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  try {
    const currUser = await authService.loginUser(username, password);
    res.status(200).json(currUser);
  } catch (error) {
    next(error);
  }
}
