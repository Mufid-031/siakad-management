import { Enrollment, User } from "@prisma/client";

export type StudentResponse = {
    id?: number;
    name?: string;
    nim?: string;
    enrollments?: Enrollment[]
    createdAt?: Date;
    updatedAt?: Date;
    user?: User;
    token?: string | null;
    message?: string;
};

export type StudentRequest = {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    nim?: string;
};

export type StudentRegisterRequest = {
    name?: string;
    email?: string;
    password?: string;
    nim?: string;
};

export type StudentUpdateRequest = {
    id?: number;
    email?: string;
    password?: string;
};

export type StudentLoginRequest = {
    nim?: string;
    password?: string;
};

export function toStudentResponse(student: StudentResponse): StudentResponse {
    return {
        id: student.id,
        name: student.name,
        nim: student.nim,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
        user: student.user,
        enrollments: student.enrollments,
        token: student.token,
    }
};