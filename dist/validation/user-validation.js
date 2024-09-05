"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidate = void 0;
const zod_1 = require("zod");
class UserValidate {
}
exports.UserValidate = UserValidate;
UserValidate.REGISTER = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    nim: zod_1.z.string().min(12).max(12),
    password: zod_1.z.string().min(1).max(100),
    date: zod_1.z.string().min(1).max(100),
    gender: zod_1.z.string().min(1).max(100),
});
UserValidate.LOGIN = zod_1.z.object({
    nim: zod_1.z.string().min(12).max(12),
    password: zod_1.z.string().min(1).max(100),
});
UserValidate.UPDATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100).optional(),
    nim: zod_1.z.string().min(12).max(12).optional(),
    password: zod_1.z.string().min(1).max(100).optional(),
    date: zod_1.z.string().min(1).max(100).optional(),
    gender: zod_1.z.string().min(1).max(100).optional(),
});
