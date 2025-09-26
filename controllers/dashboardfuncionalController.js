function getDashboardFuncionalData(req, res) {
  res.json({ modulo: 'DashboardFuncional', status: 'OK', dados: [] });
}

module.exports = { getDashboardFuncionalData };
