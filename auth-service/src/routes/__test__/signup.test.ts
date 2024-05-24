import request from 'supertest';
import { app } from '../..';

/* Send a POST Request to our Sign up route */
it('returns a 201 on successful signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@mail.com',
        password: 'password'
      })
      .expect(201);
  });