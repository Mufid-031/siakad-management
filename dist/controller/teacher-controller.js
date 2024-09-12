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
exports.TeacherController = void 0;
const teacher_service_1 = require("../service/teacher-service");
class TeacherController {
    static getTeachers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield teacher_service_1.TeacherService.getTeachers(request);
                res.status(200).json({
                    status: 200,
                    massage: "success get all teacher",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield teacher_service_1.TeacherService.register(request);
                res.status(201).json({
                    status: 201,
                    massage: "success register teacher",
                    data: response,
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
                const response = yield teacher_service_1.TeacherService.update(req.user, request);
                res.status(201).json({
                    status: 201,
                    massage: "success update teacher",
                    data: response,
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
                const response = yield teacher_service_1.TeacherService.login(request);
                res.status(200).json({
                    status: 200,
                    massage: "success login teacher",
                    data: response,
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
                const request = req.body;
                const response = yield teacher_service_1.TeacherService.logout(req.user);
                res.status(200).json({
                    status: 200,
                    massage: "success logout teacher",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static getTeacher(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.params;
                const { id } = request;
                const response = yield teacher_service_1.TeacherService.getTeacher(req.user, id);
                res.status(200).json({
                    status: 200,
                    massage: "success get teacher",
                    data: response,
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
                const response = yield teacher_service_1.TeacherService.delete(req.user, request);
                res.status(200).json({
                    status: 200,
                    massage: "success delete teacher",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
}
exports.TeacherController = TeacherController;
;
