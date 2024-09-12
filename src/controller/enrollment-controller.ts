import { NextFunction, Request, Response } from "express";
import { EnrollmentRequest } from "../model/enrollment-model";
import { EnrollmentService } from "../service/enrollment-service";
import { EnrollmentRequest as EnrollmentReq } from "../types/enrollment-request";

export class EnrollmentController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as EnrollmentRequest;
            const response = await EnrollmentService.create(request);

            res.status(201).json({
               status: 201,
               message: "Enrollment created",
               data: response 
            });
        } catch (error) {
            next(error);
        }
    };

    static async delete(req: EnrollmentReq, res: Response, next: NextFunction) {
        try {
            const request = req.params as unknown as EnrollmentRequest;
            request.id = Number(request.id);
            const response = EnrollmentService.delete(req.enrollment!, request);
            
        } catch (error) {
            next(error);
        }
    };

};