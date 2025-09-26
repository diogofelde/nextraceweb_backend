function getModoSimuladoRealData(req, res) {
  res.json({ modulo: 'ModoSimuladoReal', status: 'OK', dados: [] });
}

module.exports = { getModoSimuladoRealData };
