import { NextFunction, Request, Response } from "express";
import { EnrollmentRequest } from "../model/enrollment-model";
import { EnrollmentService } from "../service/enrollment-service";
import { EnrollmentRequest as EnrollmentReq } from "../types/enrollment-request";

export class EnrollmentController {

    static async createEnrollment(req: Request, res: Response, next: NextFunction) {
        try {
            const request: EnrollmentRequest = req.body as EnrollmentRequest;
            const response = await EnrollmentService.createEnrollment(request);

            res.status(201).json({
               status: 201,
               message: "Enrollment created",
               data: response 
            });
        } catch (error) {
            next(error);
        }
    };

    static async deleteEnrollment(req: EnrollmentReq, res: Response, next: NextFunction) {
        try {
            const request: EnrollmentRequest = req.params as unknown as EnrollmentRequest;
            request.id = Number(request.id);
            const response = EnrollmentService.deleteEnrollment(req.enrollment!, request);
            
            res.status(200).json({
                status: 200,
                message: "Enrollment deleted",
                data: response
            });
        } catch (error) {
            next(error);
        }
    };

    static async getAllEnrollmentsStudent(req: EnrollmentReq, res: Response, next: NextFunction) {
        try {
            const request: EnrollmentRequest = req.params as unknown as EnrollmentRequest;
            request.studentId = Number(request.studentId);
            const response = await EnrollmentService.getAllEnrollmentsStudent(req.enrollment!, request);
            res.status(200).json({
                status: 200,
                message: "success get all enrollments student",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

};