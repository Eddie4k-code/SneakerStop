import request from 'supertest';
import { app } from '../..';
import mongoose from 'mongoose';
import { SneakerModel } from '../../models/sneaker';
import { OrderModel } from '../../models/order';
import { OrderStatus } from '@sneakerstop/shared';



it ('gets all orders for a user', async () => {

    //create sneakers

    const sneakers = [
        {
            title: 'test_sneaker4444',
            price: 25,
            userId: '1122342uifhoeihouwef'
        },
        {
            title: 'test_sneaker9304798533254',
            price: 12,
            userId: '3r9urt32490yur9034'
        },
        {
            title: 'tesT_ssneaker3597043245790832457890',
            price: 50,
            userId: 'tiou43t903490t7'
        }
    ]


    for(var s of sneakers) {

        let sneaker = await SneakerModel.createSneaker({
            title: s.title,
            price: s.price,
            externalId: '49073472589978234978423987324'
        }).save();

        await OrderModel.createOrder({
            sneaker,
            userId: s.userId,
            status: OrderStatus.Created
        }).save();    
    }


    await request(app)
        .get('/api/orders')
        .set('Cookie', global.signin())
        .send()
        .expect(200);


});

