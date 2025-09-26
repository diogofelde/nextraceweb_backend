function getSOCData(req, res) {
  res.json({ area: 'SOC', status: 'OK', dados: [] });
}

module.exports = { getSOCData };
