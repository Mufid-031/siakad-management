import { User } from "@prisma/client";
import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import { TeacherLoginRequest, TeacherRegisterRequest, TeacherRequest, TeacherResponse, TeacherUpdateRequest, toTeacherResponse } from "../model/teacher-model";
import { TeacherValidate } from "../validation/teacher-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class TeacherService {

    static async getTeachers(request: TeacherRequest): Promise<TeacherResponse[]> {

        const teachers = await prismaClient.teacher.findMany({
            include: {
              user: true,
              courses: true
            },
        });

        return teachers.map(teacher => toTeacherResponse(teacher));

    };

    static async register(request: TeacherRegisterRequest): Promise<TeacherResponse> {

        const registerRequest = Validation.validate(TeacherValidate.REGISTER, request);

        const userCount = await prismaClient.user.count({
            where: {
                email: registerRequest.email,
            }
        });

        if (userCount !== 0) {
            throw new ResponseError(400, "Email already in use");
        };

        registerRequest.password = await bcrypt.hash(registerRequest.password!, 10);

        const user = await prismaClient.user.create({
            data: {
                name: registerRequest.name!,
                email: registerRequest.email!,
                password: registerRequest.password!,
                role: "TEACHER",
                teacher: {
                    create: {
                        nip: registerRequest.nip!,
                    }
                }
            }
        });

        return toTeacherResponse(user);

    };

    static async update(user: User, request: TeacherUpdateRequest): Promise<TeacherResponse> {

        const updateRequest = Validation.validate(TeacherValidate.UPDATE, request);

        if (updateRequest.email) {
            user.email = updateRequest.email;
        };

        if (updateRequest.password) {
            updateRequest.password = await bcrypt.hash(updateRequest.password!, 10);
        };

        const response = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                email: updateRequest.email,
                password: updateRequest.password
            },
        });

        return toTeacherResponse(response);

    };

    static async login(request: TeacherLoginRequest): Promise<TeacherResponse> {

        const loginRequest = Validation.validate(TeacherValidate.LOGIN, request);

        let user = await prismaClient.user.findFirst({
            where: {
                teacher: {
                    nip: loginRequest.nip,
                }
            }
        });

        if (!user) {
            throw new ResponseError(404, "Nip or password is wrong");
        };

        const isPasswordCorrect = await bcrypt.compare(loginRequest.password!, user.password!);

        if (!isPasswordCorrect) {
            throw new ResponseError(404, "Nip or password is wrong");
        };

        user = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                token: uuid()
            }
        });

        const response = toTeacherResponse(user);
        response.token = user.token!;
        return response;

    };

    static async logout(user: User): Promise<TeacherResponse> {

        const response = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                token: null
            }
        });

        return toTeacherResponse(response);

    };

    static async getTeacher(user: User, request: TeacherRequest): Promise<TeacherResponse> {

        const teacher = await prismaClient.teacher.findFirst({
            where: {
                userId: request.id,
            },
            include: {
              user: true,
              courses: true
            },
        });

        if (!teacher) {
            throw new ResponseError(404, "Teacher not found");
        };

        const response = toTeacherResponse(teacher);
        return response;
        
    };

    static async delete(user: User, request: TeacherRequest): Promise<TeacherResponse> {

        const deleteRequest = Validation.validate(TeacherValidate.DELETE, request);

        const teacher = await prismaClient.teacher.deleteMany({
            where: {
                id: deleteRequest.id
            }
        });

        return {
            message: `Teacher ${teacher.count} deleted`
        };

    };

};