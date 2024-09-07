"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../controller/student-controller");
exports.publicRouter = express_1.default.Router();
exports.publicRouter.post("/api/students/register", student_controller_1.StudentController.register);
exports.publicRouter.post("/api/students/login", student_controller_1.StudentController.login);
