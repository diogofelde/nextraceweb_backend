function getControleAcessoData(req, res) {
  res.json({ modulo: 'ControleAcesso', status: 'OK', dados: [] });
}

module.exports = { getControleAcessoData };
