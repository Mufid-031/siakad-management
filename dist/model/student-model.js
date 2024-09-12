"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toStudentResponse = toStudentResponse;
function toStudentResponse(student) {
    return {
        id: student.id,
        name: student.name,
        nim: student.nim,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
        user: student.user,
        enrollments: student.enrollments,
        token: student.token,
    };
}
;
