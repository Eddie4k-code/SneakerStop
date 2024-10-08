import { verifyUser } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express'
import { IPaymentService } from '../service/IPaymentService';
import { PaymentService } from '../service/PaymentService';
import { MongoOrderRepository } from '../repository/MongoOrderRepository';
import { MongoSneakerRepository } from '../repository/MongoSneakerRepository';
import { StripePaymentProvider } from '../payment/StripePaymentProvider';

export const createPaymentRouter = express.Router();

const paymentService: IPaymentService<any> = new PaymentService(new MongoOrderRepository(), new MongoSneakerRepository(), new StripePaymentProvider(process.env.STRIPE_SECRET!));

createPaymentRouter.post('/api/payments', verifyUser, async (req: Request, res: Response, next: NextFunction) => {

    try {

       let response =  await paymentService.newPayment({externalId: req.body.externalId, userId: req.currentUser!.id});


       return res.status(201).json(response);

        

    } catch(err) {
        next(err)
    }

});