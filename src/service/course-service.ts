import { Course, Semester } from "@prisma/client";
import { prismaClient } from "../app/database";
import { CourseRequest, CourseResponse, CourseUpdate, toCourseResponse } from "../model/course-model";
import { Validation } from "../validation/validation";
import { CourseValidate } from "../validation/course-validation";

export class CourseService {

    static async getCourses(request: CourseRequest): Promise<CourseResponse[]> {

        const response = await prismaClient.course.findMany({
            include: {
                teacher: {
                    include: {
                        user: true
                    }
                },
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
                teacherId: createRequest.teacherId!,
                semester: createRequest.semester!,
                sks: createRequest.sks!,
            }
        })

        return toCourseResponse(course);

    };

    static async updateCourse(course: Course, request: CourseUpdate): Promise<CourseResponse> {

        const updateRequest = Validation.validate(CourseValidate.UPDATE, request);

        let updatedRequest: CourseUpdate = {};

        if (updateRequest.name) {
            updatedRequest = {
                ...updatedRequest,
                name: updateRequest.name
            };
        };

        if (updateRequest.code) {
            updatedRequest = {
                ...updatedRequest,
                code: updateRequest.code
            };
        };

        if (updateRequest.teacherId) {
            updatedRequest = {
                ...updatedRequest,
                teacherId: updateRequest.teacherId
            };
        };

        if (updateRequest.semester) {
            updatedRequest = {
                ...updatedRequest,
                semester: updateRequest.semester
            }
        }

        if (updateRequest.sks) {
            updatedRequest = {
                ...updatedRequest,
                sks: updateRequest.sks
            }
        }

        const response = await prismaClient.course.update({
            where: {
                id: updateRequest.id
            },
            data: updatedRequest
        });

        return toCourseResponse(response);

    };

    static async deleteCourse(course: Course, request: CourseRequest): Promise<CourseResponse> {

        const deleteRequest = Validation.validate(CourseValidate.DELETE, request);

        const response = await prismaClient.course.deleteMany({
            where: {
                id: deleteRequest.id
            }
        });

        return {
            message: `Course ${response.count} deleted`
        };

    };

    static async getCourse(course: Course, request: CourseRequest): Promise<CourseResponse> {

        const getCourseRequest = Validation.validate(CourseValidate.DELETE, request);

        const response = await prismaClient.course.findUnique({
            where: {
                id: getCourseRequest.id
            }
        });

        return toCourseResponse(response!);

    };

};