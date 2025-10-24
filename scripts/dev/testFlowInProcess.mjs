import createApp from '../../app.js';
import request from 'supertest';

(async () => {
  const app = await createApp();
  const agent = request(app);

  try {
    console.log('1) Login with seed');
    let res = await agent.post('/api/login').send({ username: 'testuser', password: 'Test@123' });
    console.log('login status', res.status, 'body', res.body);
    if (res.status !== 200) throw new Error('Login failed');
    const token = res.body.token;

    console.log('2) GET /me');
    res = await agent.get('/api/me').set('Authorization', `Bearer ${token}`);
    console.log('/me status', res.status, 'body', res.body);

    console.log('3) forgot-password');
    res = await agent.post('/api/forgot-password').send({ email: 'test@example.com' });
    console.log('forgot-password status', res.status, 'body', res.body);
    const resetToken = res.body.token;

    console.log('4) reset-password');
    res = await agent.post('/api/reset-password').send({ token: resetToken, password: 'NewPass@123' });
    console.log('reset-password status', res.status, 'body', res.body);

    console.log('5) login with new password');
    res = await agent.post('/api/login').send({ username: 'testuser', password: 'NewPass@123' });
    console.log('login new status', res.status, 'body', res.body);

    console.log('\nIN-PROCESS E2E SUCCESS');
    process.exit(0);
  } catch (err) {
    console.error('E2E IN-PROCESS ERROR', err);
    process.exit(1);
  }
})();
