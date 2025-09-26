function getPermissoesAnalistasData(req, res) {
  res.json({ modulo: 'PermissoesAnalistas', status: 'OK', dados: [] });
}

module.exports = { getPermissoesAnalistasData };
