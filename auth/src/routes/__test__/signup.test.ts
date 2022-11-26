import request from 'supertest';
import { app } from '../../app';

it('regresa 201 registro', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
});

it('regresa 400 con email invalido', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtestcom',
            password: 'password'
        })
        .expect(400);
});

it('regresa 400 con password invalido', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtestcom',
            password: '1'
        })
        .expect(400);
});

it('regresa 400 sin email y password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com'
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password: '123456'
        })
        .expect(400);
});

it('no permite emails duplicados', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it('establece un cookie despues de un signup exitoso', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});

