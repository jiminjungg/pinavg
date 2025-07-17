import { PrismaClient } from "../generated/prisma/client.js";

import { config } from "./config/config.js";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ datasourceUrl: config.databaseUrl });

if (config.nodeEnv !== "production") globalForPrisma.prisma = prisma;
