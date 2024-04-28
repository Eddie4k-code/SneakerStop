import { CustomError } from "./custom-error";
/* Errors that relate to Validations */

export class RequestValidationError extends CustomError {
  statusCode = 400;
  error: string;

  constructor(error: string) {
    super();
    this.error = error;
  }



  serializeError(): { error: string; } {
    return {error: this.error}
  }

  


    

}