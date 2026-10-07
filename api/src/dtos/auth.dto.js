import { z } from "zod";

const createUserDto = z.object({
  email: z.email("Invalid email"),
  password: z.string(),
});

export { createUserDto };
