import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Usuario } from '../models/Usuario.js'; // modelo Sequelize
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// POST /api/login
router.post('/login', async (req, res) => {
  const { identificador, password } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: { identificador }
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(password, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: usuario.id, perfil: usuario.perfil },
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