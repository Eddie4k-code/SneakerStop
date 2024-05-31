import request from 'supertest';
import { app } from '../..';

it('return a 404 if we cannot find a sneaker', async () => {

    await request(app)
    .get('/api/sneakers/shouldnotexist')
    .send()
    .expect(404);
});

it('return a sneaker if found', async () => {

});