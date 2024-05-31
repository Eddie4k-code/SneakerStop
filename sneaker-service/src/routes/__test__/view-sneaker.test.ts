import request from 'supertest';
import { app } from '../..';
import { SneakerModel } from '../../../models/sneaker';

it('return a 404 if we cannot find a sneaker', async () => {

    await request(app)
    .get('/api/sneakers/shouldnotexist')
    .send()
    .expect(404);
}, 20000);

it('return a sneaker if found', async () => {




    const newSneaker = await SneakerModel.create({title: "Testing123123", price:11, size: 11, userId: '123'});
    await newSneaker.save()

    const getSneaker = await request(app)
        .get(`/api/sneakers/${newSneaker._id}`)
        .send()
        .expect(200);
}, 20000);