import { z } from 'zod';
// const { email, password, name, mobile } = await request.json();

export const signUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),

  name: z
    .string()
    .min(3,{message: "User's name can't be smaller than 3 characters"}),

  mobile: z.string()
});
