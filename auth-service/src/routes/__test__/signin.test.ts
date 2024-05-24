import request from 'supertest';
import { app } from '../..';

/* check successful sign in */
it('returns a 200 on successful sign in', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@mail.com',
        password: 'password'
      })
      .expect(200);
  });



