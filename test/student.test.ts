import supertest from "supertest";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";
import { StudentTest } from "./test-utils";
import bcrypt from "bcrypt";


describe("GET /api/students", () => {
  beforeAll(async () => {
    await StudentTest.create();
  });

  afterAll(async () => {
    await StudentTest.delete();
  });

  it("should be able to get all students", async () => {
    const response = await supertest(web)
      .get("/api/students")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.massage).toBe("success get all student");
    expect(response.body.data).toBeDefined();
  });

  it("should reject get all students if request is invalid", async () => {
    const response = await supertest(web)
      .get("/api/students")
      .set("X-API-TOKEN", "");

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

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
  });

  afterAll(async () => {
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
  });

  afterAll(async () => {
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

describe("POST /api/students/login", () => {
  beforeAll(async () => {
    await StudentTest.create();
  });

  afterAll(async () => {
    await StudentTest.delete();
  });

  it("should be able to login student", async () => {
    const response = await supertest(web)
      .post("/api/students/login")
      .send({
        nim: "test",
        password: "test",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.massage).toBe("success login student");
    expect(response.body.data.token).toBeDefined();
  });

  it("should reject login student if request is invalid", async () => {
    const response = await supertest(web)
      .post("/api/students/login")
      .send({
        nim: "",
        password: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.massage).toBe("Nim or password is wrong");
    expect(response.body.data).toBeUndefined();
  });
});

describe("POST /api/students/logout", () => {
  beforeAll(async () => {
    await StudentTest.create();
  });

  afterAll(async () => {
    await StudentTest.delete();
  });

  it("should be able to logout student", async () => {
    const response = await supertest(web)
      .post("/api/students/logout")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.massage).toBe("success logout student");
    expect(response.body.data.token).toBeNull();
  });
});

describe("GET /api/students/:id", () => {
  beforeAll(async () => {
    await StudentTest.create();
  });

  afterAll(async () => {
    await StudentTest.delete();
  });

  it("should be able to get student by id", async () => {
    const response = await supertest(web)
      .get("/api/students/9")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.massage).toBe("success get student");
    expect(response.body.data.name).toBe("Ahmad Mufid Risqi");
  });

  it("should reject get student by id if request is invalid", async () => {
    const response = await supertest(web)
      .get("/api/students/9")
      .set("X-API-TOKEN", "");

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.massage).toBe("Nim or password is wrong");
    expect(response.body.data).toBeUndefined();
  });
});