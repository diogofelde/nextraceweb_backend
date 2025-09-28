function getExecutivoData(req, res) {
  res.json({ area: 'Executivo', status: 'OK', dados: [] });
}

module.exports = { getExecutivoData };
