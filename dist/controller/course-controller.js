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
exports.CourseController = void 0;
const course_service_1 = require("../service/course-service");
class CourseController {
    static getCourses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield course_service_1.CourseService.getCourses(request);
                res.status(200).json({
                    status: 200,
                    massage: "success get all course",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static createCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield course_service_1.CourseService.createCourse(request);
                res.status(201).json({
                    status: 201,
                    massage: "success create course",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static updateCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id = Number(request.id);
                const response = yield course_service_1.CourseService.updateCourse(req.course, request);
                res.status(201).json({
                    status: 201,
                    massage: "success update course",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static deleteCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id = Number(request.id);
                const response = yield course_service_1.CourseService.deleteCourse(req.course, request);
                res.status(201).json({
                    status: 201,
                    massage: "success delete course",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static getCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield course_service_1.CourseService.getCourse(req.course, request);
                res.status(200).json({
                    status: 200,
                    massage: "success get course",
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
exports.CourseController = CourseController;
;
