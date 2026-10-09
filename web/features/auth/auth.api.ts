import { api, setAccessToken } from "@/lib/api";
import type { CreateUserBody, CreatedUser, LoginBody, LoginResult, Me, Role, UserRole } from "./auth.types";

export async function login(body: LoginBody) {
  const data = await api.post<LoginResult>("/auth/login", body, { retry: false });
  setAccessToken(data.token.accessToken);
  return data;
}

export async function logout() {
  try {
    await api.post<null>("/auth/logout", undefined, { retry: false });
  } finally {
    setAccessToken(null);
  }
}

export const getMe = () => api.get<Me>("/auth/me");
export const getRoles = () => api.get<Role[]>("/auth/roles");
export const createUser = (body: CreateUserBody) => api.post<CreatedUser>("/auth/user", body);
export const assignRoles = (userId: string, rolesId: string[]) =>
  api.post<UserRole[]>(`/auth/users/${userId}/roles`, { rolesId });
