import { verifyUser, RequestValidationError } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express';
import { SneakerModel } from '../../models/sneaker';

const router = express.Router();


router.post('/api/sneakers', verifyUser, async (req: Request, res: Response, next: NextFunction) => {
    const {title, price, size, userId} = req.body;

    if (title || price || size == null)  {
        next(new RequestValidationError("Title, Price and Size must be fulfilled.."));
    }


    const sneaker = SneakerModel.createSneaker({title, price, size, userId});

    await sneaker.save();


    res.sendStatus(201);
});

export { router as newSneakerRouter };

function checkForEmptyField<T>(email: any) {
    throw new Error('Function not implemented.');
}
