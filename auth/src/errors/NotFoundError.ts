import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('ruta no encontrada')

        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors(){
        return [{
            message: 'Ruta no encontrada'
        }]
    }
}