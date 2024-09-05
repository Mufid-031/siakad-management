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

describe("POST /api/users/login", () => {

    beforeAll(async () => {
        await UserTest.create();
    });

    afterAll(async () => {
        await UserTest.delete();
    });

    it("should reject login if request is invalid", async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                nim: "",
                password: ""
            });
        
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject login if nim is wrong", async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                nim: "wrong",
                password: "test"
            });
        
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject login if password is wrong", async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                nim: "123456789012",
                password: "wrong"
            });
        
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should be able to login", async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                nim: "123456789012",
                password: "test"
            });
        
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.nim).toBe("123456789012");
    });

});

describe("GET /api/users/current", () => {

    beforeAll(async () => {
        await UserTest.create();
    });

    afterAll(async () => {
        await UserTest.delete();
    });

    it("should get current user", async () => {
        const response = await supertest(web)
            .get("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                nim: "123456789012",
            });
        
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.nim).toBe("123456789012");
    });

    it("should not get current user if token is invalid", async () => {
        const response = await supertest(web)
            .get("/api/users/current")
            .set("X-API-TOKEN", "wrong");
        
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});

describe("PATCH /api/users/current", () => {

    beforeAll(async () => {
        await UserTest.create();
    });

    afterAll(async () => { 
        await UserTest.delete();
    });

    it("should update current user name", async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                name: "test1"
            });
        
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("test1");
        expect(response.body.data.nim).toBe("123456789012");
    });

    it("should update current user password", async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                password: "benar"
            });
        
        expect(response.status).toBe(200);
        expect(await bcrypt.compare("benar", response.body.data.password)).toBe(true);
    });

    it("should update current user date", async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                date: "1999-01-01"
            });
        
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("Ahmad Mufid Risqi");
        expect(response.body.data.nim).toBe("123456789012");
    });

    it("should update current user gender", async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                gender: "male"
            });
        
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("Ahmad Mufid Risqi");
        expect(response.body.data.nim).toBe("123456789012");
    });

    it("should not update current user if token is invalid", async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "wrong")
        
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});