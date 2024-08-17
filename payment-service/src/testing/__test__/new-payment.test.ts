import request from 'supertest';
import { app } from '../..';
import mongoose from 'mongoose';
import { OrderModel } from '../../models/order';
import { OrderStatus } from '@sneakerstop/shared';

jest.mock('../../payment/StripePaymentProvider.ts')

it('returns a 404 when purchasing an order that does not exist', async () => {

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            externalId: new mongoose.Types.ObjectId().toHexString()
        })
        .expect(404);


});


it('returns 401 when a order dosent belong to a user', async () => {
    const order = OrderModel.createOrder({ 
        externalId: new mongoose.Types.ObjectId().toHexString(),
        userId: new mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        price: 150
    });


    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            externalId: order._id
        })
        .expect(401);



});






