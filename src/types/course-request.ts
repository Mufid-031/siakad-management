import { Course } from "@prisma/client";
import { Request } from "express";

export interface CourseRequest extends Request {
    course?: Course;
};