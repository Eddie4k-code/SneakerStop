import express, {NextFunction, Request, Response} from 'express';
import {GenericRequestError, NotFoundError, OrderStatus, RequestValidationError, verifyUser} from '@sneakerstop/shared';
import mongoose from 'mongoose';
import { SneakerModel } from '../models/sneaker';
import {OrderModel} from '../models/order';

const router = express.Router();
//new order! 
router.post('/api/orders', verifyUser, async (req: Request, res:Response, next: NextFunction) => {

    const {sneakerId} = req.body;

    //check that ID is valid.
    const validId = mongoose.Types.ObjectId.isValid(sneakerId);

    if (!validId) {
        next(new RequestValidationError("Invalid ID"));
    }

    /* Find sneaker that is being requested for order */
    const sneaker = await SneakerModel.findById(sneakerId);

    /* Check that the sneaker is valid/exists*/
    if (!sneaker) {
        next(new NotFoundError());
    }

     /* Check if there is an existing order with this sneaker already, that does not have status of cancelled */
     const orderExists = await OrderModel.findOne({
        sneaker: sneaker,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.PendingPayment,
                OrderStatus.Complete
            ]
        }
     }); 


     if (orderExists) {
        next(new GenericRequestError("Sneaker is no longer available at this time."))
     }



    //create order

    const order = await OrderModel.createOrder({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        sneaker: sneaker!
    })

    await order.save();


    //send create order event

    return res.status(201).json(order);
    









    



    
    
});


export {router as newOrderRouter}