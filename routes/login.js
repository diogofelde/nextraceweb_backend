import express from 'express';
import User from '../models/User.js'; // Certifique-se que o modelo está correto

const router = express.Router();

// 🔐 Rota de login sem criptografia
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

        res.json({
            acesso: usuario.is_master ? 'total' : 'limitado',
            user: {
                id: usuario.id,
                username: usuario.username,
                is_master: usuario.is_master
            }
        });
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

export default router;