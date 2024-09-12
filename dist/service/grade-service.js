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
exports.GradeService = void 0;
const database_1 = require("../app/database");
const grade_model_1 = require("../model/grade-model");
const grade_validation_1 = require("../validation/grade-validation");
const validation_1 = require("../validation/validation");
class GradeService {
    static assignGrade(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const asignGradeRequest = validation_1.Validation.validate(grade_validation_1.GradeValidation.ASSIGN, request);
            const response = yield database_1.prismaClient.grade.create({
                data: {
                    enrollmentId: asignGradeRequest.enrollmentId,
                    grade: asignGradeRequest.grade
                },
                include: {
                    enrollment: {
                        include: {
                            student: true,
                            course: true
                        }
                    },
                }
            });
            const studentData = yield database_1.prismaClient.enrollment.findFirst({
                where: {
                    studentId: response.enrollment.studentId
                },
                include: {
                    student: true,
                    course: true
                }
            });
            response.enrollment.student = studentData === null || studentData === void 0 ? void 0 : studentData.student;
            response.enrollment.course = studentData === null || studentData === void 0 ? void 0 : studentData.course;
            return (0, grade_model_1.toGradeResponse)(response);
        });
    }
    ;
    static updateGrade(grade, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateGradeRequest = validation_1.Validation.validate(grade_validation_1.GradeValidation.UPDATE, request);
            const response = yield database_1.prismaClient.grade.update({
                where: {
                    enrollmentId: updateGradeRequest.enrollmentId
                },
                data: {
                    enrollmentId: updateGradeRequest.enrollmentId,
                    grade: updateGradeRequest.grade
                },
                include: {
                    enrollment: {
                        include: {
                            student: true,
                            course: true
                        }
                    },
                }
            });
            const studentData = yield database_1.prismaClient.enrollment.findFirst({
                where: {
                    studentId: response.enrollment.studentId
                },
                include: {
                    student: true,
                    course: true
                }
            });
            response.enrollment.student = studentData === null || studentData === void 0 ? void 0 : studentData.student;
            response.enrollment.course = studentData === null || studentData === void 0 ? void 0 : studentData.course;
            return (0, grade_model_1.toGradeResponse)(response);
        });
    }
    ;
    static deleteGrade(grade, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteGradeRequest = validation_1.Validation.validate(grade_validation_1.GradeValidation.DELETE, request);
            const response = yield database_1.prismaClient.grade.deleteMany({
                where: {
                    enrollmentId: deleteGradeRequest.enrollmentId
                }
            });
            return {
                message: `Grade with enrollment id ${deleteGradeRequest.enrollmentId} has been deleted ${response.count}`
            };
        });
    }
    ;
}
exports.GradeService = GradeService;
;
