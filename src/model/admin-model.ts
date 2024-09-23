import { User } from "@prisma/client";

export type AdminResponse = {
    id?: number;
    name?: string;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;
    message?: string;
    user?: User;
    token?: string | null;
}

export type AdminRegisterRequest = {
    name: string;
    email: string;
    password: string;
}

export type AdminLoginRequest = {
    email: string;
    password: string;
}

export type AdminUpdateRequest = {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: "STUDENT" | "TEACHER" | "ADMIN";
}

export function toAdminResponse(admin: AdminResponse): AdminResponse {
    return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
        user: admin.user,
        token: admin.token,
        message: admin.message
    }
}