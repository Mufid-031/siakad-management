import { z, ZodType } from "zod";

export class StudentValidate {

    static readonly REGISTER: ZodType = z.object({
        name: z.string().min(1).max(100),
        email: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
        nim: z.string().min(1).max(12),
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.number().min(1).optional(),
        name: z.string().min(1).max(100).optional(),
        email: z.string().min(1).max(100).optional(),
        password: z.string().min(1).max(100).optional(),
        nim: z.string().min(1).max(12).optional(),
    });

    static readonly LOGIN: ZodType = z.object({
        nim: z.string().min(1).max(12),
        password: z.string().min(1).max(100),
    });

    static readonly GET: ZodType = z.object({
        id: z.number().min(1).optional(),
        name: z.string().min(1).max(100).optional(),
        email: z.string().min(1).max(100).optional(),
        password: z.string().min(1).max(100).optional(),
        nim: z.string().min(1).max(12).optional(),
    });

    static readonly DELETE: ZodType = z.object({
        id: z.number(),
    });

}