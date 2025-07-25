import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { config } from "../config/config.js";
import { APIError } from "../utils/api-error.js";
import { userService } from "./index.js";

export async function registerUser(
  email: string,
  username: string,
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await userService.createUser(email, username, hashedPassword);
}

export async function loginUser(username: string, password: string) {
  const existingUser = await userService.getUserByUsername(username);
  if (!existingUser) {
    throw new APIError(404, `User with username '${username}' does not exist.`);
  }

  const { password: hashedPassword, ...userData } = existingUser;

  const match = await bcrypt.compare(password, hashedPassword);
  if (!match) {
    throw new APIError(401, "Incorrect password. Please try again.");
  }

  const issuedAt = Math.floor(Date.now() / 1000);
  const expirationTime = issuedAt + 24 * 60 * 60;
  const payload = {
    iss: "pinavg",
    sub: userData.id,
    iat: issuedAt,
    exp: expirationTime,
  };

  const token = jwt.sign(payload, config.jwtSecret);

  return { ...userData, token };
}
