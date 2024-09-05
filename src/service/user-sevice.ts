import { User } from "@prisma/client";
import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import { RegisterUser, toUserResponse, UserResponse } from "../model/user-model";
import { UserValidate } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class UserService {

    static async register(request: RegisterUser): Promise<UserResponse> {

        const registerRequest = Validation.validate(UserValidate.REGISTER, request);

        const userCount = await prismaClient.user.count({
            where: {
                name: registerRequest.name
            }
        });

        if (userCount != 0) {
            throw new ResponseError(400, "User already exists");
        };

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await prismaClient.user.create({
            data: registerRequest
        });

        return toUserResponse(user);
    };

    static async login(request: RegisterUser): Promise<UserResponse> {

        const loginRequest = Validation.validate(UserValidate.LOGIN, request);

        let user = await prismaClient.user.findFirst({
            where: {
                nim: loginRequest.nim
            }
        });

        if (!user) {
            throw new ResponseError(400, "User or password is wrong");
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

        if (!isPasswordValid) {
            throw new ResponseError(400, "User or password is wrong");
        }

        user = await prismaClient.user.update({
            where: {
                nim: user.nim
            },
            data: {
                token: uuid()
            }
        });

        const response = toUserResponse(user);
        response.token = user.token!;
        return response;
    };

    static async get(user: User): Promise<UserResponse> {
        return toUserResponse(user);
    }

    static async update(user: User, request: RegisterUser): Promise<UserResponse> {
        
        const updateRequest = Validation.validate(UserValidate.UPDATE, request);

        if (updateRequest.nim) {
            user.nim = updateRequest.nim;
        };

        if (updateRequest.password) {
            user.password = await bcrypt.hash(updateRequest.password, 10);
        };

        if (updateRequest.name) {
            user.name = updateRequest.name;
        };

        if (updateRequest.date) {
            user.date = updateRequest.date;
        };

        if (updateRequest.gender) {
            user.gender = updateRequest.gender;
        };

        const response = await prismaClient.user.update({
            where: {
                nim: user.nim
            },
            data: user
        });

        if (!response) {
            throw new ResponseError(401, "Unauthorized");
        }

        return toUserResponse(response);
    }

}