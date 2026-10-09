import type { Permission } from "@/lib/permissions";

// Khớp api/src/modules/auth (auth.dto.js, auth.service.js, auth.repo.js)
export type LoginBody = { email: string; password: string };

export type LoginResult = {
  id: string;
  email: string;
  token: { accessToken: string; refreshToken: string };
};

export type CreateUserBody = { email: string; username: string; fullName: string; password: string };
export type CreatedUser = { id: string; username: string; email: string; full_name: string };
export type Role = { id: string; code: string; name_vi: string; name_en: string };
export type UserRole = { user_id: string; role_id: string };

// Backend chưa có GET /auth/me: đây là contract đề xuất
export type Me = { id: string; email: string; fullName: string; permissions: Permission[] };
