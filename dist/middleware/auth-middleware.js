"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const database_1 = require("../app/database");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const excludedRoutes = [
        '/api/students/register',
        '/api/students/login',
        '/api/teachers/register',
        '/api/teachers/login'
    ];
    if (!req.path.startsWith('/api')) {
        return next();
    }
    if (excludedRoutes.includes(req.path)) {
        return next();
    }
    const token = req.get("X-API-TOKEN");
    if (token) {
        const user = yield database_1.prismaClient.user.findFirst({
            where: {
                token: token
            }
        });
        // if (user?.role === "ADMIN") {
        //     const user = await prismaClient.user.findFirst({
        //         where: {
        //             id: req.body.id
        //         }
        //     });
        //     if (user) {
        //         req.user = user;
        //         next();
        //         return;
        //     }
        // };
        if (user) {
            req.user = user;
            next();
            return;
        }
    }
    res.status(401).json({
        errors: "Unauthorized"
    }).end();
});
exports.authMiddleware = authMiddleware;
