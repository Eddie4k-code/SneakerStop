import { verifyUser } from '@sneakerstop/shared';
import express, {NextFunction, Request, Response} from 'express'
import { IPaymentService } from '../service/IPaymentService';
import { PaymentService } from '../service/PaymentService';
import { MongoPaymentRepository } from '../repository/MongoPaymentRepository';

export const createPaymentRouter = express.Router();

const paymentService: IPaymentService<any> = new PaymentService(new MongoPaymentRepository());

createPaymentRouter.post('/api/payments', verifyUser, async (req: Request, res: Response, next: NextFunction) => {

    try {

       let response =  await paymentService.newPayment(req.body.orderId);


       return res.json(response);

        

    } catch(err) {
        next(err)
    }

});