import { z, ZodType } from "zod";

export class UserValidate {

    static readonly REGISTER: ZodType = z.object({
        name: z.string().min(1).max(100),
        nim: z.string().min(12).max(12),
        password: z.string().min(1).max(100),
        date: z.string().min(1).max(100),
        gender: z.string().min(1).max(100),
    });
}