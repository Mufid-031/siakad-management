import { Course, User } from "@prisma/client";

export type TeacherResponse = {
    id?: number;
    name?: string;
    nip?: string;
    course?: Course[];
    createdAt?: Date;
    updatedAt?: Date;
    user?: User;
    token?: string | null;
    message?: string;
};

export type TeacherRequest = {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    nip?: string;
};

export type TeacherRegisterRequest = {
    name?: string;
    email?: string;
    password?: string;
    nip?: string;
};

export type TeacherUpdateRequest = {
    id?: number;
    email?: string;
    password?: string;
};

export type TeacherLoginRequest = {
    nip?: string;
    password?: string;
};

export function toTeacherResponse(teacher: TeacherResponse): TeacherResponse {
    return {
        id: teacher.id,
        name: teacher.name,
        nip: teacher.nip,
        course: teacher.course,
        createdAt: teacher.createdAt,
        updatedAt: teacher.updatedAt,
        user: teacher.user,
        token: teacher.token,
    }
}