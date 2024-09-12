import { Request, Response, NextFunction } from "express";
import { CourseService } from "../service/course-service";
import { CourseRequest } from "../model/course-model";
import { CourseRequest as CourseReq } from "../types/course-request";

export class CourseController {

    static async getCourses(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CourseRequest = req.body as CourseRequest;
            const response = await CourseService.getCourses(request);

            res.status(200).json({
                status: 200,
                massage: "success get all course",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };

    static async createCourse(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CourseRequest = req.body as CourseRequest;
            const response = await CourseService.createCourse(request);

            res.status(201).json({
                status: 201,
                massage: "success create course",
                data: response,
            });
        } catch (error) {
            next(error);
        }

    };

    static async updateCourse(req: CourseReq, res: Response, next: NextFunction) {
        try {
            const request: CourseRequest = req.body as CourseRequest;
            request.id = Number(request.id);
            const response = await CourseService.updateCourse(req.course!, request);

            res.status(201).json({
                status: 201,
                massage: "success update course",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };

    static async deleteCourse(req: CourseReq, res: Response, next: NextFunction) {
        try {
            const request: CourseRequest = req.body as CourseRequest;
            request.id = Number(request.id);
            const response = await CourseService.deleteCourse(req.course!, request);

            res.status(201).json({
                status: 201,
                massage: "success delete course",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };

    static async getCourse(req: CourseReq, res: Response, next: NextFunction) {
        try {
            const request: CourseRequest = req.body as CourseRequest;
            const response = await CourseService.getCourse(req.course!, request);

            res.status(200).json({
                status: 200,
                massage: "success get course",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };

};