"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeValidation = void 0;
const zod_1 = require("zod");
class GradeValidation {
}
exports.GradeValidation = GradeValidation;
GradeValidation.ASSIGN = zod_1.z.object({
    enrollmentId: zod_1.z.number().min(1),
    grade: zod_1.z.number().min(0).max(100)
});
GradeValidation.UPDATE = zod_1.z.object({
    enrollmentId: zod_1.z.number().min(1).optional(),
    grade: zod_1.z.number().min(0).max(100).optional(),
});
GradeValidation.DELETE = zod_1.z.object({
    enrollmentId: zod_1.z.number().min(1)
});
;
