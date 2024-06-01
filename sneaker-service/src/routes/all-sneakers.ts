import { verifyUser, RequestValidationError } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express';
import { SneakerModel } from '../../models/sneaker';

const router = express.Router();



router.get('/api/sneakers', async (req: Request, res:Response, next: NextFunction) => {
    const sneakers = await SneakerModel.find({});

    return res.status(200).json(sneakers);

});




export {router as allSneakersRouter};