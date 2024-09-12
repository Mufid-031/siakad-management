import { Course, Student } from "@prisma/client";

export type GradeRequest = {
    enrollmentId: number;
    grade: number;
};

export type GradeResponse = {
    id?: number;
    enrollmentId?: number;
    grade?: number;
    enrollment?: {
        student?: Student;
        course?: Course;
    };
    createdAt?: Date;
    updateAt?: Date;
    message?: string;
};

export function toGradeResponse(grade: GradeResponse): GradeResponse {
    return {
        id: grade.id,
        enrollmentId: grade.enrollmentId,
        grade: grade.grade,
        enrollment: grade.enrollment,
        createdAt: grade.createdAt,
        updateAt: grade.updateAt,
        message: grade.message
    };
};
