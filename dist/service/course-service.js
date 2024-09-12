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
exports.CourseService = void 0;
const database_1 = require("../app/database");
const course_model_1 = require("../model/course-model");
const validation_1 = require("../validation/validation");
const course_validation_1 = require("../validation/course-validation");
class CourseService {
    static getCourses(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.prismaClient.course.findMany({
                include: {
                    teacher: true,
                    enrollments: true
                }
            });
            return response.map(course => (0, course_model_1.toCourseResponse)(course));
        });
    }
    ;
    static createCourse(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(course_validation_1.CourseValidate.CREATE, request);
            const course = yield database_1.prismaClient.course.create({
                data: {
                    name: createRequest.name,
                    code: createRequest.code,
                    teacherId: createRequest.teacherId
                }
            });
            return (0, course_model_1.toCourseResponse)(course);
        });
    }
    ;
    static updateCourse(course, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(course_validation_1.CourseValidate.UPDATE, request);
            if (updateRequest.name) {
                course.name = updateRequest.name;
            }
            ;
            if (updateRequest.code) {
                course.code = updateRequest.code;
            }
            ;
            if (updateRequest.teacherId) {
                course.teacherId = updateRequest.teacherId;
            }
            ;
            const response = yield database_1.prismaClient.course.update({
                where: {
                    id: course.id
                },
                data: updateRequest
            });
            return (0, course_model_1.toCourseResponse)(response);
        });
    }
    ;
    static deleteCourse(course, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteRequest = validation_1.Validation.validate(course_validation_1.CourseValidate.DELETE, request);
            const response = yield database_1.prismaClient.course.deleteMany({
                where: {
                    id: deleteRequest.id
                }
            });
            return {
                message: `Course ${response.count} deleted`
            };
        });
    }
    ;
    static getCourse(course, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const getCourseRequest = validation_1.Validation.validate(course_validation_1.CourseValidate.DELETE, request);
            const response = yield database_1.prismaClient.course.findUnique({
                where: {
                    id: getCourseRequest.id
                }
            });
            return (0, course_model_1.toCourseResponse)(response);
        });
    }
    ;
}
exports.CourseService = CourseService;
;
