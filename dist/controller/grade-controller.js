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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeController = void 0;
const grade_service_1 = require("../service/grade-service");
class GradeController {
    static assignGrade(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield grade_service_1.GradeService.assignGrade(request);
                res.status(200).json({
                    status: 200,
                    massage: "success asign grade",
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static updateGrade(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.enrollmentId = Number(request.enrollmentId);
                request.grade = Number(request.grade);
                const response = yield grade_service_1.GradeService.updateGrade(req.grade, request);
                res.status(200).json({
                    status: 200,
                    massage: "success update grade",
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static deleteGrade(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.params;
                request.enrollmentId = Number(request.enrollmentId);
                const response = yield grade_service_1.GradeService.deleteGrade(req.grade, request);
                res.status(200).json({
                    status: 200,
                    massage: "success delete grade",
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
}
exports.GradeController = GradeController;
;
