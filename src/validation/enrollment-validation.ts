import { z, ZodType } from "zod";

export class EnrollmentValidate {

    static readonly CREATE: ZodType = z.object({
        studentId: z.number().min(1),
        courseId: z.number().min(1)
    });

    static readonly DELETE: ZodType = z.object({
        id: z.number().min(1)
    });

};