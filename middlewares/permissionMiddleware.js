import logger from '../utils/logger.js';

export function verificarPermissao(permissaoNecessaria) {
    return (req, res, next) => {
        const usuario = req.usuario;

        // 🔐 Verifica se o usuário está autenticado
        if (!usuario) {
            logger.warn(`Acesso não autenticado à rota ${req.originalUrl}`);
            return res.status(401).json({ error: 'Usuário não autenticado' });
        }

        // 🛡️ Permissão total para usuários master
        if (usuario.master) return next();

        // 🚫 Verifica se o usuário tem a permissão necessária
        if (!usuario.permissions?.includes(permissaoNecessaria)) {
            logger.warn(`Acesso negado para ${usuario.email} na rota ${req.originalUrl}`);
            return res.status(403).json({ error: 'Permissão negada' });
        }

        // ✅ Permissão concedida
        next();
    };
}
