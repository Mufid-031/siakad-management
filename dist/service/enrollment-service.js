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
exports.EnrollmentService = void 0;
const database_1 = require("../app/database");
const enrollment_model_1 = require("../model/enrollment-model");
const enrollment_validation_1 = require("../validation/enrollment-validation");
const validation_1 = require("../validation/validation");
class EnrollmentService {
    static createEnrollment(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(enrollment_validation_1.EnrollmentValidate.CREATE, request);
            const response = yield database_1.prismaClient.enrollment.create({
                data: {
                    studentId: createRequest.studentId,
                    courseId: createRequest.courseId
                },
                include: {
                    student: true,
                    course: true
                }
            });
            return (0, enrollment_model_1.toEnrollmentResponse)(response);
        });
    }
    ;
    static deleteEnrollment(enrollment, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteRequest = validation_1.Validation.validate(enrollment_validation_1.EnrollmentValidate.DELETE, request);
            const response = yield database_1.prismaClient.enrollment.deleteMany({
                where: {
                    id: deleteRequest.id
                }
            });
            return {
                message: `Enrollment ${response.count} deleted`
            };
        });
    }
    ;
    static getAllEnrollmentsStudent(enrollment, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const getAllEnrollmentsStudentRequest = validation_1.Validation.validate(enrollment_validation_1.EnrollmentValidate.GET_ALL_ENROLLMENTS_STUDENT, request);
            const response = yield database_1.prismaClient.enrollment.findMany({
                where: {
                    studentId: getAllEnrollmentsStudentRequest.studentId,
                },
                include: {
                    student: true,
                    course: true,
                    grade: true,
                },
            });
            return response.map(enrollment => (0, enrollment_model_1.toEnrollmentResponse)(enrollment));
        });
    }
    ;
}
exports.EnrollmentService = EnrollmentService;
;
