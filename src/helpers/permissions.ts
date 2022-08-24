enum Permissions {
  USERS_READ = "read:users",
  USERS_WRITE = "write:users",
  USERS_UPDATE = "update:users",
  USERS_DELETE = "delete:users",

  POSTS_READ = "read:posts",
  POSTS_WRITE = "write:posts",
  POSTS_UPDATE = "update:posts",
  POSTS_DELETE = "delete:posts",

  COMMENTS_READ = "read:comments",
  COMMENTS_WRITE = "write:comments",
  COMMENTS_UPDATE = "update:comments",
  COMMENTS_DELETE = "delete:comments",

  NOTIFICATIONS_READT = "read:notifications",
}

export type PermissionsType = `${Permissions}`;

// ADMIN PERMISSIONS
export const adminPermissions = Object.values(Permissions);
