function consultarAPI(req, res) {
  const { dado } = req.body;
  const resultadoSimulado = {
    entrada: dado,
    status: 'OK',
    fonte: 'VirusTotal (simulado)',
    tipo: 'Malicioso',
    confiabilidade: 'Alta'
  };
  res.json(resultadoSimulado);
}

module.exports = { consultarAPI };
