import { User } from "@prisma/client";
import { defaultPermissions, defaultRoles, rolePermissions } from "commons/constants/auth";
import prismaClient from "lib/prisma";
import { getRoles } from "./role";
import { getPermissions } from "./permission";

export async function createTeam(user: User) {
  const team = await prismaClient.team.create({
    data: {
      name: `${user.name}'s team`,
      ownerId: user.id
    }
  });
  await prismaClient.role.createMany({
    data: Object.values(defaultRoles).map(role => ({ ...role, teamId: team.id }))
  });
  await prismaClient.permission.createMany({
    data: Object.values(defaultPermissions).map(permission => ({ ...permission, teamId: team.id }))
  });

  // create role_permission entries based on the created roles and permissions. 
  // This is a many-to-many relationship, so we need to create the entries manually

  const roles = await getRoles(team.id);
  const permissions = await getPermissions(team.id);

  const rolePs = Object.keys(rolePermissions).map(role => {
    const rolePermission = rolePermissions[role];
    return rolePermission.map(permission => ({
      roleId: roles.find(r => r.name === role)?.id!,
      teamId: team.id,
      permissionId: permissions.find(p => p.name === permission.name)?.id!
    }));
  }).flat();

  await prismaClient.rolePermission.createMany({
    data: rolePs
  });

  return {
    ...team,
    rolePermissions
  };
}

export async function addUserToTeam(userId: string, teamId: number) {
  return prismaClient.teamUser.create({
    data: {
      userId,
      teamId
    }
  });
}