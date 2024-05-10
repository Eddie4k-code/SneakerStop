import express, {Request, Response} from 'express'

const router = express.Router();

/* User Sign In */
router.get("/api/users/signin", async (res: Response, req: Request) => {
    return res.send("Hello User");
});


export {router as signInRouter};