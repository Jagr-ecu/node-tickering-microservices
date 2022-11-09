import { CustomError } from "./CustomError";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error de conexión a la base de datos'

    constructor() {
        super('Error conectando a la bd');

        //only because we are extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors() {
        return [
            {
                message: this.reason
            }
        ]
    }
}