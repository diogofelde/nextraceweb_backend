function getIntegracaoAPIsData(req, res) {
  res.json({ modulo: 'IntegracaoAPIs', status: 'OK', dados: [] });
}

module.exports = { getIntegracaoAPIsData };
