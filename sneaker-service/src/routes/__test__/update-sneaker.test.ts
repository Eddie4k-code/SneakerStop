import request from 'supertest';
import { app } from '../..';
import { SneakerModel } from '../../../models/sneaker';
import mongoose from 'mongoose';



it('if sneaker not found return a 404', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    const res = await request(app)
        .put(`/api/sneakers/${id}`)
        .send({
            title: 'testtttttt',
            price: 20
        })
        .expect(404);


});



it('if user is not logged in return 401', async () => {


    const id = new mongoose.Types.ObjectId().toHexString();

    const res = await request(app)
        .put(`/api/sneakers/${id}`)
        .send({
            title: 'testtttttt',
            price: 20
        })
        .expect(401);

}, 20000);



it('if user did not post sneaker, return a 401', async () => {

    const res = await request(app)
        .post('/api/sneakers')
        .set('Cookie', global.signin())
        .send({
            title: '12345656',
            price: 55,
            size: 10
        });

    await request(app)
        .put(`/api/sneakers/${res.body._id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'test_title',
            price: 32,
            size: 8
        })
        .expect(401);


}, 20000);



it('return a 200 if a user can update properties on a sneaker', async () => {

    const cookie = global.signin();

    const res = await request(app)
        .post('/api/sneakers/')
        .set('Cookie', cookie)
        .send({
            title: '123455677888',
            price: 5,
            size: 20
        });


    await request(app)
        .put(`/api/sneakers/${res.body._id}`)
        .set('Cookie', cookie)
        .send({
            title: 'newtitle',
            price: 5,
            size: 20
        })
        .expect(200);
    
});