import { Request, Response, NextFunction } from "express";
import { RegisterUser, ResponseRegisterUser } from "../model/user-model";
import { UserService } from "../service/user-sevice";

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
    }
    
}