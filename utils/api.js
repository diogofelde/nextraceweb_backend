import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export async function login(identificador, password) {
  const res = await api.post('/api/login', { identificador, password });
  const token = res.data.token;
  api.defaults.headers.common['Authorization'] = \Bearer \\;
  return token;
}

export async function getMe() {
  const res = await api.get('/me');
  return res.data;
}

export async function getAdminDashboard() {
  const res = await api.get('/admin/dashboard');
  return res.data;
}
