import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const usuario = await User.findOne({ where: { username } });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if (usuario.password !== password) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        username: usuario.username,
        is_master: usuario.is_master
      },
      process.env.JWT_SECRET || 'segredoPadrao',
      { expiresIn: '2h' }
    );

    res.json({
      token,
      acesso: usuario.is_master ? 'total' : 'limitado',
      user: {
        id: usuario.id,
        username: usuario.username,
        is_master: usuario.is_master
      }
    });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro interno no login' });
  }
});

export default router;