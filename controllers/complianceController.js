function getComplianceData(req, res) {
  res.json({ area: 'Compliance', status: 'OK', dados: [] });
}

module.exports = { getComplianceData };
