function getDocumentacaoInternaData(req, res) {
  res.json({ modulo: 'DocumentacaoInterna', status: 'OK', dados: [] });
}

module.exports = { getDocumentacaoInternaData };
