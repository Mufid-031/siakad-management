import { Enrollment, Teacher } from "@prisma/client";

export type CourseRequest = {
    id?: number;
    name?: string;
    code?: string;
    teacherId?: number;
    semester?: "semester_1" | "semester_2" | "semester_3" | "semester_4" | "semester_5" | "semester_6" | "semester_7" | "semester_8";
    sks?: number;
};

export type CourseResponse = {
    id?: number;
    name?: string;
    code?: string;
    enrollments?: Enrollment[];
    teacher?: Teacher;
    semester?: "semester_1" | "semester_2" | "semester_3" | "semester_4" | "semester_5" | "semester_6" | "semester_7" | "semester_8";
    sks?: number;
    createdAt?: Date;
    updatedAt?: Date;
    message?: string
};

export type CourseCreate = {
    id?: number;
    name?: string;
    code?: string;
    teacherId?: number;
    semester?: "semester_1" | "semester_2" | "semester_3" | "semester_4" | "semester_5" | "semester_6" | "semester_7" | "semester_8";
    sks?: number;
};

export type CourseUpdate = {
    id?: number;
    name?: string;
    code?: string;
    teacherId?: number;
    semester?: "semester_1" | "semester_2" | "semester_3" | "semester_4" | "semester_5" | "semester_6" | "semester_7" | "semester_8";
    sks?: number;
};

export function toCourseResponse(course: CourseResponse): CourseResponse {
    return {
        id: course.id,
        name: course.name,
        code: course.code,
        teacher: course.teacher,
        semester: course.semester,
        sks: course.sks,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
        enrollments: course.enrollments,
        message: course.message
    }
};