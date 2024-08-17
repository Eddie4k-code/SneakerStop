import request from 'supertest';
import { app } from '../..';
import mongoose from 'mongoose';

it('returns a 404 when purchasing an order that does not exist', async () => {

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            token: 'asldkff8e',
            externalId: new mongoose.Types.ObjectId().toHexString()
        })
        .expect(404);


});


it('returns 401 when a order dosent belong to a useer', async () => {

});