import { Request, Response, NextFunction } from "express";
import { RegisterUser, ResponseRegisterUser } from "../model/user-model";
import { UserService } from "../service/user-sevice";
import { UserRequest } from "../types/user-request";

export class UserController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RegisterUser = req.body as RegisterUser;
            const response: ResponseRegisterUser = await UserService.register(request);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    };

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RegisterUser = req.body as RegisterUser;
            const response: ResponseRegisterUser = await UserService.login(request);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    };

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.get(req.user!);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    };

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: RegisterUser = req.body as RegisterUser;
            const response: ResponseRegisterUser = await UserService.update(req.user!, request);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    };
    
}