import { verifyUser, RequestValidationError, GenericRequestError, NotFoundError } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express';
import { ISneakerDocument, SneakerModel } from '../../models/sneaker';
import { MongoSneakerRepository } from '../repository/SneakerRepository';
import { ISneakerRepository } from '../repository/ISneakerRepository';
import { ISneakerService } from '../service/ISneakerService';
import { SneakerService } from '../service/SneakerService';

const router = express.Router();


//inject sneaker repository into service
const sneakerService: ISneakerService<ISneakerDocument> = new SneakerService(new MongoSneakerRepository());


router.get('/api/sneakers/:id', async (req: Request, res: Response, next: NextFunction) => {


    try {
        const foundSneaker = await sneakerService.viewSneaker(req.params.id);

        return res.status(200).json(foundSneaker);
    } catch(err) {
        next(err);
    }
});

export { router as viewSneakerRouter };

