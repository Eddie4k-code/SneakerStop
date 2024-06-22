import { verifyUser, RequestValidationError } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express';
import { ISneakerDocument, SneakerModel } from '../../models/sneaker';
import { ISneakerRepository } from '../repository/ISneakerRepository';
import { MongoSneakerRepository } from '../repository/SneakerRepository';

const router = express.Router();


router.get('/api/sneakers', async (req: Request, res:Response, next: NextFunction) => {

    const sneakerRepository: ISneakerRepository<ISneakerDocument> = new MongoSneakerRepository();

    //const sneakers = await SneakerModel.find({});

    const sneakers = await sneakerRepository.allSneakers();

    return res.status(200).json(sneakers);

});




export {router as allSneakersRouter};