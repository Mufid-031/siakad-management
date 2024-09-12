import { Grade } from "@prisma/client";
import { Request } from "express";

export interface GradeRequest extends Request {
    grade?: Grade;
};