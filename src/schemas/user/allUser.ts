import { z } from "zod";

const userSchema = z.object({
  _id: z.string(),
  user_name: z.string(),
  user_email: z.string().email(),
  user_status: z.enum(["Active", "Inactive"]),
  user_credit: z.number(),
});

export const usersArraySchema = z.array(userSchema);