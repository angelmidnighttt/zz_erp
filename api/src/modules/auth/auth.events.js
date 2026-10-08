// Event module auth phat ra; module khac import hang so nay de dang ky handler
export const AUTH_EVENTS = {
  USER_CREATED: "auth.user_created", // payload: { user }
  ROLES_ASSIGNED: "auth.roles_assigned", // payload: { userId, rolesId }
};
