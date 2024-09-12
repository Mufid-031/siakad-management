import { Enrollment } from "@prisma/client";
import { prismaClient } from "../app/database";
import { EnrollmentRequest, EnrollmentResponse, toEnrollmentResponse } from "../model/enrollment-model";
import { EnrollmentValidate } from "../validation/enrollment-validation";
import { Validation } from "../validation/validation";

export class EnrollmentService {

    static async createEnrollment(request: EnrollmentRequest): Promise<EnrollmentResponse> {

        const createRequest = Validation.validate(EnrollmentValidate.CREATE, request);

        const response = await prismaClient.enrollment.create({
            data: {
                studentId: createRequest.studentId,
                courseId: createRequest.courseId
            },
            include: {
                student: true,
                course: true
            }
        });

        return toEnrollmentResponse(response);
    };

    static async deleteEnrollment(enrollment: Enrollment, request: EnrollmentRequest): Promise<EnrollmentResponse> {

        const deleteRequest = Validation.validate(EnrollmentValidate.DELETE, request);

        const response = await prismaClient.enrollment.deleteMany({
            where: {
                id: deleteRequest.id
            }
        });

        return {
            message: `Enrollment ${response.count} deleted`
        };
    };

    static async getAllEnrollmentsStudent(enrollment: Enrollment, request: EnrollmentRequest): Promise<EnrollmentResponse[]> {

        const getAllEnrollmentsStudentRequest = Validation.validate(EnrollmentValidate.GET_ALL_ENROLLMENTS_STUDENT, request);

        const response = await prismaClient.enrollment.findMany({
            where: {
                studentId: getAllEnrollmentsStudentRequest.studentId,
            },
            include: {
                student: true,
                course: true,
                grade: true,
            },
        });

        return response.map(enrollment => toEnrollmentResponse(enrollment));

    };

};