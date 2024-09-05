import { User } from "@prisma/client";
import { prismaClient } from "../src/app/database";
import bcrypt from "bcrypt";

export class UserTest {
    
    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                name: "test"
            }
        })
    }

    static async create() {
        await prismaClient.user.create({
            data: {
                name: "test",
                nim: "123456789012",
                password: await bcrypt.hash("test", 10),
                date: "test",
                gender: "test"
            }
        })
    }

    static async get(): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {
                nim: "123"
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

}