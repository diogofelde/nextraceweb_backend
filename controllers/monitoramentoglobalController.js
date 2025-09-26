function consultarAmeacas(req, res) {
  const ameacas = [
    { tipo: 'Phishing', origem: 'IP 192.168.1.10' },
    { tipo: 'Malware', origem: 'dominio-malicioso.com' },
    { tipo: 'Botnet', origem: 'IP 203.0.113.5' }
  ];
  res.json({ status: 'OK', ameacas });
}

module.exports = { consultarAmeacas };
