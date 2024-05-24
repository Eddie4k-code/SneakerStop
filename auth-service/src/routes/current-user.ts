import express, {NextFunction, Request, Response} from 'express'
import mongoose from 'mongoose';
import { GenericRequestError } from '../../errors/generic-request-error';
import jwt from 'jsonwebtoken';
const router = express.Router();

/* Check if user has a valid session */
router.get("/api/users/currentuser", async (req: Request, res: Response, next: NextFunction) => {

    if (!req.session || !req.session.jwt) {
        return res.send({currentUser: null});
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET IS MISSING");
    }

    const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET!)

    return res.status(200).json(payload);

});


export {router as currentUserRouter};