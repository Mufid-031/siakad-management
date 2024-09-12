import { z, ZodType } from "zod";

export class CourseValidate {

    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        code: z.string().min(1).max(100),
        teacherId: z.number().min(1)
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.number().min(1).optional(),
        name: z.string().min(1).max(100).optional(),
        code: z.string().min(1).max(100).optional(),
        teacherId: z.number().min(1).optional(),
    });

    static readonly DELETE: ZodType = z.object({
        id: z.number(),
    });

};