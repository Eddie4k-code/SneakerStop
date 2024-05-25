
/* 
    CustomError allows us to follow Open/Closed Principle when handling errors in our middleware 
    All Errors we create will extend this class
*/
export abstract class CustomError extends Error {

    abstract statusCode: number
    abstract error: string

    constructor() {
        super();
    }

    abstract serializeError(): {
        error: string
    }
}