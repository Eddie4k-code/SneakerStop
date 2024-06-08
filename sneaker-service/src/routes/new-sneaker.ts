import { verifyUser, RequestValidationError, Topics } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express';
import { SneakerModel } from '../../models/sneaker';
import { Producer } from '../event-test';

const router = express.Router();


router.post('/api/sneakers', verifyUser, async (req: Request, res: Response, next: NextFunction) => {
    const {title, price, size} = req.body;

    if (!title || !price || !size)  {
        next(new RequestValidationError("Title, Price and Size must be fulfilled.."));
        return
    }


    const sneaker = SneakerModel.createSneaker({title: title, price: price, size: size, userId: req.currentUser!.id});

    await sneaker.save();

    //send event
    if (process.env.ENVIRONMENT != "dev") {
        await new Producer(Topics.SNEAKER_CREATED).send({data: "test"});
    }

    return res.status(201).send(sneaker);
});

export { router as newSneakerRouter };

