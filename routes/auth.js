import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const router = express.Router();

// Rota de registro
router.post('/register', async (req, res) => {
  const { username, email, matricula, password, team, permissions, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ error: 'Usuário já existe' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      matricula,
      passwordHash,
      team,
      permissions,
      role
    });

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Usuário criado com sucesso', token });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const usuario = await User.findOne({
      where: { username }
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
        permissions: usuario.permissions
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