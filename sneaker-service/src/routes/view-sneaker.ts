import { verifyUser, RequestValidationError, GenericRequestError } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express';
import { SneakerModel } from '../../models/sneaker';

const router = express.Router();


router.get('/api/sneakers/:id', async (req: Request, res: Response, next: NextFunction) => {

    const {id} = req.params;

    const foundSneaker = await SneakerModel.findById(id);

    if (!foundSneaker) {
        next(new GenericRequestError("Sneaker not found."));
    }

    return res.status(201).json(foundSneaker);
});

export { router as newSneakerRouter };

