import { verifyUser, RequestValidationError, Topics, CustomError } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express';
import { ISneakerDocument, SneakerModel } from '../../models/sneaker';
import { kafkaInstance } from '..';
import { Producer } from '../events/producers/new-sneaker-producer';
import { ISneakerRepository } from '../repository/ISneakerRepository';
import { MongoSneakerRepository } from '../repository/SneakerRepository';
import { ISneakerService } from '../service/ISneakerService';
import { SneakerService } from '../service/SneakerService';

const router = express.Router();


//inject sneaker repository into service
const sneakerService: ISneakerService<ISneakerDocument> = new SneakerService(new MongoSneakerRepository());


router.post('/api/sneakers', verifyUser, async (req: Request, res: Response, next: NextFunction) => {

    try {

        const {title, price, size, version} = req.body;

        const sneaker = await sneakerService.newSneaker({title, price, size, version, userId: req.currentUser!.id});
    
        return res.status(201).send(sneaker);

    } catch(err: any) {

        next(err)

    }
    
});

export { router as newSneakerRouter };

