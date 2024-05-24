import request from 'supertest';
import { app } from '../..';

/* check successful signup */
it('returns a 201 on successful signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@mail.com',
        password: 'password'
      })
      .expect(201);
  });

/* Check empty fields */
it('returns a 400 ', async () => {

  return request(app)
    .POST('/api/users/signup')
    .send({
      email: "",
      password: ""
    })
});