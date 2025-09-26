function getProtecaoRotasData(req, res) {
  res.json({ modulo: 'ProtecaoRotas', status: 'OK', dados: [] });
}

module.exports = { getProtecaoRotasData };
