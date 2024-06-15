import request from 'supertest';
import { app } from '../..';
import mongoose from 'mongoose';


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

});


it('successfully creates order for a sneaker', async () => {

});