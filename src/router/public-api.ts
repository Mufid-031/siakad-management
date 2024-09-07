import express from "express";
import { StudentController } from "../controller/student-controller";

export const publicRouter = express.Router();

publicRouter.post("/api/students/register", StudentController.register);
publicRouter.post("/api/students/login", StudentController.login);