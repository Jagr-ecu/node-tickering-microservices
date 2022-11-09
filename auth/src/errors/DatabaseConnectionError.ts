
export class DatabaseConnectionError extends Error {
    reason = 'Error conectando a la base de datos'

    constructor() {
        super();

        //only because we are extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }
}