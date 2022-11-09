import { ValidationError } from "express-validator";

export class ResquestValidationError extends Error {
    constructor(public errors: ValidationError[]) {
        super();

        //only because we are extending a built in class
        Object.setPrototypeOf(this, ResquestValidationError.prototype)
    }
} 

