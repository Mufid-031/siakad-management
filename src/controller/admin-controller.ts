import { NextFunction, Request, Response } from "express";
import { AdminLoginRequest, AdminRegisterRequest, AdminUpdateRequest } from "../model/admin-model";
import { AdminService } from "../service/admin-service";
import { UserRequest } from "../types/user-request";

export class AdminController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: AdminRegisterRequest = req.body as AdminRegisterRequest;
            const response = await AdminService.register(request);

            res.status(201).json({
                status: 201,
                massage: "success register admin",
                data: response
            });
        } catch (error) {
            next(error);
        }
    };

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: AdminLoginRequest = req.body as AdminLoginRequest;
            const response = AdminService.login(request);

            res.status(200).json({
                status: 200,
                massage: "success login admin",
                data: response
            });
        } catch (error) {
            next(error);
        }
    };

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: AdminUpdateRequest = req.body as AdminUpdateRequest;
            const response = await AdminService.update(req.user!, request);

            res.status(201).json({
                status: 201,
                massage: "success update admin",
                data: response
            });
        } catch (error) {
            next(error);
        }
    };

    static async delete(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request = req.params as AdminUpdateRequest;
            request.id = Number(request.id);
            const response = await AdminService.delete(req.user!, request);

            res.status(200).json({
                status: 200,
                massage: "success delete admin",
                data: response
            });
        } catch (error) {
            next(error);
        }
    };

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await AdminService.logout(req.user!);

            res.status(200).json({
                status: 200,
                massage: "success logout admin",
                data: response
            });
        } catch (error) {
            next(error);
        }
    };

};