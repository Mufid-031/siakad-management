import { User } from "@prisma/client";

export type UserResponse = {
    name: string;
    nim: string;
};

export type RegisterUser = {
    name: string;
    nim: string;
    password: string;
    date: string;
    gender: string;
};

export type ResponseRegisterUser = {
    name: string;
    nim: string;
};

export function toUserResponse(user: User): UserResponse {
    return {
        name: user.name,
        nim: user.nim,
    }
};