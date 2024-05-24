import express, {Request, Response} from 'express'

const router = express.Router();


router.get("/api/users/signout", async (res: Response, req: Request) => {

    req.session = null;

    return res.json({});

});


export {router as signOutRouter};