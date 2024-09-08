import { prismaClient } from "../src/app/database";
import { ResponseError } from "../src/error/response-error";


export class StudentTest {
  static async create() {
    const email = "test@gmail.com";

    const user = await prismaClient.user.create({
      data: {
        email: email,
        name: "test",
        password: "test",
        role: "STUDENT",
        student: {
          create: {
            nim: "test",
          },
        },
      },
    });

    return user;
  }

  static async delete() {
    const userId = 12345;

    await prismaClient.student.deleteMany({
      where: { userId: userId },
    });

    await prismaClient.user.deleteMany({
      where: { id: userId },
    });
  }

  static async get() {
    const user = await prismaClient.user.findFirst({
      where: {
        name: "test",
      },
    });

    if (!user) {
      throw new ResponseError(404, "Nim or password is wrong");
    }

    return user;
  }


};


export class TeacherTest {

  static async create() {
    const email = "test@gmail.com";

    const user = await prismaClient.user.create({
      data: {
        email: email,
        name: "test",
        password: "test",
        role: "TEACHER",
        teacher: {
          create: {
            nip: "test",
          },
        },
      },
    });

    return user;
  };

  static async delete() {
    const userId = 12345;

    await prismaClient.teacher.deleteMany({
      where: { userId: userId },
    });
  };

};