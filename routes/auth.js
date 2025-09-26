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
});

export default router;