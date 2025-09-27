import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const autenticar = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'segredoPadrao');
        req.usuario = decoded;
        next();
    } catch (erro) {
        return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
    }
};

export default autenticar;