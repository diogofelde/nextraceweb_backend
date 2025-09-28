const fs = require('fs');
const path = require('path');

function exportarForense(req, res) {
  const conteudo = 'Exportação simulada de resultados da área Forense';
  const buffer = Buffer.from(conteudo, 'utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=Forense-exportado.txt');
  res.setHeader('Content-Type', 'text/plain');
  res.send(buffer);
}

module.exports = { exportarForense };
