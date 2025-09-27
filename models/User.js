import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Verifica se o usuário existe
        const usuario = await User.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        // Compara a senha com o hash armazenado
        const senhaValida = await bcrypt.compare(senha, usuario.passwordHash);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'Senha incorreta' });
        }

        // Gera token JWT
        const token = jwt.sign(
            { id: usuario.id, role: usuario.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Retorna sucesso
        res.json({
            mensagem: 'Login realizado com sucesso',
            token,
            usuario: {
                id: usuario.id,
                username: usuario.username,
                email: usuario.email,
                role: usuario.role,
                team: usuario.team
            }
        });
    } catch (erro) {
        console.error('Erro no login:', erro);
        res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

export default { login };