import express, {NextFunction, Request, Response} from 'express';

const router = express.Router();


router.post('/api/sneakers', async (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
});

export { router as newSneakerRouter };