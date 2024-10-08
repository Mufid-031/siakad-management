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
exports.EnrollmentController = void 0;
const enrollment_service_1 = require("../service/enrollment-service");
class EnrollmentController {
    static createEnrollment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield enrollment_service_1.EnrollmentService.createEnrollment(request);
                res.status(201).json({
                    status: 201,
                    message: "Enrollment created",
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static deleteEnrollment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.params;
                request.id = Number(request.id);
                const response = enrollment_service_1.EnrollmentService.deleteEnrollment(req.enrollment, request);
                res.status(200).json({
                    status: 200,
                    message: "Enrollment deleted",
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static getAllEnrollmentsStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.params;
                request.studentId = Number(request.studentId);
                const response = yield enrollment_service_1.EnrollmentService.getAllEnrollmentsStudent(req.enrollment, request);
                res.status(200).json({
                    status: 200,
                    message: "success get all enrollments student",
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.EnrollmentController = EnrollmentController;
;
