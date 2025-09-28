function getManualAnalistasData(req, res) {
  res.json({ modulo: 'ManualAnalistas', status: 'OK', dados: [] });
}

module.exports = { getManualAnalistasData };
