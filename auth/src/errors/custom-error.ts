export abstract class CustomError extends Error {
   //con abstract la subclase debe implementar la propiedad o metodo
   abstract statusCode: number;

   constructor(message: string) {
      super(message);

      //only because we are extending a built in class
      Object.setPrototypeOf(this, CustomError.prototype);
   }

   abstract serializeErrors(): { message: string; field?: string }[]
}
