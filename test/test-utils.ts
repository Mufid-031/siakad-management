import { prismaClient } from "../src/app/database";
import bcrypt from "bcrypt";
import { ResponseError } from "../src/error/response-error";

export class StudentTest {

    static async create() {
        const email = "test@gmail.com";

        const newUser = await prismaClient.user.upsert({
            where: { email },
            update: {
                password: "update_test",
                name: "update_test",
            },
            create: {
                id: 12345,
                email: email,
                password: "test",
                name: "test",
                role: "STUDENT",
            },
        });

        return newUser;
    }

    static async delete() {
        const userId = 12345;
        
        await prismaClient.student.deleteMany({
            where: { userId: userId }
        });
        
        await prismaClient.user.deleteMany({
            where: { id: userId }
        });
    };

    static async get() {
        const user = await prismaClient.user.findFirst({
            where: {
                name: "test",
            }
        });

        if (!user) {
            throw new ResponseError(404, "Nim or password is wrong");
        };

        return user;
    }

    static async login() {
        await prismaClient.user.update({
            where: { id: 12345 },
            data: {
                token: "test",
            }
        });
    };

    static async logout() {
        await prismaClient.user.update({
            where: { id: 12345 },
            data: {
                token: null,
            }
        });
    };

};