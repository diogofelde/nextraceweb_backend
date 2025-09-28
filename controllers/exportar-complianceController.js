const fs = require('fs');
const path = require('path');

function exportarCompliance(req, res) {
  const conteudo = 'Exportação simulada de resultados da área Compliance';
  const buffer = Buffer.from(conteudo, 'utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=Compliance-exportado.txt');
  res.setHeader('Content-Type', 'text/plain');
  res.send(buffer);
}

module.exports = { exportarCompliance };
