import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";

import { ResquestValidationError } from "../errors/request-validation-error";

//this is a normal middleware
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    //valida si hay errores segun validacion de body de arreglo anterior (email, password)
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        throw new ResquestValidationError(errors.array());
    }

    next();
};
