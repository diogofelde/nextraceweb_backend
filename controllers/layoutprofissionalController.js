function getLayoutProfissionalData(req, res) {
  res.json({ modulo: 'LayoutProfissional', status: 'OK', dados: [] });
}

module.exports = { getLayoutProfissionalData };
