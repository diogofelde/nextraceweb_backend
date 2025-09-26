const fs = require('fs');
const path = require('path');

function exportarTI(req, res) {
  const conteudo = 'Exportação simulada de resultados da área TI';
  const buffer = Buffer.from(conteudo, 'utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=TI-exportado.txt');
  res.setHeader('Content-Type', 'text/plain');
  res.send(buffer);
}

module.exports = { exportarTI };
