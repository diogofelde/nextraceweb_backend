const jwt = require('jsonwebtoken');

function autenticarUsuario(req, res) {
  const { usuario, senha } = req.body;
  const usuarios = {
    admin: { senha: '1234', perfil: 'Administrador' },
    soc: { senha: 'soc123', perfil: 'SOC' },
    osint: { senha: 'osint123', perfil: 'OSINT' }
  };

  if (usuarios[usuario] && usuarios[usuario].senha === senha) {
    const token = jwt.sign({ usuario, perfil: usuarios[usuario].perfil }, 'segredo-nextrace', { expiresIn: '2h' });
    return res.json({ token, perfil: usuarios[usuario].perfil });
  }

  res.status(401).json({ erro: 'Credenciais inválidas' });
}

module.exports = { autenticarUsuario };
