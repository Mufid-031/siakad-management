"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEnrollmentResponse = toEnrollmentResponse;
function toEnrollmentResponse(enrollment) {
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
