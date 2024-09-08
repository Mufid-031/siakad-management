"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const student_controller_1 = require("../controller/student-controller");
const teacher_controller_1 = require("../controller/teacher-controller");
const course_controller_1 = require("../controller/course-controller");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(auth_middleware_1.authMiddleware);
// Student API
exports.apiRouter.get("/api/students", student_controller_1.StudentController.getStudents); //✅
exports.apiRouter.patch("/api/students", student_controller_1.StudentController.update); //✅
exports.apiRouter.patch("/api/students/logout", student_controller_1.StudentController.logout); //✅
exports.apiRouter.get("/api/students/:id", student_controller_1.StudentController.getStudent); //✅
// Teacher API
exports.apiRouter.get("/api/teachers", teacher_controller_1.TeacherController.getTeachers); //✅
exports.apiRouter.patch("/api/teachers", teacher_controller_1.TeacherController.update); //✅
exports.apiRouter.patch("/api/teachers/logout", teacher_controller_1.TeacherController.logout); //✅
exports.apiRouter.get("/api/teachers/:id", teacher_controller_1.TeacherController.getTeacher); //✅
// Course API
exports.apiRouter.get("/api/courses", course_controller_1.CourseController.getCourses);
exports.apiRouter.post("/api/courses", course_controller_1.CourseController.createCourse);
exports.apiRouter.patch("/api/courses", course_controller_1.CourseController.updateCourse);
exports.apiRouter.patch("/api/courses/:id", course_controller_1.CourseController.deleteCourse);
exports.apiRouter.get("/api/courses/:id", course_controller_1.CourseController.getCourse);
