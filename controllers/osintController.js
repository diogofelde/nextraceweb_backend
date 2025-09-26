function getOSINTData(req, res) {
  res.json({ area: 'OSINT', status: 'OK', dados: [] });
}

module.exports = { getOSINTData };
