export type AdminResponse = {
    id?: number;
    name?: string;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;
    message?: string;
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
}

export function toAdminResponse(admin: AdminResponse): AdminResponse {
    return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
        message: admin.message
    }
}