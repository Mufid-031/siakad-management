export type EnrollmentRequest = {
    id?: number;
    studentId: number;
    courseId: number;
};

export type EnrollmentResponse = {
    id?: number;
    studentId?: number;
    courseId?: number;
    createdAt?: Date;
    updateAt?: Date;
    message?: string;
};

export function toEnrollmentResponse(enrollment: EnrollmentResponse): EnrollmentResponse {
    return {
        id: enrollment.id,
        studentId: enrollment.studentId,
        courseId: enrollment.courseId,
        createdAt: enrollment.createdAt,
        updateAt: enrollment.updateAt,
    };
}
