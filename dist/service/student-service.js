"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const database_1 = require("../app/database");
const response_error_1 = require("../error/response-error");
const student_model_1 = require("../model/student-model");
const student_validation_1 = require("../validation/student-validation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class StudentService {
    static getStudents(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield database_1.prismaClient.student.findMany({
                include: {
                    user: true,
                    enrollments: true
                },
            });
            return students.map(student => (0, student_model_1.toStudentResponse)(student));
        });
    }
    ;
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = validation_1.Validation.validate(student_validation_1.StudentValidate.REGISTER, request);
            const userCount = yield database_1.prismaClient.user.count({
                where: {
                    email: registerRequest.email,
                }
            });
            if (userCount !== 0) {
                throw new response_error_1.ResponseError(400, "Email already in use");
            }
            ;
            registerRequest.password = yield bcrypt_1.default.hash(registerRequest.password, 10);
            const user = yield database_1.prismaClient.user.create({
                data: {
                    name: registerRequest.name,
                    email: registerRequest.email,
                    password: registerRequest.password,
                    role: "STUDENT",
                    student: {
                        create: {
                            nim: registerRequest.nim,
                        }
                    }
                }
            });
            return (0, student_model_1.toStudentResponse)(user);
        });
    }
    ;
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(student_validation_1.StudentValidate.UPDATE, request);
            if (updateRequest.email) {
                updateRequest.email = updateRequest.email;
            }
            ;
            if (updateRequest.password) {
                updateRequest.password = yield bcrypt_1.default.hash(updateRequest.password, 10);
            }
            ;
            const response = yield database_1.prismaClient.user.update({
                where: {
                    id: user.id
                },
                data: {
                    email: updateRequest.email,
                    password: updateRequest.password
                }
            });
            return (0, student_model_1.toStudentResponse)(response);
        });
    }
    ;
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginRequest = validation_1.Validation.validate(student_validation_1.StudentValidate.LOGIN, request);
            let user = yield database_1.prismaClient.user.findFirst({
                where: {
                    student: {
                        nim: loginRequest.nim
                    }
                }
            });
            if (!user) {
                throw new response_error_1.ResponseError(404, "Nim or password is wrong");
            }
            ;
            const isPasswordCorrect = yield bcrypt_1.default.compare(loginRequest.password, user.password);
            if (!isPasswordCorrect) {
                throw new response_error_1.ResponseError(404, "Nim or password is wrong");
            }
            ;
            user = yield database_1.prismaClient.user.update({
                where: {
                    id: user.id
                },
                data: {
                    token: (0, uuid_1.v4)()
                }
            });
            const response = (0, student_model_1.toStudentResponse)(user);
            response.token = user.token;
            console.log(response);
            return response;
        });
    }
    ;
    static logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.prismaClient.user.update({
                where: {
                    id: user.id
                },
                data: {
                    token: null
                }
            });
            return (0, student_model_1.toStudentResponse)(response);
        });
    }
    ;
    static getStudent(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield database_1.prismaClient.student.findUnique({
                where: {
                    userId: Number(id)
                },
                include: {
                    user: true,
                    enrollments: true
                }
            });
            if (!student) {
                throw new response_error_1.ResponseError(404, "Student not found");
            }
            ;
            const response = (0, student_model_1.toStudentResponse)(student);
            return response;
        });
    }
    ;
    static delete(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteRequest = validation_1.Validation.validate(student_validation_1.StudentValidate.DELETE, request);
            const response = yield database_1.prismaClient.user.deleteMany({
                where: {
                    id: deleteRequest.id
                }
            });
            return {
                message: `Student ${response.count} deleted`
            };
        });
    }
    ;
}
exports.StudentService = StudentService;
