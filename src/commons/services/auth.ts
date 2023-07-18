import prismaClient from "lib/prisma";
import { addUserToTeam, createTeam } from "./team";
import { changeUserCurrentTeam } from "./user";
import { getRoleByName } from "./role";
import { defaultRoles } from "commons/constants/auth";
import { AuthUser } from "commons/types/auth";

export async function handleUserSetup(email: string) {
  let user: AuthUser = await prismaClient.user.findFirst({
    where: {
      email
    },
    include: {
      teams: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  if (!user) {
    throw new Error('User not found');
  }
  /**
   * user has teams, and the currentTeamId is set.
   */
  if (user.currentTeamId && user.teams.length) {
    const teamUser = await prismaClient.teamUser.findFirst({
      where: {
        userId: user.id,
        teamId: user.currentTeamId!
      },
      include: {
        role: true
      }
    });
    user.role = {
      id: teamUser?.roleId!,
      name: teamUser?.role?.name!
    }
  }

  /**
   * user has teams, but for some reason, the currentTeamId is not set.
   */
  if (user.teams.length && !user.currentTeamId) {
    await changeUserCurrentTeam(user.id, user.teams[0].id);
    user.currentTeamId = user.teams[0].id;
  }

  /**
   * if the user has no teams, create one and add the user to the team
   */
  if (!user.teams?.length) {
    const team = await createTeam(user);
    const role = await getRoleByName(team.id, defaultRoles.SUPER_ADMIN.name);

    if (!role) {
      throw new Error('Role not found');
    }

    await addUserToTeam(user.id, team.id, role.id);
    await changeUserCurrentTeam(user.id, team.id);
    user.currentTeamId = team.id;
    user.role = {
      id: role.id,
      name: defaultRoles.SUPER_ADMIN.name
    };
    user.teams = [{
      id: team.id,
      name: team.name
    }];
  }

  /**
   * find user permissions based on the role id,
   * and return the user with the permissions array
   */

  const rolePermissions = await prismaClient.rolePermission.findMany({
    where: {
      roleId: user.role?.id,
      teamId: user.currentTeamId!
    },
    include: {
      permission: true
    }
  });
  const permissions = rolePermissions.map((t: any) => t.permission.name);

  return {
    permissions,
    currentTeamId: user.currentTeamId!,
    role: user.role,
    teams: user.teams
  };
}