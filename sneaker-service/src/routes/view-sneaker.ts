import { verifyUser, RequestValidationError, GenericRequestError, NotFoundError } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express';
import { SneakerModel } from '../../models/sneaker';

const router = express.Router();


router.get('/api/sneakers/:id', async (req: Request, res: Response, next: NextFunction) => {


    const foundSneaker = await SneakerModel.findById(req.params.id);

    if (!foundSneaker) {
        next(new NotFoundError());
    }

    return res.status(200).json(foundSneaker);
});

export { router as newSneakerRouter };

