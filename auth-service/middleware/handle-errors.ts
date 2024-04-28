import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseError } from "../errors/database-error";
import { CustomError } from "../errors/custom-error";

export const errorHandler = async (err: Error, req: Request, res: Response) => {


    if (err instanceof CustomError) {
        return res.status(err.statusCode).json(err.serializeError());
    }


    /* Generic error */
    return res.status(400).json({error: "Something went wild."});

}