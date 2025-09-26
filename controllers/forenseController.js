function getForenseData(req, res) {
  res.json({ area: 'Forense', status: 'OK', dados: [] });
}

module.exports = { getForenseData };
