"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherValidate = void 0;
const zod_1 = require("zod");
class TeacherValidate {
}
exports.TeacherValidate = TeacherValidate;
TeacherValidate.REGISTER = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    email: zod_1.z.string().min(1).max(100),
    password: zod_1.z.string().min(1).max(100),
    nip: zod_1.z.string().min(1).max(12),
});
TeacherValidate.UPDATE = zod_1.z.object({
    id: zod_1.z.number().min(1).optional(),
    name: zod_1.z.string().min(1).max(100).optional(),
    email: zod_1.z.string().min(1).max(100).optional(),
    password: zod_1.z.string().min(1).max(100).optional(),
    nip: zod_1.z.string().min(1).max(12).optional(),
});
TeacherValidate.LOGIN = zod_1.z.object({
    nip: zod_1.z.string().min(1).max(12),
    password: zod_1.z.string().min(1).max(100),
});
;
