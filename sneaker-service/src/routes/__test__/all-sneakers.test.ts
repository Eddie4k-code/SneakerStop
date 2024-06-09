import request from 'supertest';
import { app } from '../..';
import { SneakerModel } from '../../../models/sneaker';

jest.mock('../../events/producers/new-sneaker-producer');

const newSneaker = async (n: number) => {

    return await request(app)
    .post('/api/sneakers')
    .set('Cookie', global.signin())
    .send({
        title: `test${n}`,
        price: 35,
        size: 9
    });

}


it('grab a list of sneakers', async () => {


    await newSneaker(1);
    await newSneaker(2);
    await newSneaker(3);

    const res = await request(app)
    .get('/api/sneakers')
    .send()
    .expect(200);



    

});

