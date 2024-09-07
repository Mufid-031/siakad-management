"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const student_controller_1 = require("../controller/student-controller");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(auth_middleware_1.authMiddleware);
// User API
exports.apiRouter.get("/api/students", student_controller_1.StudentController.getStudents);
exports.apiRouter.patch("/api/students", student_controller_1.StudentController.update);
exports.apiRouter.patch("/api/students/logout", student_controller_1.StudentController.logout);
