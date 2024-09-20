import { User } from "@prisma/client";
import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import { AdminLoginRequest, AdminRegisterRequest, AdminResponse, AdminUpdateRequest, toAdminResponse } from "../model/admin-model";
import { AdminValidate } from "../validation/admin-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class AdminService {

    static async register(request: AdminRegisterRequest): Promise<AdminResponse> {

        const registerRequest = Validation.validate(AdminValidate.CREATE, request);

        const userCount = await prismaClient.user.count({
            where: {
                email: registerRequest.email
            }
        });

        if (userCount !== 0) {
            throw new ResponseError(400, "Email already in use");
        };

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await prismaClient.user.create({
            data: {
                name: registerRequest.name,
                email: registerRequest.email,
                password: registerRequest.password,
                role: "ADMIN",
                Admin: {
                    create: {}
                }
            }
        });

        return toAdminResponse(user);

    };

    static async login(request: AdminLoginRequest): Promise<AdminResponse> {

        const loginRequest = Validation.validate(AdminValidate.LOGIN, request);

        let user = await prismaClient.user.findFirst({
            where: {
                email: loginRequest.email
            }
        });

        if (!user) {
            throw new ResponseError(404, "Email or password is wrong");
        };

        const isPasswordCorrect = await bcrypt.compare(loginRequest.password, user.password);

        if (!isPasswordCorrect) {
            throw new ResponseError(404, "Email or password is wrong");
        };

        user = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                token: uuid()
            }
        });

        const response = toAdminResponse(user!);
        response.token = user.token!;
        console.log(response);
        return response;
    };

    static async delete(user: User, request: AdminUpdateRequest): Promise<AdminResponse> {
 
        const deleteRequest = Validation.validate(AdminValidate.DELETE, request);

        const response = await prismaClient.user.deleteMany({
            where: {
                id: deleteRequest.id
            }
        });

        return {
            message: `Admin ${response.count} deleted`
        };

    };

    static async logout(user: User): Promise<AdminResponse> {

        const response = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                token: null
            }
        });

        return toAdminResponse(response);

    };

    static async update(user: User, request: AdminUpdateRequest): Promise<AdminResponse> {

        const updateRequest = Validation.validate(AdminValidate.UPDATE, request);

        if (updateRequest.name) {
            user.name = updateRequest.name;
        };

        if (updateRequest.email) {
            user.email = updateRequest.email;
        };

        const response = await prismaClient.user.update({
            where: {
                id: updateRequest.id
            },
            data: updateRequest
        });


        return toAdminResponse(response!);

    };

};