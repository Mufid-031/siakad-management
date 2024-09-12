import { Request, Response, NextFunction } from "express";
import { StudentRequest } from "../model/student-model";
import { StudentService } from "../service/student-service";
import { UserRequest } from "../types/user-request";

export class StudentController {

    static async getStudents(req: Request, res: Response, next: NextFunction) {
        try {
            const api_key = req.headers['x-api-token'];
            const request: StudentRequest = req.body as StudentRequest;
            const response = await StudentService.getStudents(request);
            console.log(api_key);

            res.status(200).json({
                status: 200,
                massage: "success get all student",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: StudentRequest = req.body as StudentRequest;
            const response = await StudentService.register(request);

            res.status(201).json({
                status: 201,
                massage: "success register student",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: StudentRequest = req.body as StudentRequest;
            const response = await StudentService.update(req.user!, request);

            res.status(201).json({
                status: 201,
                massage: "success update student",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: StudentRequest = req.body as StudentRequest;
            const response = await StudentService.login(request);

            res.status(200).json({
                status: 200,
                massage: "success login student",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await StudentService.logout(req.user!);

            res.status(200).json({
                status: 200,
                massage: "success logout student",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };

    static async getStudent(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: StudentRequest = req.params as StudentRequest;
            const response = await StudentService.getStudent(req.user!, request.id as number);

            res.status(200).json({
                status: 200,
                massage: "success get student",
                data: response,
            })
        } catch (error) {
            next(error);
        }
    };

    static async delete(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: StudentRequest = req.params as StudentRequest;
            request.id = Number(request.id);
            const response = await StudentService.delete(req.user!, request);

            res.status(200).json({
                status: 200,
                massage: "success delete student",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };

};