import express, {NextFunction, Request, Response} from 'express'
import mongoose from 'mongoose';
import { GenericRequestError } from '../../errors/generic-request-error';
import jwt from 'jsonwebtoken';
import { verifyUser } from '../../middleware/verify-user';
const router = express.Router();


/* Check if user has a valid session */
router.get("/api/users/currentuser", verifyUser, async (req: Request, res: Response, next: NextFunction) => {
    res.json({currentUser: req.currentUser || null});
});


export {router as currentUserRouter};