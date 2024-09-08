import { z, ZodType } from "zod";

export class TeacherValidate {

    static readonly REGISTER: ZodType = z.object({
        name: z.string().min(1).max(100),
        email: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
        nip: z.string().min(1).max(12),
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.number().min(1).optional(),
        name: z.string().min(1).max(100).optional(),
        email: z.string().min(1).max(100).optional(),
        password: z.string().min(1).max(100).optional(),
        nip: z.string().min(1).max(12).optional(),
    });

    static readonly LOGIN: ZodType = z.object({
        nip: z.string().min(1).max(12),
        password: z.string().min(1).max(100),
    });

};