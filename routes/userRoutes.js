import express from 'express';
import { verificarToken } from '../middlewares/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/usuarios', verificarToken, async (req, res) => {
    try {
        const usuarios = await User.findAll({
            attributes: ['id', 'username', 'createdAt']
        });
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

export default router;