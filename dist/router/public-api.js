"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../controller/student-controller");
const teacher_controller_1 = require("../controller/teacher-controller");
const admin_controller_1 = require("../controller/admin-controller");
exports.publicRouter = express_1.default.Router();
// Student API
exports.publicRouter.post("/api/students/register", student_controller_1.StudentController.register); //✅
exports.publicRouter.post("/api/students/login", student_controller_1.StudentController.login); //✅
// Teacher API
exports.publicRouter.post("/api/teachers/register", teacher_controller_1.TeacherController.register); //✅
exports.publicRouter.post("/api/teachers/login", teacher_controller_1.TeacherController.login); //✅
// ADMIN API
exports.publicRouter.post("/api/admin/register", admin_controller_1.AdminController.register);
exports.publicRouter.post("/api/admin/login", admin_controller_1.AdminController.login);
