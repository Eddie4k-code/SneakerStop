import { verifyUser, RequestValidationError, GenericRequestError, NotFoundError, NotAuthorizedError } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express';
import { SneakerModel } from '../../models/sneaker';



const router = express.Router();


router.put('/api/sneakers/:id', verifyUser, async (req: Request, res: Response, next: NextFunction) => {

    const {title, price, size} = req.body;

    const foundSneaker = await SneakerModel.findById(req.params.id);

    if (!foundSneaker) {
        next(new NotFoundError());
        return;
    }


    if (req.currentUser?.id != foundSneaker.userId) {
        next(new NotAuthorizedError("User does not own this sneaker."));
        return;
    }


    foundSneaker.title = title;
    foundSneaker.price = price;
    foundSneaker.size = size;

    foundSneaker.save();


    return res.status(200).json(foundSneaker);








    return res.status(200).json(foundSneaker);
});

export { router as updateSneakerRouter };
