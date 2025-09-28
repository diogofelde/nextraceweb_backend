function exportarAvancado(req, res) {
  const { formato } = req.body;
  let conteudo = '';
  let tipo = 'text/plain';

  switch (formato) {
    case 'json':
      conteudo = JSON.stringify({ resultado: 'simulado', status: 'OK' }, null, 2);
      tipo = 'application/json';
      break;
    case 'csv':
      conteudo = 'campo1,campo2\\nvalor1,valor2';
      tipo = 'text/csv';
      break;
    case 'pdf':
      conteudo = 'PDF simulado. Use biblioteca real para gerar PDF.';
      tipo = 'application/pdf';
      break;
    default:
      conteudo = 'Exportação simulada em TXT';
  }

  const buffer = Buffer.from(conteudo, 'utf-8');
  res.setHeader('Content-Disposition', ttachment; filename=resultado.);
  res.setHeader('Content-Type', tipo);
  res.send(buffer);
}

module.exports = { exportarAvancado };
