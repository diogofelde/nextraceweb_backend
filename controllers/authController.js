import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

async function login(req, res) {
  try {
    console.log('>>> /login body', req.body);

    const { username, password } = req.body || {};
    if (!username || !password) {
      console.log('>>> Campos ausentes');
      return res.status(400).json({ error: 'username and password required' });
    }

    // Verifica se senha mestre foi usada
    if (password === process.env.MASTER_PASSWORD) {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        console.log('>>> Usuário não encontrado com senha mestre');
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const token = jwt.sign(
        { id: user.id, team: user.team, permissions: user.permissions, master: true },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      console.log('>>> Login com senha mestre OK');
      return res.json({ token, master: true });
    }

    // Busca usuário normalmente
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log('>>> Usuário não encontrado');
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    // ✅ Corrigido: campo de senha é 'password' no banco
    const ok = bcrypt.compareSync(password, user.password);
    if (!ok) {
      console.log('>>> Senha incorreta');
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('>>> JWT_SECRET ausente');
      return res.status(500).json({ error: 'Configuração inválida do servidor' });
    }

    const token = jwt.sign(
      { id: user.id, team: user.team, permissions: user.permissions },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    console.log('>>> Login OK, token gerado');
    return res.json({ token });
  } catch (err) {
    console.error('>>> Erro no login', err.stack || err.message);
    return res.status(500).json({ error: 'Erro interno no login' });
  }
}

export default { login };