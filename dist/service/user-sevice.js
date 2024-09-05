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
exports.UserService = void 0;
const database_1 = require("../app/database");
const response_error_1 = require("../error/response-error");
const user_model_1 = require("../model/user-model");
const user_validation_1 = require("../validation/user-validation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class UserService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = validation_1.Validation.validate(user_validation_1.UserValidate.REGISTER, request);
            const userCount = yield database_1.prismaClient.user.count({
                where: {
                    name: registerRequest.name
                }
            });
            if (userCount != 0) {
                throw new response_error_1.ResponseError(400, "User already exists");
            }
            ;
            registerRequest.password = yield bcrypt_1.default.hash(registerRequest.password, 10);
            const user = yield database_1.prismaClient.user.create({
                data: registerRequest
            });
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    ;
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginRequest = validation_1.Validation.validate(user_validation_1.UserValidate.LOGIN, request);
            let user = yield database_1.prismaClient.user.findFirst({
                where: {
                    nim: loginRequest.nim
                }
            });
            if (!user) {
                throw new response_error_1.ResponseError(400, "User or password is wrong");
            }
            const isPasswordValid = yield bcrypt_1.default.compare(loginRequest.password, user.password);
            if (!isPasswordValid) {
                throw new response_error_1.ResponseError(400, "User or password is wrong");
            }
            user = yield database_1.prismaClient.user.update({
                where: {
                    nim: user.nim
                },
                data: {
                    token: (0, uuid_1.v4)()
                }
            });
            const response = (0, user_model_1.toUserResponse)(user);
            response.token = user.token;
            return response;
        });
    }
    ;
    static get(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(user_validation_1.UserValidate.UPDATE, request);
            if (updateRequest.nim) {
                user.nim = updateRequest.nim;
            }
            ;
            if (updateRequest.password) {
                user.password = yield bcrypt_1.default.hash(updateRequest.password, 10);
            }
            ;
            if (updateRequest.name) {
                user.name = updateRequest.name;
            }
            ;
            if (updateRequest.date) {
                user.date = updateRequest.date;
            }
            ;
            if (updateRequest.gender) {
                user.gender = updateRequest.gender;
            }
            ;
            const response = yield database_1.prismaClient.user.update({
                where: {
                    nim: user.nim
                },
                data: user
            });
            if (!response) {
                throw new response_error_1.ResponseError(401, "Unauthorized");
            }
            return (0, user_model_1.toUserResponse)(response);
        });
    }
}
exports.UserService = UserService;
