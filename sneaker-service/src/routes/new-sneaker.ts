import { verifyUser, RequestValidationError, Topics } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express';
import { ISneakerDocument, SneakerModel } from '../../models/sneaker';
import { kafkaInstance } from '..';
import { Producer } from '../events/producers/new-sneaker-producer';
import { ISneakerRepository } from '../repository/ISneakerRepository';
import { MongoSneakerRepository } from '../repository/SneakerRepository';

const router = express.Router();


router.post('/api/sneakers', verifyUser, async (req: Request, res: Response, next: NextFunction) => {
    const {title, price, size, version} = req.body;

    if (!title || !price || !size)  {
        next(new RequestValidationError("Title, Price and Size must be fulfilled.."));
        return
    }


    const sneakerRepository: ISneakerRepository<ISneakerDocument> = new MongoSneakerRepository();

    const sneaker = await sneakerRepository.newSneaker({title: title, price: price, size: size, version: version, userId: req.currentUser!.id});

    /* used before repository was impelemented */
    
    //const sneaker = SneakerModel.createSneaker({title: title, price: price, size: size, userId: req.currentUser!.id, version: version});

    //await sneaker.save();

  

        const producer = new Producer(Topics.SNEAKER_CREATED, kafkaInstance);

        await producer.send({data: {
            _id: sneaker._id as string,
            title: sneaker.title,
            price: sneaker.price,
            size: sneaker.size,
            version: sneaker.version,
            userId: sneaker.userId
        }});


    return res.status(201).send(sneaker);
});

export { router as newSneakerRouter };

