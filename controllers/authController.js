import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

async function login(req, res) {
    const { username, password } = req.body;

    // Verifica se é a senha mestre
    if (password === process.env.MASTER_PASSWORD) {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const token = jwt.sign(
            { id: user.id, team: user.team, permissions: user.permissions, master: true },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.json({ token, master: true });
    }

    // Login normal
    const user = await User.findOne({ where: { username } });

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
        return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    const token = jwt.sign(
        { id: user.id, team: user.team, permissions: user.permissions },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.json({ token });
}

export default { login };