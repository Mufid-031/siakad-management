"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidate = void 0;
const zod_1 = require("zod");
class AdminValidate {
}
exports.AdminValidate = AdminValidate;
AdminValidate.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    email: zod_1.z.string().min(1).max(100),
    password: zod_1.z.string().min(1).max(100),
});
AdminValidate.UPDATE = zod_1.z.object({
    id: zod_1.z.number().min(1),
    name: zod_1.z.string().min(1).max(100).optional(),
    email: zod_1.z.string().min(1).max(100).optional(),
});
AdminValidate.LOGIN = zod_1.z.object({
    email: zod_1.z.string().min(1).max(100),
    password: zod_1.z.string().min(1).max(100),
});
AdminValidate.DELETE = zod_1.z.object({
    id: zod_1.z.number(),
});
;
