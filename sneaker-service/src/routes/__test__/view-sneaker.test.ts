import request from 'supertest';
import { app } from '../..';
import { SneakerModel } from '../../../models/sneaker';
import mongoose from 'mongoose';

it('return a 404 if we cannot find a sneaker', async () => {

    const fakeId = new mongoose.Types.ObjectId().toHexString();
    
    await request(app)
    .get(`/api/sneakers/${fakeId}`)
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