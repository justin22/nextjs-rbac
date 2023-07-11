import prismaClient from "lib/prisma";

export async function getPermissions(teamId: number) {
  return prismaClient.permission.findMany({
    where: {
      teamId
    }
  });
}