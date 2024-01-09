import * as z from "zod";

export const SignUpValidationSchema = z.object({
  name: z.string().min(2, { message: "Too short name" }),
  email: z.string().email(),
  username: z.string().min(2, { message: "Too short name" }),
  password: z.string().min(8, { message: "Password must contain 8 charecter" }),
});

export const SignInValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must contain 8 charecter" }),
});
