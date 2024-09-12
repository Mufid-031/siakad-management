"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCourseResponse = toCourseResponse;
function toCourseResponse(course) {
    return {
        id: course.id,
        name: course.name,
        code: course.code,
        teacher: course.teacher,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
        enrollments: course.enrollments,
        message: course.message
    };
}