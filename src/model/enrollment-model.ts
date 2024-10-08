import { Course, Student } from "@prisma/client";

export type EnrollmentRequest = {
    id?: number;
    studentId: number;
    courseId: number;
};

export type EnrollmentResponse = {
    id?: number;
    studentId?: number;
    courseId?: number;
    student?: Student;
    course?: Course;
    createdAt?: Date;
    updateAt?: Date;
    message?: string;
};

export function toEnrollmentResponse(enrollment: EnrollmentResponse): EnrollmentResponse {
    return {
        id: enrollment.id,
        studentId: enrollment.studentId,
        courseId: enrollment.courseId,
        student: enrollment.student,
        course: enrollment.course,
        createdAt: enrollment.createdAt,
        updateAt: enrollment.updateAt,
    };
}
