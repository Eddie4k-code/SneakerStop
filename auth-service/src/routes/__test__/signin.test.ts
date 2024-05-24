import request from 'supertest';
import { app } from '../..';

/* check successful sign in */
it('returns a 200 on successful sign in', async () => {
    return await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@mail.com',
        password: 'password'
      })
      .expect(200);
  });



