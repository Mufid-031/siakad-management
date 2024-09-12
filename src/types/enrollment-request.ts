import { Enrollment } from "@prisma/client";
import { Request } from "express";

export interface EnrollmentRequest extends Request {
    enrollment?: Enrollment;
}