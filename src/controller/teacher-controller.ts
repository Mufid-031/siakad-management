import { Request, Response, NextFunction } from "express";
import { TeacherRequest } from "../model/teacher-model";
import { TeacherService } from "../service/teacher-service";
import { UserRequest } from "../types/user-request";

export class TeacherController {

    static async getTeachers(req: Request, res: Response, next: NextFunction) {
        try {
            const request: TeacherRequest = req.body as TeacherRequest;
            const response = await TeacherService.getTeachers(request);

            res.status(200).json({
               status: 200,
               massage: "success get all teacher",
               data: response,
            });
        } catch (error) {
            next(error);
        }
    };

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: TeacherRequest = req.body as TeacherRequest;
            const response = await TeacherService.register(request);

            res.status(201).json({
                status: 201,
                massage: "success register teacher",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: TeacherRequest = req.body as TeacherRequest;
            const response = await TeacherService.update(req.user!, request);

            res.status(201).json({
                status: 201,
                massage: "success update teacher",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: TeacherRequest = req.body as TeacherRequest;
            const response = await TeacherService.login(request);

            res.status(200).json({
                status: 200,
                massage: "success login teacher",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: TeacherRequest = req.body as TeacherRequest;
            const response = await TeacherService.logout(req.user!);

            res.status(200).json({
                status: 200,
                massage: "success logout teacher",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };

    static async getTeacher(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: TeacherRequest = req.params as TeacherRequest;
            const { id }: TeacherRequest = request;
            const response = await TeacherService.getTeacher(req.user!, id!);

            res.status(200).json({
                status: 200,
                massage: "success get teacher",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };

};