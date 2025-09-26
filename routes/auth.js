import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
<<<<<<< HEAD
import dotenv from 'dotenv';
import User from '../models/User.js';
=======
import User from '../models/User.js';
import dotenv from 'dotenv';
>>>>>>> 86cf59ce9768abf29a184d7e493dee1fd8ebc3e2

dotenv.config();

const router = express.Router();

<<<<<<< HEAD
// Rota de registro
router.post('/register', async (req, res) => {
    const { username, email, matricula, password, team, permissions, role } = req.body;

    try {
        // Verifica se usuário já existe
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ error: 'Usuário já existe' });
        }

        // Criptografa a senha
        const passwordHash = await bcrypt.hash(password, 10);

        // Cria novo usuário
        const newUser = await User.create({
            username,
            email,
            matricula,
            passwordHash,
            team,
            permissions,
            role
        });

        // Gera token JWT
        const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(201).json({ message: 'Usuário criado com sucesso', token });
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
=======
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
>>>>>>> 86cf59ce9768abf29a184d7e493dee1fd8ebc3e2
});

export default router;