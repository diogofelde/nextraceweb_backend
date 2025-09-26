export function verificarPermissao(permissaoNecessaria) {
  return (req, res, next) => {
    const usuario = req.usuario;
    if (usuario?.master) return next();
    if (!usuario?.permissions?.includes(permissaoNecessaria)) {
      return res.status(403).json({ error: 'Permissão negada' });
    }
    next();
  };
}
