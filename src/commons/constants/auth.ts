export const defaultRoles = {
  SUPER_ADMIN: {
    name: 'SUPER_ADMIN',
    description: 'Complete access to the paltform'
  },
  ADMIN: {
    name: 'ADMIN',
    description: 'Manage users and everything else'
  },
  USER: {
    name: 'USER',
    description: 'View access to the platform'
  }
}

export const defaultPermissions = {
  VIEW_PAGE: {
    name: 'VIEW_PAGE',
    description: 'View pages'
  },
  CREATE_PAGE: {
    name: 'CREATE_PAGE',
    description: 'Create pages'
  },
  UPDATE_PAGE: {
    name: 'UPDATE_PAGE',
    description: 'Update pages'
  },
  DELETE_PAGE: {
    name: 'DELETE_PAGE',
    description: 'Delete pages'
  },
  VIEW_USER: {
    name: 'VIEW_USER',
    description: 'View users'
  },
  CREATE_USER: {
    name: 'CREATE_USER',
    description: 'Create users'
  },
  UPDATE_USER: {
    name: 'UPDATE_USER',
    description: 'Update users'
  },
  DELETE_USER: {
    name: 'DELETE_USER',
    description: 'Delete users'
  }
}

export const rolePermissions = {
  [defaultRoles.SUPER_ADMIN.name]: [
    defaultPermissions.VIEW_PAGE,
    defaultPermissions.CREATE_PAGE,
    defaultPermissions.UPDATE_PAGE,
    defaultPermissions.DELETE_PAGE,
    defaultPermissions.VIEW_USER,
    defaultPermissions.CREATE_USER,
    defaultPermissions.UPDATE_USER,
    defaultPermissions.DELETE_USER,
  ],
  [defaultRoles.ADMIN.name]: [
    defaultPermissions.VIEW_PAGE,
    defaultPermissions.CREATE_PAGE,
    defaultPermissions.UPDATE_PAGE,
    defaultPermissions.DELETE_PAGE,
    defaultPermissions.VIEW_USER,
  ],
  [defaultRoles.USER.name]: [
    defaultPermissions.VIEW_PAGE,
  ]
}