import { prisma } from "../client.js";

export async function createUser(
  email: string,
  username: string,
  password: string
) {
  return await prisma.user.create({
    data: { email, username, password },
    omit: { password: true },
  });
}

export async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({ where: { username } });
}
