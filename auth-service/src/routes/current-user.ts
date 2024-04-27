import express, {Request, Response} from 'express'

const router = express.Router();


router.get("/api/users/currentuser", async (res: Response, req: Request) => {
    return res.send("Hello User");
});


export {router as currentUserRouter};