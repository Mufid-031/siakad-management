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
    static create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(enrollment_validation_1.EnrollmentValidate.CREATE, request);
            const response = yield database_1.prismaClient.enrollment.create({
                data: {
                    studentId: createRequest.studentId,
                    courseId: createRequest.courseId
                }
            });
            return (0, enrollment_model_1.toEnrollmentResponse)(response);
        });
    }
    ;
    static delete(enrollment, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteRequest = validation_1.Validation.validate(enrollment_validation_1.EnrollmentValidate.DELETE, id);
            const response = yield database_1.prismaClient.enrollment.deleteMany({
                where: {
                    id: deleteRequest
                }
            });
            return {
                message: `Enrollment ${response.count} deleted`
            };
        });
    }
    ;
}
exports.EnrollmentService = EnrollmentService;
;
