import { verifyUser, RequestValidationError } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express';
import { SneakerModel } from '../../models/sneaker';

const router = express.Router();


router.post('/api/sneakers', verifyUser, async (req: Request, res: Response, next: NextFunction) => {
    const {title, price, size} = req.body;

    if (!title || !price || !size)  {
        next(new RequestValidationError("Title, Price and Size must be fulfilled.."));
    }


    const sneaker = SneakerModel.createSneaker({title: title, price: price, size: size, userId: req.currentUser!.id});

    await sneaker.save();


    return res.status(201)
});

export { router as newSneakerRouter };

