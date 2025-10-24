import fetch from 'node-fetch';

const BASE = 'http://localhost:3000/api';

async function run() {
  try {
    console.log('1) Login com credenciais seed');
    let res = await (await fetch(`${BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', password: 'Test@123' })
    })).json();
    console.log('Login response:', res);
    if (!res.token) throw new Error('Login falhou');

    const token = res.token;

    console.log('\n2) GET /me com token obtido');
    res = await (await fetch(`${BASE}/me`, { headers: { Authorization: `Bearer ${token}` } })).json();
    console.log('/me:', res);

    console.log('\n3) Solicitar forgot-password (gera token de reset)');
    res = await (await fetch(`${BASE}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' })
    })).json();
    console.log('forgot-password:', res);
    if (!res.token) throw new Error('Token de reset não retornado');

    const resetToken = res.token;

    console.log('\n4) Resetar senha para NewPass@123');
    res = await (await fetch(`${BASE}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: resetToken, password: 'NewPass@123' })
    })).json();
    console.log('reset-password:', res);

    console.log('\n5) Tentar login com nova senha');
    res = await (await fetch(`${BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', password: 'NewPass@123' })
    })).json();
    console.log('Login com nova senha:', res);

    if (res.token) {
      console.log('\nFluxo E2E concluído com sucesso.');
    } else {
      throw new Error('Falha no login com nova senha');
    }
  } catch (err) {
    console.error('Erro no teste E2E:', err);
    process.exit(1);
  }
}

run();
