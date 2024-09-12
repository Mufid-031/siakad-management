import { z, ZodType } from "zod";

export class GradeValidation {

    static readonly ASSIGN: ZodType = z.object({
        enrollmentId: z.number().min(1),
        grade: z.number().min(0).max(100)
    });

    static readonly UPDATE: ZodType = z.object({
        enrollmentId: z.number().min(1).optional(),
        grade: z.number().min(0).max(100).optional(),
    });

    static readonly DELETE: ZodType = z.object({
        enrollmentId: z.number().min(1)
    });

};