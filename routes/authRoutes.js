import express from 'express';
import { verificarToken } from '../middlewares/authMiddleware.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// 🔹 Listar todos os usuários
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

// 🔹 Ver perfil de um usuário
router.get('/usuarios/:id', verificarToken, async (req, res) => {
    const { id } = req.params;
    const usuario = await User.findByPk(id, {
        attributes: ['id', 'username', 'createdAt']
    });

    if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(usuario);
});

// 🔹 Criar usuário autenticado
router.post('/usuarios', verificarToken, async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
        return res.status(409).json({ error: 'Usuário já existe' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ username, passwordHash });

    res.status(201).json({ id: newUser.id, username: newUser.username });
});

// 🔹 Editar usuário
router.put('/usuarios/:id', verificarToken, async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    const usuario = await User.findByPk(id);
    if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (username) usuario.username = username;
    if (password) usuario.passwordHash = bcrypt.hashSync(password, 10);

    await usuario.save();
    res.json({ mensagem: 'Usuário atualizado com sucesso' });
});

// 🔹 Excluir usuário
router.delete('/usuarios/:id', verificarToken, async (req, res) => {
    const { id } = req.params;

    const usuario = await User.findByPk(id);
    if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await usuario.destroy();
    res.json({ mensagem: 'Usuário excluído com sucesso' });
});

export default router;