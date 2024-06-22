import { verifyUser, RequestValidationError, GenericRequestError, NotFoundError } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express';
import { ISneakerDocument, SneakerModel } from '../../models/sneaker';
import { MongoSneakerRepository } from '../repository/SneakerRepository';
import { ISneakerRepository } from '../repository/ISneakerRepository';

const router = express.Router();


router.get('/api/sneakers/:id', async (req: Request, res: Response, next: NextFunction) => {


    //const foundSneaker = await SneakerModel.findById(req.params.id);

    const sneakerRepository: ISneakerRepository<ISneakerDocument> = new MongoSneakerRepository();

    const foundSneaker = await sneakerRepository.viewSneaker(req.params.id);

    if (!foundSneaker) {
        next(new NotFoundError());
        return
    }

    return res.status(200).json(foundSneaker);
});

export { router as viewSneakerRouter };

