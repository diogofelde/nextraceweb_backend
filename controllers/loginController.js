import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models'; // ajusta se o modelo tiver outro nome
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await User.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ mensagem: 'Login realizado com sucesso', token });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

export default { login };