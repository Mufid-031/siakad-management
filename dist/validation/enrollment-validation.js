"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentValidate = void 0;
const zod_1 = require("zod");
class EnrollmentValidate {
}
exports.EnrollmentValidate = EnrollmentValidate;
EnrollmentValidate.CREATE = zod_1.z.object({
    studentId: zod_1.z.number().min(1),
    courseId: zod_1.z.number().min(1)
});
EnrollmentValidate.DELETE = zod_1.z.object({
    id: zod_1.z.number().min(1)
});
EnrollmentValidate.GET_ALL_ENROLLMENTS_STUDENT = zod_1.z.object({
    studentId: zod_1.z.number().min(1),
});
;
