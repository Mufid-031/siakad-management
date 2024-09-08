import { Course } from "@prisma/client";
import { prismaClient } from "../app/database";
import { CourseRequest, CourseResponse, CourseUpdate, toCourseResponse } from "../model/course-model";
import { Validation } from "../validation/validation";
import { CourseValidate } from "../validation/course-validation";

export class CourseService {

    static async getCourses(request: CourseRequest): Promise<CourseResponse[]> {

        const response = await prismaClient.course.findMany({
            include: {
                teacher: true,
                enrollments: true
            }
        });

        return response.map(course => toCourseResponse(course));

    };

    static async createCourse(request: CourseRequest): Promise<CourseResponse> {

        const createRequest = Validation.validate(CourseValidate.CREATE, request);

        const course = await prismaClient.course.create({
            data: {
                name: createRequest.name!,
                code: createRequest.code!,
                teacherId: createRequest.teacherId!
            }
        });

        return toCourseResponse(course);

    };

    static async updateCourse(course: Course, request: CourseUpdate): Promise<CourseResponse> {

        const updateRequest = Validation.validate(CourseValidate.UPDATE, request);

        if (updateRequest.name) {
            course.name = updateRequest.name!;
        };

        if (updateRequest.code) {
            course.code = updateRequest.code!;
        };

        if (updateRequest.teacherId) {
            course.teacherId = updateRequest.teacherId!;
        };

        const response = await prismaClient.course.update({
            where: {
                id: course.id
            },
            data: updateRequest
        });

        return toCourseResponse(response);

    };

    static async deleteCourse(course: Course, request: CourseRequest): Promise<CourseResponse> {

        const deleteRequest = Validation.validate(CourseValidate.DELETE, request.id);

        const response = await prismaClient.course.deleteMany({
            where: {
                id: deleteRequest
            }
        });

        return {
            message: `Course ${response.count} deleted`
        };

    };

    static async getCourse(course: Course, request: CourseRequest): Promise<CourseResponse> {

        const getCourseRequest = Validation.validate(CourseValidate.DELETE, request.id);

        const response = await prismaClient.course.findUnique({
            where: {
                id: getCourseRequest
            }
        });

        return toCourseResponse(response!);

    };

};