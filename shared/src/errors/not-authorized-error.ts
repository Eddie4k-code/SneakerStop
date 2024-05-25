/* Authorization errors that could appear within requests */

import { CustomError } from "./custom-error";


export class NotAuthorizedError extends CustomError {
    statusCode = 404
    error: string;

    constructor(error: string) {
        super();
        this.error = error;
      }


    serializeError(): { error: string; } {
        return {error: this.error}
    }
    
}