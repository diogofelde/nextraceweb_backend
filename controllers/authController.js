import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import User from '../models/User.js';
import crypto from 'crypto';
import db from '../config/sqliteDb.cjs';
import { signToken } from '../utils/jwtUtils.js';

async function login(req, res) {
    try {
        console.log('Login request body:', req.body);
        const { username, password } = req.body;
        console.log('Login attempt:', { username, password: password ? '***' : null });

        if (!username || !password) {
            return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
        }

        // Busca por username OU email (fallback para leitura em memória caso haja problemas de collation/paths)
        let user;
        try {
            user = await User.findOne({
                where: {
                    [Op.or]: [
                        { username: username },
                        { email: username }
                    ]
                }
            });
        } catch (err) {
            console.warn('Query findOne falhou, tentando leitura completa e filtragem em memória:', err && (err.message || err));
        }

        if (!user) {
            // fallback: buscar todos e comparar em JS (dev-only, menos performático)
            const all = await User.findAll();
            user = all.find(u => (u.username && u.username === username) || (u.email && u.email === username));
        }

    // Log de debug não sensível: não exponha hashes ou senhas
    console.log('DEBUG: user found:', user ? { id: user.id, username: user.username, email: user.email } : null);

        if (!user) {
            return res.status(401).json({ error: 'Usuário ou senha inválidos' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Usuário ou senha inválidos' });
        }

        const token = signToken(
            {
                id: user.id,
                username: user.username,
                acesso: user.acesso
            },
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            token,
            user: {
                id: user.id,
                username: user.username,
                acesso: user.acesso
            }
        });
    } catch (err) {
        console.error('Erro no login:', err && (err.stack || err.message || err));
        return res.status(500).json({ error: 'Erro interno no login' });
    }
}

async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email é obrigatório' });

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = Date.now() + 3600 * 1000; // 1 hora

        // Salva token no sqlite (tabela password_resets)
        db.run(
            `INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)`,
            [user.id, token, expiresAt],
            function (err) {
                if (err) {
                    console.error('Erro ao salvar token de reset:', err.message);
                    return res.status(500).json({ error: 'Erro interno' });
                }
                // Em produção enviar por email. Aqui retornamos token para teste.
                return res.json({ message: 'Token gerado', token });
            }
        );
    } catch (err) {
        console.error('Erro forgotPassword:', err);
        return res.status(500).json({ error: 'Erro interno' });
    }
}

async function resetPassword(req, res) {
    try {
        const { token, password } = req.body;
        if (!token || !password) return res.status(400).json({ error: 'Token e nova senha são obrigatórios' });

        db.get(`SELECT * FROM password_resets WHERE token = ?`, [token], async (err, row) => {
            if (err) {
                console.error('Erro ao ler token:', err.message);
                return res.status(500).json({ error: 'Erro interno' });
            }
            if (!row) return res.status(400).json({ error: 'Token inválido' });
            if (row.expires_at < Date.now()) return res.status(400).json({ error: 'Token expirado' });

            // Atualiza senha do usuário
            const hashed = bcrypt.hashSync(password, 10);
            await User.update({ password: hashed }, { where: { id: row.user_id } });

            // Remove token usado
            db.run(`DELETE FROM password_resets WHERE id = ?`, [row.id]);

            return res.json({ message: 'Senha alterada com sucesso' });
        });
    } catch (err) {
        console.error('Erro resetPassword:', err);
        return res.status(500).json({ error: 'Erro interno' });
    }
}

export default { login, forgotPassword, resetPassword };