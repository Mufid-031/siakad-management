import { User } from "@prisma/client";
import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import { StudentLoginRequest, StudentRegisterRequest, StudentRequest, StudentResponse, StudentUpdateRequest, toStudentResponse } from "../model/student-model";
import { StudentValidate } from "../validation/student-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class StudentService {

    static async getStudents(request: StudentRequest): Promise<StudentResponse[]> {
        
        const students = await prismaClient.student.findMany({
            include: {
              user: true,
              enrollments: true  
            },
        });

        return students.map(student => toStudentResponse(student));

    };

    static async register(request: StudentRegisterRequest): Promise<StudentResponse> {

        const registerRequest = Validation.validate(StudentValidate.REGISTER, request);

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
                role: "STUDENT",
                student: {
                    create: {
                        nim: registerRequest.nim!,
                    }
                }
            }
        });

        return toStudentResponse(user);

    };

    static async update(user: User, request: StudentUpdateRequest): Promise<StudentResponse> {

        const updateRequest = Validation.validate(StudentValidate.UPDATE, request);

        if (updateRequest.email) {
            updateRequest.email = updateRequest.email;
        };

        if (updateRequest.password) {
            updateRequest.password = await bcrypt.hash(updateRequest.password, 10);
        };

        const response = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                email: updateRequest.email,
                password: updateRequest.password
            }
        });

        return toStudentResponse(response);

    };

    static async login(request: StudentLoginRequest): Promise<StudentResponse> {

        const loginRequest = Validation.validate(StudentValidate.LOGIN, request);

        let user = await prismaClient.user.findFirst({
            where: {
                student: {
                    nim: loginRequest.nim
                }
            }
        });

        if (!user) {
            throw new ResponseError(404, "Nim or password is wrong");
        };

        const isPasswordCorrect = await bcrypt.compare(loginRequest.password!, user.password);

        if (!isPasswordCorrect) {
            throw new ResponseError(404, "Nim or password is wrong");
        };

        user = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                token: uuid()
            }
        });

        const response = toStudentResponse(user);
        response.token = user.token!;
        console.log(response);
        return response;

    };

    static async logout(user: User): Promise<StudentResponse> {

        const response = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                token: null
            }
        });

        return toStudentResponse(response);
    };

    static async getStudent(user: User, id: number): Promise<StudentResponse> {

        const student = await prismaClient.student.findUnique({
            where: {
                userId: Number(id)
            },
            include: {
                user: true,
                enrollments: true
            }
        });

        if (!student) {
            throw new ResponseError(404, "Student not found");
        };

        const response = toStudentResponse(student);
        return response;

    };


    static async delete(user: User, request: StudentRequest): Promise<StudentResponse> {

        const deleteRequest = Validation.validate(StudentValidate.DELETE, request);

        const response = await prismaClient.user.deleteMany({
            where: {
                id: deleteRequest.id
            }
        });

        return {
            message: `Student ${response.count} deleted`
        };

    };

}