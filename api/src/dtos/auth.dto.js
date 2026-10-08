import { uuid, z } from "zod";

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

const assignRolesDto = z.object({
  rolesId: z
    .array(z.uuid())
    .min(1, "at least once")
    .max(20)
    .transform((rolesId) => [...new Set(rolesId)]),
});

export { loginUserDto, createUserDto,assignRolesDto };
