export const ROLES = {
  ADMIN: "ADMIN"
};

export type ROLES_TYPE = keyof typeof ROLES;

export const ROLES_TEXT = {
  ADMIN: "Admin"
};

export const ROLES_OPTIONS = Object.entries(ROLES_TEXT).map(([key, value]) => ({
  value: key,
  label: value
}));

export const HOME_PATH = {
  ADMIN: "/admin/quan-ly-bai-viet"
};
