import jwt from 'jsonwebtoken';

export function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log('🔍 Header recebido:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    console.log('🔑 Token extraído:', token);

    try {
        const decoded = jwt.verify(token, 'segredo123');
        console.log(' Token decodificado:', decoded);
        req.usuario = decoded;
        next();
    } catch (err) {
        console.error('❌ Erro ao verificar token:', err.message);
        return res.status(403).json({ error: 'Token inválido ou expirado' });
    }
}
