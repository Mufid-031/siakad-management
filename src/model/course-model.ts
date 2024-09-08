import { Enrollment, Teacher } from "@prisma/client";

export type CourseRequest = {
    id?: number;
    name?: string;
    code?: string;
    teacherId?: number;
};

export type CourseResponse = {
    id?: number;
    name?: string;
    code?: string;
    enrollments?: Enrollment[];
    teacher?: Teacher;
    createdAt?: Date;
    updatedAt?: Date;
    message?: string
};

export type CourseCreate = {
    id?: number;
    name?: string;
    code?: string;
    teacherId?: number;
};

export type CourseUpdate = {
    id?: number;
    name?: string;
    code?: string;
    teacherId?: number;
};

export function toCourseResponse(course: CourseResponse): CourseResponse {
    return {
        id: course.id,
        name: course.name,
        code: course.code,
        teacher: course.teacher,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
        enrollments: course.enrollments,
        message: course.message
    }
}