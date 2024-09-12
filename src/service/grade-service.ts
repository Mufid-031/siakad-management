import { Grade } from "@prisma/client";
import { prismaClient } from "../app/database";
import { GradeRequest, GradeResponse, toGradeResponse } from "../model/grade-model";
import { GradeValidation } from "../validation/grade-validation";
import { Validation } from "../validation/validation";

export class GradeService {

    static async assignGrade(request: GradeRequest): Promise<GradeResponse> {

        const asignGradeRequest = Validation.validate(GradeValidation.ASSIGN, request);

        const response = await prismaClient.grade.create({
            data: {
                enrollmentId: asignGradeRequest.enrollmentId,
                grade: asignGradeRequest.grade
            },
            include: {
                enrollment: {
                    include: {
                        student: true,
                        course: true
                    }
                },
            }
        });

        const studentData = await prismaClient.enrollment.findFirst({
            where: {
                studentId: response.enrollment.studentId
            },
            include: {
                student: true,
                course: true
            }
        });

        response.enrollment.student = studentData?.student!;
        response.enrollment.course = studentData?.course!;
        return toGradeResponse(response);

    };

    static async updateGrade(grade: Grade, request: GradeRequest): Promise<GradeResponse> {

        const updateGradeRequest = Validation.validate(GradeValidation.UPDATE, request);

        const response = await prismaClient.grade.update({
            where: {
                enrollmentId: updateGradeRequest.enrollmentId
            },
            data: {
                enrollmentId: updateGradeRequest.enrollmentId,
                grade: updateGradeRequest.grade
            },
            include: {
                enrollment: {
                    include: {
                        student: true,
                        course: true
                    }
                },
            }
        });

        const studentData = await prismaClient.enrollment.findFirst({
            where: {
                studentId: response.enrollment.studentId
            },
            include: {
                student: true,
                course: true
            }
        });

        response.enrollment.student = studentData?.student!;
        response.enrollment.course = studentData?.course!;
        return toGradeResponse(response);

    };

    static async deleteGrade(grade: Grade, request: GradeRequest): Promise<GradeResponse> {

        const deleteGradeRequest = Validation.validate(GradeValidation.DELETE, request);

        const response = await prismaClient.grade.deleteMany({
            where: {
                enrollmentId: deleteGradeRequest.enrollmentId
            }
        });

        return {
            message: `Grade with enrollment id ${deleteGradeRequest.enrollmentId} has been deleted ${response.count}`
        };

    };

};