const fs = require('fs');
const path = require('path');

function exportarSOC(req, res) {
  const conteudo = 'Exportação simulada de resultados da área SOC';
  const buffer = Buffer.from(conteudo, 'utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=SOC-exportado.txt');
  res.setHeader('Content-Type', 'text/plain');
  res.send(buffer);
}

module.exports = { exportarSOC };
