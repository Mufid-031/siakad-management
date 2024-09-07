import supertest from "supertest";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";
import { StudentTest } from "./test-utils";
import bcrypt from "bcrypt";


describe("POST /api/students/register", () => {

    afterAll(async () => {
        await StudentTest.delete();
    });

    it("should reject register new student if request is invalid", async () => {
        const response = await supertest(web)
            .post("/api/students/register")
            .send({
                name: "",
                email: "",
                password: "",
                nim: "",
            });
        
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should be able to register new student", async () => {
        const response = await supertest(web)
            .post("/api/students/register")
            .send({
                id: 12345,
                name: "test",
                email: "test",
                password: "test",
                nim: "test",
            });

        logger.debug(response.body);
        expect(response.status).toBe(201);
        expect(response.body.massage).toBe("success register student");
        expect(response.body.data.name).toBe("test");
    });

});

describe("GET /api/students", () => {

    beforeAll(async () => {
        await StudentTest.create();
        await StudentTest.login();
    });

    afterAll(async () => {
        await StudentTest.logout();
        await StudentTest.delete();
    });

    it("should be able to get all student", async () => {
        const response = await supertest(web)
            .get("/api/students")
            .set("X-API-TOKEN", "test");
        
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.massage).toBe("success get all student");
        expect(response.body.data.length).toBe(2);
    });
});

describe("PATCH /api/students", () => {

    beforeAll(async () => {
        await StudentTest.create();
        await StudentTest.login();
    });

    afterAll(async () => {
        await StudentTest.logout();
        await StudentTest.delete();
    });

    it("should be able to update student email", async () => {
        const response = await supertest(web)
            .patch("/api/students")
            .set("X-API-TOKEN", "test")
            .send({
                id: 12345,
                email: "update_test@gmail.com",
            });

        logger.debug(response.body);
        expect(response.status).toBe(201);
        expect(response.body.massage).toBe("success update student");
        expect(response.body.data.email).toBe("update_test@gmail.com");
    });

    it("should be able to update student password", async () => {
        const response = await supertest(web)
            .patch("/api/students")
            .set("X-API-TOKEN", "test")
            .send({
                id: 12345,
                password: "update_test",
            });

        logger.debug(response.body);
        expect(response.status).toBe(201);
        expect(response.body.massage).toBe("success update student");
        const user = await StudentTest.get();
        expect(await bcrypt.compare("update_test", user.password)).toBe(true);
    });

});