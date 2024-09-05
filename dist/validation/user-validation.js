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
