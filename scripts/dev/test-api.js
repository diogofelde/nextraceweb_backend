import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

async function testarLogin() {
    try {
        // 1️⃣ Login
        const login = await axios.post(`${BASE_URL}/login`, {
            email: 'diogo@empresa.com',
            senha: 'senha123'
        });

        const token = login.data.token;
        console.log('✅ Token recebido:', token);

        // 2️⃣ Rota protegida /me
        const me = await axios.get(`${BASE_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('👤 Dados do usuário:', me.data);

        // 3️⃣ Rota protegida /admin/dashboard
        const admin = await axios.get(`${BASE_URL}/admin/dashboard`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('🛡️ Acesso ao painel admin:', admin.data);

    } catch (err) {
        console.error('❌ Erro:', err.response?.data || err.message);
    }
}

testarLogin();
