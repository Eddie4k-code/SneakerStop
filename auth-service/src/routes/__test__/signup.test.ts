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


/* cookie check */
it('sets cookie after signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@mail.com',
      password: 'password'
    })
    .expect(201);

  return expect(response.get('Set-Cookie')).toBeDefined();

  
});


it('returns a 400 ', async () => {
  /* All empty fields */
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "",
      password: ""
    })
    .expect(400);


  /* 1 empty field */
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "test@123.com",
      password: ""
    })
    .expect(400);
});

it('does not allow creating account with email that is already associated with an account, returns 400', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@here.com",
      password: "password"
    })
    .expect(201);

    /* attempt to create account with same email as above*/
    return await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@here.com",
      password: "password"
    })
    .expect(400);

});


