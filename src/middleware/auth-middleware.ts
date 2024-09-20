import { NextFunction, Response } from "express";
import { prismaClient } from "../app/database";
import { UserRequest } from "../types/user-request";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {

    const excludedRoutes = [
        '/api/students/register',
        '/api/students/login',
        '/api/teachers/register',
        '/api/teachers/login'
    ];

    if (!req.path.startsWith('/api')) {
        return next();
    }

    if (excludedRoutes.includes(req.path)) {
        return next();
    }
    
    const token = req.get("X-API-TOKEN");

    if (token) {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        });

        // if (user?.role === "ADMIN") {
        //     const user = await prismaClient.user.findFirst({
        //         where: {
        //             id: req.body.id
        //         }
        //     });

        //     if (user) {
        //         req.user = user;
        //         next();
        //         return;
        //     }
        // };

        if (user) {
            req.user = user;
            next();
            return;
        }

    }

    res.status(401).json({ 
        errors: "Unauthorized"
    }).end();
}