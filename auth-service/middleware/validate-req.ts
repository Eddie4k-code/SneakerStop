import {Request, Response, NextFunction} from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { checkForEmptyField } from '../src/utils';


/* Middlware that validates a requests email and password fields */

export const validateReq = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

     /* Validate fields contained within request body */
    if (!checkForEmptyField<string>(email) || !checkForEmptyField<string>(password)) {
        next(new RequestValidationError("Email and Password must be fulfilled."));
        return
    }

    next();
}