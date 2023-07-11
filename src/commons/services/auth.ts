import prismaClient from "lib/prisma";
import { addUserToTeam, createTeam } from "./team";
import { changeUserCurrentTeam, changeUserRole } from "./user";
import { getRoleByName } from "./role";
import { defaultRoles } from "commons/constants/auth";

export async function handleUserSetup(email: string) {
  let user = await prismaClient.user.findFirst({
    where: {
      email
    },
    include: {
      team: {
        select: {
          id: true,
        }
      }
    }
  });
  if (!user) {
    throw new Error('User not found');
  }

  // user has no team, create one and create default roles and permissions
  if (!user.team?.length) {
    const team = await createTeam(user);
    await addUserToTeam(user.id, team.id);
    await changeUserCurrentTeam(user.id, team.id);
    user.currentTeamId = team.id;
    const role = await getRoleByName(team.id, defaultRoles.SUPER_ADMIN.name);
    if (!role) {
      throw new Error('Role not found');
    }
    await changeUserRole(user.id, role.id);
    user.roleId = role.id;
  }
  const rolePermissions = await prismaClient.rolePermission.findMany({
    where: {
      roleId: user.roleId!,
      teamId: user.currentTeamId!
    },
    include: {
      permission: true
    }
  });
  const permissions = rolePermissions.map((t: any) => t.permission.name);
  return {
    permissions,
    teamId: user.currentTeamId!,
    roleId: user.roleId!
  };
}