import express from "express";
import { StudentController } from "../controller/student-controller";
import { TeacherController } from "../controller/teacher-controller";

export const publicRouter = express.Router();

// Student API
publicRouter.post("/api/students/register", StudentController.register); //✅
publicRouter.post("/api/students/login", StudentController.login);       //✅

// Teacher API
publicRouter.post("/api/teachers/register", TeacherController.register); //✅
publicRouter.post("/api/teachers/login", TeacherController.login);       //✅
