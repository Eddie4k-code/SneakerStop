import express, {NextFunction, Request, Response} from 'express';
import {GenericRequestError, NotFoundError, OrderStatus, RequestValidationError, Topics, verifyUser} from '@sneakerstop/shared';
import mongoose from 'mongoose';
import { SneakerModel } from '../models/sneaker';
import {OrderModel} from '../models/order';
import { OrderCreatedProducer } from '../events/producers/order-created-producer';
import { kafkaInstance } from '..';

const router = express.Router();
//new order! 
router.post('/api/orders', verifyUser, async (req: Request, res:Response, next: NextFunction) => {

    const {sneakerId} = req.body;

    const producer = new OrderCreatedProducer(Topics.ORDER_CREATED, kafkaInstance);

    //check that ID is valid.
    const validId = mongoose.Types.ObjectId.isValid(sneakerId);

    if (!validId) {
        next(new RequestValidationError("Invalid ID"));
        return;
    }

    /* Find sneaker that is being requested for order */
    const sneaker = await SneakerModel.findById(sneakerId);

    /* Check that the sneaker is valid/exists*/
    if (!sneaker) {
        next(new NotFoundError());
        return;
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
        return;
     }



    //create order


    const order = OrderModel.createOrder({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        sneaker: sneaker!
    })

    await order.save();


    //send create order event
    await producer.send({data:{
        _id: order._id as string,
        status: order.status,
        userId: order.userId,
        sneaker: {
            _id: order.sneaker._id as string,
            price: order.sneaker.price
        }
    }});

    

    return res.status(201).json(order);
    









    



    
    
});


export {router as newOrderRouter}