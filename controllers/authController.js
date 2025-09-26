const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
        return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    const token = jwt.sign(
        { id: user.id, team: user.team, permissions: user.permissions },
        'segredo123',
        { expiresIn: '24h' }
    );

    res.json({ token });
};

exports.register = async (req, res) => {
    const { username, password, team, permissions } = req.body;

    if (!username || !password || !team || !permissions) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
        return res.status(409).json({ error: 'Usuário já existe' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ username, passwordHash, team, permissions });

    const token = jwt.sign(
        { id: newUser.id, team: newUser.team, permissions: newUser.permissions },
        'segredo123',
        { expiresIn: '1h' }
    );

    res.status(201).json({ token });
};