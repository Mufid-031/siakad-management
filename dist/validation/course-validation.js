"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidate = void 0;
const zod_1 = require("zod");
class CourseValidate {
}
exports.CourseValidate = CourseValidate;
CourseValidate.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    code: zod_1.z.string().min(1).max(100),
    teacherId: zod_1.z.number().min(1)
});
CourseValidate.UPDATE = zod_1.z.object({
    id: zod_1.z.number().min(1).optional(),
    name: zod_1.z.string().min(1).max(100).optional(),
    code: zod_1.z.string().min(1).max(100).optional(),
    teacherId: zod_1.z.number().min(1).optional(),
});
CourseValidate.DELETE = zod_1.z.object({
    id: zod_1.z.number(),
});
;
