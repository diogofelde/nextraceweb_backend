const modulos = [
  'soc', 'noc', 'auditoria', 'executivo', 'diretoria',
  'forense', 'incidentes', 'treinamentos', 'rastreamento',
  'grc', 'ativos', 'blueteam', 'modulo'
];

modulos.forEach(modulo => {
  app.get(`/api/${modulo}`, (req, res) => {
    const alvo =
      req.query.alvo || req.query.ip || req.query.nome || req.query.registro ||
      req.query.indicador || req.query.host || req.query.politica ||
      req.query.id || req.query.artefato || req.query.url || req.query.query;

    res.json([
      {
        Módulo: modulo.toUpperCase(),
        Alvo: alvo || 'Não informado',
        Status: 'Simulado',
        Resultado: 'OK'
      }
    ]);
  });
});