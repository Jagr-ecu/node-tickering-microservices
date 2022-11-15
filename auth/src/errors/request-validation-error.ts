import { ValidationError } from "express-validator";

import { CustomError } from "./custom-error";

export class ResquestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('Error en validacion de parametros');

        //only because we are extending a built in class
        Object.setPrototypeOf(this, ResquestValidationError.prototype)
    }

    serializeErrors() {
        return this.errors.map((error) => {
            return { message: error.msg, field: error.param };
        });
    }
} 

