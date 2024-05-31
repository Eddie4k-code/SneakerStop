import request from 'supertest';
import { app } from '../..';
import { SneakerModel } from '../../../models/sneaker';

it('return a 404 if we cannot find a sneaker', async () => {

    await request(app)
    .get('/api/sneakers/shouldnotexist')
    .send()
    .expect(404);
});

it('return a sneaker if found', async () => {


    const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: "Testing 123 123",
        size: 11,
        price: 23 
    }).expect(201);


    const getSneaker = await request(app)
        .get(`/api/sneakers/${res.body.id}`)
        .send()
        .expect(200);
});