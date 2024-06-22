import request from 'supertest';
import { app } from '../..';
import mongoose from 'mongoose';
import { SneakerModel } from '../../models/sneaker';
import { OrderModel } from '../../models/order';
import { OrderStatus } from '@sneakerstop/shared';


it('returns not found if the sneaker does not exist', async () => {

    const sneakerId = new mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({
            sneakerId: sneakerId
        })
        .expect(404);
});


it('returns an error if a sneaker is in the process of already being ordered', async () => {


    const sneaker = SneakerModel.createSneaker({
        title: 'test_sneaker12',
        price: 30
    });

    await sneaker.save();


    const order = OrderModel.createOrder({
        sneaker,
        userId: 'lasiohwefhioew',
        status: OrderStatus.Created
    });

    await order.save();


    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({
            sneakerId: sneaker._id
        })
        .expect(400);




});


it('successfully creates order for a sneaker', async () => {

    const sneaker = SneakerModel.createSneaker({
        title: 'test_sneaker1233',
        price: 30
    });

    await sneaker.save();

    const order = OrderModel.createOrder({
        sneaker,
        userId: 'lasiohwefhioew',
        status: OrderStatus.Created
    });

    await order.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({
            sneakerId: sneaker._id
        })
        .expect(201);






});