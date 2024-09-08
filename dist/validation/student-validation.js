"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentValidate = void 0;
const zod_1 = require("zod");
class StudentValidate {
}
exports.StudentValidate = StudentValidate;
StudentValidate.REGISTER = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    email: zod_1.z.string().min(1).max(100),
    password: zod_1.z.string().min(1).max(100),
    nim: zod_1.z.string().min(1).max(12),
});
StudentValidate.UPDATE = zod_1.z.object({
    id: zod_1.z.number().min(1).optional(),
    name: zod_1.z.string().min(1).max(100).optional(),
    email: zod_1.z.string().min(1).max(100).optional(),
    password: zod_1.z.string().min(1).max(100).optional(),
    nim: zod_1.z.string().min(1).max(12).optional(),
});
StudentValidate.LOGIN = zod_1.z.object({
    nim: zod_1.z.string().min(1).max(12),
    password: zod_1.z.string().min(1).max(100),
});
StudentValidate.GET = zod_1.z.object({
    id: zod_1.z.number().min(1).optional(),
    name: zod_1.z.string().min(1).max(100).optional(),
    email: zod_1.z.string().min(1).max(100).optional(),
    password: zod_1.z.string().min(1).max(100).optional(),
    nim: zod_1.z.string().min(1).max(12).optional(),
});
