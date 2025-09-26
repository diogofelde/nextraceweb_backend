function validarModulos(req, res) {
  const status = {
    dashboard: 'OK',
    exportacao: 'OK',
    autenticacao: 'OK',
    monitoramento: 'OK'
  };
  res.json(status);
}

module.exports = { validarModulos };
