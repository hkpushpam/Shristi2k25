import { z } from 'zod';

export const changePasswordSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).optional(),
    new_password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' }),
    old_password: z
        .string()
        .min(3, { message: "User's name can't be smaller than 3 characters" })
});
