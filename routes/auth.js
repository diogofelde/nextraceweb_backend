import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// POST /api/login
router.post('/login', async (req, res) => {
  const { identificador, password } = req.body;

  try {
    const usuario = await User.findOne({
      where: {
        username: identificador, // ou 'email' ou 'matricula' conforme o campo de login
      },
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(password, usuario.passwordHash);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        role: usuario.role,
        permissions: usuario.permissions,
      },
      process.env.JWT_SECRET || 'segredoPadrao',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

export default router;