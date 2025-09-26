import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

async function testarLogin() {
  try {
    const login = await axios.post(\\/api/login\, {
      identificador: 'diogo@empresa.com',
      password: 'senha123'
    });

    const token = login.data.token;
    console.log('✅ Token recebido:', token);

    const me = await axios.get(\\/me\, {
      headers: { Authorization: \Bearer \\ }
    });
    console.log('👤 Dados do usuário:', me.data);

    const admin = await axios.get(\\/admin/dashboard\, {
      headers: { Authorization: \Bearer \\ }
    });
    console.log('🛡️ Acesso ao painel admin:', admin.data);

  } catch (err) {
    console.error('❌ Erro:', err.response?.data || err.message);
  }
}

testarLogin();
