import { CustomError } from "./custom-error";

/* Errors related to database */

export class DatabaseError extends CustomError {

    error: string = 'Error Connecting to the Databse';
    statusCode = 500

    
    serializeError(): { error: string; } {
        return {error: this.error}
    }

}