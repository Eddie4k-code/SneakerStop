/* Generic errors that could appear within requests */

import { CustomError } from "./custom-error";


export class GenericRequestError extends CustomError {
    statusCode = 400
    error: string;


    /**
     *
     */
    constructor(error: string) {
        super();
        this.error = error;
      }


    serializeError(): { error: string; } {
        throw new Error("Method not implemented.");
    }
    
}