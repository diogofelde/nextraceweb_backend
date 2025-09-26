function getTIData(req, res) {
  res.json({ area: 'TI', status: 'OK', dados: [] });
}

module.exports = { getTIData };
