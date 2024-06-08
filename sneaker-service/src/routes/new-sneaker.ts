import { verifyUser, RequestValidationError, Topics } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express';
import { SneakerModel } from '../../models/sneaker';
import { kafkaInstance } from '..';
import { Producer } from '../events/producers/new-sneaker-producer';

const router = express.Router();


router.post('/api/sneakers', verifyUser, async (req: Request, res: Response, next: NextFunction) => {
    const {title, price, size, version} = req.body;

    if (!title || !price || !size)  {
        next(new RequestValidationError("Title, Price and Size must be fulfilled.."));
        return
    }


    const sneaker = SneakerModel.createSneaker({title: title, price: price, size: size, userId: req.currentUser!.id, version: version});

    await sneaker.save();

    //send event
    if (process.env.ENVIRONMENT != "ci") {
        await new Producer(Topics.SNEAKER_CREATED, kafkaInstance).send({data: {
            _id: sneaker._id as string,
            title: sneaker.title,
            price: sneaker.price,
            size: sneaker.size,
            version: sneaker.version,
            userId: sneaker.userId
        }});
    }

    return res.status(201).send(sneaker);
});

export { router as newSneakerRouter };

