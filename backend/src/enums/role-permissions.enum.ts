export const Roles = {
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
  OWNER: "OWNER",
} as const;

export type RolesType = keyof typeof Roles;

export const Permissions = {
  CREATE_WORKSPACE: "CREATE_WORKSPACE",
  DELETE_WORKSPACE: "DELETE_WORKSPACE",
  EDIT_WORKSPACE: "EDIT_WORKSPACE",
  MANAGE_WORKSPACE_SETTINGS: "MANAGE_WORKSPACE_SETTINGS",

  ADD_MEMBER: "ADD_MEMBER",
  CHANGE_MEMBER_ROLE: "CHANGE_MEMBER_ROLE",
  REMOVE_MEMBER: "REMOVE_MEMBER",

  CREATE_PROJECT: "CREATE_PROJECT",
  EDIT_PROJECT: "EDIT_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",

  CREATE_TASK: "CREATE_TASK",
  EDIT_TASK: "EDIT_TASK",
  DELETE_TASK: "DELETE_TASK",

  VIEW_ONLY: "VIEW_ONLY",
} as const;

export type PermissionType = keyof typeof Permissions;
// export const RolePermissions = {
//   [Roles.ADMIN]: [
//     Permissions.CREATE_WORKSPACE,
//     Permissions.DELETE_WORKSPACE,
//     Permissions.EDIT_WORKSPACE,
//     Permissions.MANAGE_WORKSPACE_SETTINGS,
//     Permissions.ADD_MEMBER,
//     Permissions.CHANGE_MEMBER_ROLE,
//     Permissions.REMOVE_MEMBER,
//     Permissions.CREATE_PROJECT,
//     Permissions.EDIT_PROJECT,
//     Permissions.DELETE_PROJECT,
//     Permissions.CREATE_TASK,
//     Permissions.EDIT_TASK,
//     Permissions.DELETE_TASK,
//   ],
//   [Roles.MEMBER]: [
//     Permissions.CREATE_PROJECT,
//     Permissions.EDIT_PROJECT,
//     Permissions.CREATE_TASK,
//     Permissions.EDIT_TASK,
//   ],
//   [Roles.OWNER]: [...Object.values(Permissions)],
// } as const;

// export type RolePermissionsType = {
//   [key in RolesType]: PermissionType[];
// };
// export const getPermissionsForRole = (role: RolesType): PermissionType[] => {
//   return Array.from(RolePermissions[role] || []);
// };
