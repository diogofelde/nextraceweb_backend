function getResponsividadeData(req, res) {
  res.json({ modulo: 'Responsividade', status: 'OK', dados: [] });
}

module.exports = { getResponsividadeData };
