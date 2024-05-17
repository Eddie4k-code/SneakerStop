import express, {Request, Response} from 'express'
import mongoose from 'mongoose';

const router = express.Router();


router.get("/api/users/currentuser", async (res: Response, req: Request) => {
    return res.send("Hello User");
});


export {router as currentUserRouter};