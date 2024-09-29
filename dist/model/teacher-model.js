"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTeacherResponse = toTeacherResponse;
function toTeacherResponse(teacher) {
    return {
        id: teacher.id,
        name: teacher.name,
        nip: teacher.nip,
        course: teacher.course,
        createdAt: teacher.createdAt,
        updatedAt: teacher.updatedAt,
        user: teacher.user,
        token: teacher.token,
    };
}
