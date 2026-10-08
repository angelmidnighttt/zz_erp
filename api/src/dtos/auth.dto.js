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

export { loginUserDto, createUserDto };
