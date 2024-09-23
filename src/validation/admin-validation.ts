import { z, ZodType } from "zod";

export class AdminValidate {

    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        email: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.number().min(1),
        name: z.string().min(1).max(100).optional(),
        email: z.string().min(1).max(100).optional(),
        role: z.string().min(1).max(100),
    });

    static readonly LOGIN: ZodType = z.object({
        email: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
    });

    static readonly DELETE: ZodType = z.object({
        id: z.number(),
    });


};