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
exports.AdminController = void 0;
const admin_service_1 = require("../service/admin-service");
class AdminController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield admin_service_1.AdminService.register(request);
                res.status(201).json({
                    status: 201,
                    massage: "success register admin",
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = admin_service_1.AdminService.login(request);
                res.status(200).json({
                    status: 200,
                    massage: "success login admin",
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield admin_service_1.AdminService.update(req.user, request);
                res.status(201).json({
                    status: 201,
                    massage: "success update admin",
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.params;
                request.id = Number(request.id);
                const response = yield admin_service_1.AdminService.delete(req.user, request);
                res.status(200).json({
                    status: 200,
                    massage: "success delete admin",
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield admin_service_1.AdminService.logout(req.user);
                res.status(200).json({
                    status: 200,
                    massage: "success logout admin",
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
}
exports.AdminController = AdminController;
;
