function getMonitoramentoData(req, res) {
  res.json({ area: 'Monitoramento', status: 'OK', dados: [] });
}

module.exports = { getMonitoramentoData };
