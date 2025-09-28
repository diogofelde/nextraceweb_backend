function getGraficosIndicadoresData(req, res) {
  res.json({ modulo: 'GraficosIndicadores', status: 'OK', dados: [] });
}

module.exports = { getGraficosIndicadoresData };
