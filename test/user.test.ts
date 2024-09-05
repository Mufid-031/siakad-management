import supertest from "supertest";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";
import { UserTest } from "./test-utils";
import bcrypt from "bcrypt";

describe("POST /api/users", () => {

    afterAll(async () => {
        await UserTest.delete();
    });

    it("should reject register new user if request is invalid", async () => {
        const response = await supertest(web)
            .post("/api/users")
            .send({
                name: "",
                nim: "",
                password: "",
                date: "",
                gender: ""
            });
        
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject register new user if user already exists", async () => {
        const response = await supertest(web)
            .post("/api/users")
            .send({
                name: "Ahmad Mufid Risqi",
                nim: "230411100031",
                password: "Mufidhahaha",
                date: "270305",
                gender: "laki-laki"
            });
        
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should register new user", async () => {
        const response = await supertest(web)
            .post("/api/users")
            .send({
                name: "test",
                nim: "123456789012",
                password: "test",
                date: "test",
                gender: "test"
            });
        
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.nim).toBe("123456789012");
    });
});