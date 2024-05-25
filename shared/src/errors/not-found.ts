import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = 404;
    error = "Not Found";

    serializeError(): { error: string; } {
    return {error: this.error}
  }
    
}