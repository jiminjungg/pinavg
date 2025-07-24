import dotenv from "dotenv";

dotenv.config();

interface APIConfig {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  jwtSecret: string;
}

function getDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required in .env");
  }

  if (!process.env.TEST_DATABASE_URL) {
    throw new Error("TEST_DATABASE_URL is required in .env");
  }

  return process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;
}

function getJwtSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is required in .env");
  }
  return process.env.JWT_SECRET;
}

export const config: APIConfig = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: getDatabaseUrl(),
  jwtSecret: getJwtSecret(),
};
