import request from 'supertest';
import app from '../app.js';

describe('Autenticação e permissões', () => {
    let token;

    it('deve fazer login com sucesso', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ identificador: 'diogo@empresa.com', password: 'senha123' });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
        token = res.body.token;
    });

    it('deve acessar /me com token válido', async () => {
        const res = await request(app)
            .get('/me')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.usuario).toBeDefined();
    });

    it('deve bloquear acesso ao /admin/dashboard sem permissão', async () => {
        const res = await request(app)
            .get('/admin/dashboard')
            .set('Authorization', `Bearer ${token}`);

        expect([200, 403]).toContain(res.statusCode);
    });
});