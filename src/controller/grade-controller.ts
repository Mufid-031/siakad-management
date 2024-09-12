import { NextFunction, Request, Response } from "express";
import { GradeRequest } from "../model/grade-model";
import { GradeService } from "../service/grade-service";
import { GradeRequest as GradeReq } from "../types/grade-request";

export class GradeController {

    static async assignGrade(req: Request, res: Response, next: NextFunction) {
        try {
            const request: GradeRequest = req.body as GradeRequest;
            const response = await GradeService.assignGrade(request);

            res.status(200).json({
                status: 200,
                massage: "success asign grade",
                data: response
            });
        } catch (error) {
            next(error);
        }
    };

    static async updateGrade(req: GradeReq, res: Response, next: NextFunction) {
        try {
            const request: GradeRequest = req.body as GradeRequest;
            request.enrollmentId = Number(request.enrollmentId);
            request.grade = Number(request.grade);
            const response = await GradeService.updateGrade(req.grade!, request);

            res.status(200).json({
                status: 200,
                massage: "success update grade",
                data: response
            });
        } catch (error) {
            next(error);
        }
    };

    static async deleteGrade(req: GradeReq, res: Response, next: NextFunction) {
        try {
            const request: GradeRequest = req.params as unknown as GradeRequest;
            request.enrollmentId = Number(request.enrollmentId);
            const response = await GradeService.deleteGrade(req.grade!, request);

            res.status(200).json({
                status: 200,
                massage: "success delete grade",
                data: response
            });
        } catch (error) {
            next(error);
        }
    };

};