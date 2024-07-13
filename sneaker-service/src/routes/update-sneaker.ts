import { verifyUser, RequestValidationError, GenericRequestError, NotFoundError, NotAuthorizedError } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express';
import { ISneakerDocument, SneakerModel } from '../../models/sneaker';
import { ISneakerRepository } from '../repository/ISneakerRepository';
import { MongoSneakerRepository } from '../repository/SneakerRepository';
import { ISneakerService } from '../service/ISneakerService';
import { SneakerService } from '../service/SneakerService';



const router = express.Router();


//inject sneaker repository into service through constructor
const sneakerService: ISneakerService<ISneakerDocument> = new SneakerService(new MongoSneakerRepository());


router.put('/api/sneakers/:id', verifyUser, async (req: Request, res: Response, next: NextFunction) => {

    try {

        const {title, price, size} = req.body;

        const updatedSneaker = await sneakerService.updateSneaker(req.params.id, req.currentUser!.id, {title, price, size});

        return res.status(200).json(updatedSneaker);

    } catch(err) {

        next(err);

    }
});

export { router as updateSneakerRouter };
