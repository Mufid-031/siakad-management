import supertest from "supertest";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";
import { TeacherTest } from "./test-utils";
import bcrypt from "bcrypt";

describe("GET /api/teachers", () => {
    beforeAll(async () => {
        await TeacherTest.create();
    });

    afterAll(async () => {
        await TeacherTest.delete();
    });

    it("should be able to get all teachers", async () => {
        const response = await supertest(web)
            .get("/api/teachers")
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.massage).toBe("success get all teacher");
        expect(response.body.data).toBeDefined();
    });

    it("should reject get all teachers if request is invalid", async () => {
        const response = await supertest(web)
            .get("/api/teachers")
            .set("X-API-TOKEN", "");

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});

describe("POST /api/teachers/register", () => {
    afterAll(async () => {
        await TeacherTest.delete();
    });

    it("should reject register new teacher if request is invalid", async () => {
        const response = await supertest(web)
            .post("/api/teachers/register")
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

    it("should be able to register new teacher", async () => {
        const response = await supertest(web)
            .post("/api/teachers/register")
            .send({
                name: "test",
                email: "test",
                password: "test",
                nim: "test",
            });

        logger.debug(response.body);
        expect(response.status).toBe(201);
        expect(response.body.massage).toBe("success create teacher");
        expect(response.body.data).toBeDefined();
    });
});

describe("POST /api/teachers/login", () => {
    beforeAll(async () => {
        await TeacherTest.create();
    });

    afterAll(async () => {
        await TeacherTest.delete();
    });

    it("should reject login teacher if request is invalid", async () => {
        const response = await supertest(web)
            .post("/api/teachers/login")
            .send({
                nip: "test",
                password: "test",
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should be able to login teacher", async () => {
        const response = await supertest(web)
            .post("/api/teachers/login")
            .send({
                nip: "test",
                password: "test",
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.massage).toBe("success login teacher");
        expect(response.body.data).toBeDefined();
    });
});

describe("PATCH /api/teachers", () => {
    beforeAll(async () => {
        await TeacherTest.create();
    });

    afterAll(async () => {
        await TeacherTest.delete();
    });

    it("should reject update teacher if request is invalid", async () => {
        const response = await supertest(web)
            .patch("/api/teachers")
            .send({
                email: "",
                password: "",
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should be able to update teacher", async () => {
        const response = await supertest(web)
            .patch("/api/teachers")
            .send({
                email: "update_test",
                password: "update_test",
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.massage).toBe("success update teacher");
        expect(response.body.data).toBeDefined();
        expect(response.body.data.email).toBe("update_test");
        expect(await bcrypt.compare("update_test", response.body.data.password)).toBe(true);
    });
});

describe("PATCH /api/teachers/logout", () => {
    beforeAll(async () => {
        await TeacherTest.create();
    });

    afterAll(async () => {
        await TeacherTest.delete();
    });

    it("should be able to logout teacher", async () => {
        const response = await supertest(web)
            .patch("/api/teachers/logout")
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.massage).toBe("success logout teacher");
    });

    it("should reject logout teacher if request is invalid", async () => {
        const response = await supertest(web)
            .patch("/api/teachers/logout")
            .set("X-API-TOKEN", "");

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});

describe("GET /api/teachers/:id", () => {
    beforeAll(async () => {
        await TeacherTest.create();
    });

    afterAll(async () => {
        await TeacherTest.delete();
    });

    it("should be able to get teacher by id", async () => {
        const response = await supertest(web)
            .get("/api/teachers/12351")
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.massage).toBe("success get teacher");
        expect(response.body.data).toBeDefined();
    });

    it("should reject get teacher by id if request is invalid", async () => {
        const response = await supertest(web)
            .get("/api/teachers/12351")
            .set("X-API-TOKEN", "");

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});