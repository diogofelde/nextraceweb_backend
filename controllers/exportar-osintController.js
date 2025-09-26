const fs = require('fs');
const path = require('path');

function exportarOSINT(req, res) {
  const conteudo = 'Exportação simulada de resultados da área OSINT';
  const buffer = Buffer.from(conteudo, 'utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=OSINT-exportado.txt');
  res.setHeader('Content-Type', 'text/plain');
  res.send(buffer);
}

module.exports = { exportarOSINT };
