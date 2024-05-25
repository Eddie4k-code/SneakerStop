import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from '../errors/not-authorized-error';

/* What a user payload will contain */
export interface IUserPayload {
    id: string;
    email: string;
}

/* make Request via express to use our user payload interface */
declare global {
    namespace Express {
        interface Request {
            currentUser?: IUserPayload | null;
        }
    }
}



/* Validate JWT contained in sesssion for authorized requests */
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.session || !req.session.jwt) {
        next(new NotAuthorizedError("Not Authorized."));
        return
    }
  
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET IS MISSING");
    }

    try {

        const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET!) as IUserPayload;
        req.currentUser = payload;

    } catch(err) {
        next(new NotAuthorizedError("Not Authorized."));
    }


    next();
  
    

    
  
    

  
  };


  