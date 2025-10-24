import axios from 'axios';

const BASE = 'http://127.0.0.1:3000/api';
axios.defaults.timeout = 10000;

(async () => {
  try {
    console.log('1) Login with seed');
  let r = await axios.post(`${BASE}/login`, { username: 'testuser', password: 'Test@123' });
    console.log('login:', r.data);
    const token = r.data.token;

    console.log('2) GET /me');
    r = await axios.get(`${BASE}/me`, { headers: { Authorization: `Bearer ${token}` } });
    console.log('/me:', r.data);

    console.log('3) forgot-password');
    r = await axios.post(`${BASE}/forgot-password`, { email: 'test@example.com' });
    console.log('forgot-password:', r.data);
    const resetToken = r.data.token;

    console.log('4) reset-password');
    r = await axios.post(`${BASE}/reset-password`, { token: resetToken, password: 'NewPass@123' });
    console.log('reset-password:', r.data);

    console.log('5) login with new password');
    r = await axios.post(`${BASE}/login`, { username: 'testuser', password: 'NewPass@123' });
    console.log('login new:', r.data);

    console.log('\nE2E SUCCESS');
  } catch (err) {
    if (err.response) {
      console.error('Error response:', err.response.status, JSON.stringify(err.response.data));
    } else if (err.request) {
      console.error('No response received, request details:', err.request);
    } else {
      console.error('Error creating request:', err.message, err.stack);
    }
    process.exit(1);
  }
})();
