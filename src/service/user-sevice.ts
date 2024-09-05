import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import { RegisterUser, ResponseRegisterUser, toUserResponse } from "../model/user-model";
import { UserValidate } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

export class UserService {

    static async register(request: RegisterUser): Promise<ResponseRegisterUser> {

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
    }

}