function simularAtaque(req, res) {
  const evento = {
    tipo: 'Ataque DDoS',
    origem: 'IP 185.23.44.12',
    impacto: 'Alto',
    status: 'Detectado e isolado'
  };
  res.json(evento);
}

module.exports = { simularAtaque };
