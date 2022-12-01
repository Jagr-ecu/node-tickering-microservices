import request from 'supertest';
import { app } from '../../app';

it('respuesta con detalles sobre el usuario actual', async () => {
    const cookie = await global.signin();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
    
});

it('respuesta es null si no es autenticado', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);
    
    expect(response.body.currentUser).toEqual(null);
})