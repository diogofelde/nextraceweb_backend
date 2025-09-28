function getAutenticacaoJWTData(req, res) {
  res.json({ modulo: 'AutenticacaoJWT', status: 'OK', dados: [] });
}

module.exports = { getAutenticacaoJWTData };
