import { Enrollment } from "@prisma/client";
import { prismaClient } from "../app/database";
import { EnrollmentRequest, EnrollmentResponse, toEnrollmentResponse } from "../model/enrollment-model";
import { EnrollmentValidate } from "../validation/enrollment-validation";
import { Validation } from "../validation/validation";

export class EnrollmentService {

    static async create(request: EnrollmentRequest): Promise<EnrollmentResponse> {

        const createRequest = Validation.validate(EnrollmentValidate.CREATE, request);

        const response = await prismaClient.enrollment.create({
            data: {
                studentId: createRequest.studentId,
                courseId: createRequest.courseId
            }
        });

        return toEnrollmentResponse(response);
    };

    static async delete(enrollment: Enrollment, request: EnrollmentRequest): Promise<EnrollmentResponse> {

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

};