import { verifyUser, RequestValidationError } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express';
import { ISneakerDocument, SneakerModel } from '../../models/sneaker';
import { ISneakerRepository } from '../repository/ISneakerRepository';
import { MongoSneakerRepository } from '../repository/SneakerRepository';
import { SneakerService } from '../service/SneakerService';
import { ISneakerService } from '../service/ISneakerService';

const router = express.Router();


//inject sneaker repository into service
const sneakerService: ISneakerService<ISneakerDocument> = new SneakerService(new MongoSneakerRepository());



router.get('/api/sneakers', async (req: Request, res:Response, next: NextFunction) => {


    try {

        const sneakers = await sneakerService.allSneakers();

        return res.status(200).json(sneakers);

    } catch(err) {
        
        next(err)
    }


});




export {router as allSneakersRouter};