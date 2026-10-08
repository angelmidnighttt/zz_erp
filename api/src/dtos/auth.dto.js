import { z } from "zod";

const loginUserDto = z.object({
  email: z.email("Invalid email"),
  password: z.string(),
});

const createUserDto = z.object({
  email: z.email("Invalid email"),
  username: z.string(),
  fullName: z.string(),
  password: z.string().min(6),
});

const userIdParamDto = z.object({
  id: z.uuid("Invalid user id"),
});

const assignRolesDto = z.object({
  rolesId: z
    .array(z.uuid())
    .min(1, "At least one role is required")
    .max(20)
    .transform((rolesId) => [...new Set(rolesId)]),
});

export { loginUserDto, createUserDto, userIdParamDto, assignRolesDto };
