import { NextFunction, Request, Response } from "express";
import { DatabaseConnectionError } from "../errors/DatabaseConnectionError";
import { ResquestValidationError } from "../errors/RequestValidationError";

export const errorHandler = (
   err: Error,
   req: Request,
   res: Response,
   next: NextFunction
) => {
    if (err instanceof ResquestValidationError) {
        const formattedErrors = err.errors.map(error => {
            return { message: error.msg, field: error.param }
        });
        return res.status(400).send({ errors: formattedErrors })
    }

    if (err instanceof DatabaseConnectionError) {
        console.log('error como db connection error');
    }

    res.status(400).send({
        message: err.message
    })
};
