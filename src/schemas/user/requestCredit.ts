import { z } from "zod";

export const requestCreditSchema = z.object({
    number: z.number().default(0),
    reason: z.string()
});
