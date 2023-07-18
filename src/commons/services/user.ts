import prismaClient from "lib/prisma";

export async function changeUserCurrentTeam(userId: string, teamId: number) {
  return prismaClient.user.update({
    where: {
      id: userId
    },
    data: {
      currentTeamId: teamId
    }
  });
}