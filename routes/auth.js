import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sequelize from '../config/database.js';

const router = express.Router();

// Exemplo de rota protegida
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Simulação de validação (substitua com lógica real)
    if (username === 'admin' && password === 'admin') {
        const token = jwt.sign({ username }, 'seuSegredoJWT', { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ error: 'Credenciais inválidas' });
});

export default router;