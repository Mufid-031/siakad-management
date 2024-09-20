import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { StudentController } from "../controller/student-controller";
import { TeacherController } from "../controller/teacher-controller";
import { CourseController } from "../controller/course-controller";
import { EnrollmentController } from "../controller/enrollment-controller";
import { GradeController } from "../controller/grade-controller";
import { AdminController } from "../controller/admin-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// Student API
apiRouter.get("/api/students", StudentController.getStudents);      //✅
apiRouter.patch("/api/students", StudentController.update);         //✅
apiRouter.patch("/api/students/logout", StudentController.logout);  //✅
apiRouter.delete("/api/students/:id", StudentController.delete);    //✅
apiRouter.get("/api/students/:id", StudentController.getStudent);   //✅

// Teacher API
apiRouter.get("/api/teachers", TeacherController.getTeachers);      //✅
apiRouter.patch("/api/teachers", TeacherController.update);         //✅
apiRouter.patch("/api/teachers/logout", TeacherController.logout);  //✅
apiRouter.delete("/api/teachers/:id", TeacherController.delete);    //✅
apiRouter.get("/api/teachers/:id", TeacherController.getTeacher);   //✅

// Admin API
apiRouter.patch("/api/admin", AdminController.update);              //✅
apiRouter.post("/api/admin/logout", AdminController.logout);        //✅
apiRouter.delete("/api/admin/:id", AdminController.delete);         //✅

// Course API
apiRouter.get("/api/courses", CourseController.getCourses);         //✅
apiRouter.post("/api/courses", CourseController.createCourse);      //✅
apiRouter.patch("/api/courses", CourseController.updateCourse);     //✅
apiRouter.delete("/api/courses/:id", CourseController.deleteCourse);//✅
apiRouter.get("/api/courses/:id", CourseController.getCourse);      //✅

// Enrollment API
apiRouter.post("/api/enrollments", EnrollmentController.createEnrollment);                      //✅
apiRouter.delete("/api/enrollments/:id", EnrollmentController.deleteEnrollment);                //✅
apiRouter.get("/api/enrollments/:studentId", EnrollmentController.getAllEnrollmentsStudent);    //✅

// Grade API
apiRouter.post("/api/grades/assign", GradeController.assignGrade);          //✅
apiRouter.patch("/api/grades", GradeController.updateGrade);                //✅
apiRouter.delete("/api/grades/:enrollmentId", GradeController.deleteGrade); //✅
