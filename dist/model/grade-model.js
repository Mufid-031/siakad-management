"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toGradeResponse = toGradeResponse;
function toGradeResponse(grade) {
    return {
        id: grade.id,
        enrollmentId: grade.enrollmentId,
        grade: grade.grade,
        enrollment: grade.enrollment,
        createdAt: grade.createdAt,
        updateAt: grade.updateAt,
        message: grade.message
    };
}
;
