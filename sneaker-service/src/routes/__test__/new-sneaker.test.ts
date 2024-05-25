import request from 'supertest';
import { app } from '../..';

it('has a route handler listening to /api/sneakers for post requests', async () => {

    const response = await request(app)
        .post('/api/sneakers')
        .send({})

        
    expect(response.status).not.toEqual(404);

});

it('can only be accessed if the user is signed in', async () => {

    const response = await request(app)
        .post("/api/sneakers")
        .send({})

    expect(response.status).toEqual(401);

}, 20000);


it('returns a status other than 401 if the user is signed in', async () => {

    const response = await request(app)
        .post("/api/sneakers")
        .set('Cookie', await global.signin())
        .send({})

    expect(response.status).not.toEqual(401);


}, 20000);



it('returns an error if an invalid title is provided', async () => {

});

it('returns an error if an invalid price is provided', async () => {

});

it('creates a sneaker with valid inputs', async () => {


    const response = await request(app)
        .post("/api/sneakers")
        .set('Cookie', global.signin())
        .send({title: "Test1", price:123, size:9.5})
        .expect(201);




}, 20000);
