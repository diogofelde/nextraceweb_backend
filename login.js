import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Usuário fictício para teste
const fakeUser = {
    id: 1,
    username: 'admin',
    passwordHash: bcrypt.hashSync('senha123', 10)
};

// Rota de login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username !== fakeUser.username || !bcrypt.compareSync(password, fakeUser.passwordHash)) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: fakeUser.id }, 'segredo123', { expiresIn: '1h' });
    res.json({ token });
});

export default router;