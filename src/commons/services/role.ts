import prismaClient from "lib/prisma";

export async function getRoleByName(teamId: number, role: string) {
  return prismaClient.role.findFirst({
    where: {
      name: role,
      teamId
    }
  });
}

export async function getRoles(teamId: number) {
  return prismaClient.role.findMany({
    where: {
      teamId
    }
  });
}