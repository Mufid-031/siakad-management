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
exports.StudentController = void 0;
const student_service_1 = require("../service/student-service");
class StudentController {
    static getStudents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const api_key = req.headers['x-api-token'];
                const request = req.body;
                const response = yield student_service_1.StudentService.getStudents(request);
                console.log(api_key);
                res.status(200).json({
                    status: 200,
                    massage: "success get all student",
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
                const response = yield student_service_1.StudentService.register(request);
                console.log(request);
                res.status(201).json({
                    status: 201,
                    massage: "success register student",
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
                const response = yield student_service_1.StudentService.update(req.user, request);
                res.status(201).json({
                    status: 201,
                    massage: "success update student",
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
                const response = yield student_service_1.StudentService.login(request);
                res.status(200).json({
                    status: 200,
                    massage: "success login student",
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
                const response = yield student_service_1.StudentService.logout(req.user);
                res.status(200).json({
                    status: 200,
                    massage: "success logout student",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static getStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.params;
                const response = yield student_service_1.StudentService.getStudent(req.user, request.id);
                res.status(200).json({
                    status: 200,
                    massage: "success get student",
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
                const response = yield student_service_1.StudentService.delete(req.user, request);
                res.status(200).json({
                    status: 200,
                    massage: "success delete student",
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
exports.StudentController = StudentController;
;
