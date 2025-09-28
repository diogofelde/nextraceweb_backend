import express from 'express';
import User from '../models/User.js'; // Certifique-se que o modelo está correto

const router = express.Router();

// 🔐 Rota de login com logs para depuração
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('🔍 Recebido login:', username, password);

  try {
    const usuario = await User.findOne({ where: { username } });

    console.log('👤 Resultado da busca:', usuario);

    if (!usuario) {
      console.log('❌ Usuário não encontrado');
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if (usuario.password !== password) {
      console.log('❌ Senha incorreta');
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    console.log('✅ Login bem-sucedido:', usuario.username);

    res.json({
      acesso: usuario.is_master ? 'total' : 'limitado',
      user: {
        id: usuario.id,
        username: usuario.username,
        is_master: usuario.is_master
      }
    });
  } catch (err) {
    console.error('❌ Erro no login:', err);
    res.status(500).json({ error: 'Erro interno no login' });
  }
});

export default router;