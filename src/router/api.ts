import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { StudentController } from "../controller/student-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/students", StudentController.getStudents);
apiRouter.patch("/api/students", StudentController.update);
apiRouter.patch("/api/students/logout", StudentController.logout);