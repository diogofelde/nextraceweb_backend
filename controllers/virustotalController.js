const axios = require('axios');

async function consultarVirusTotal(req, res) {
  const { entrada } = req.body;
  const apiKey = 'SUA_API_KEY_AQUI'; // substitua pela sua chave real
  const tipo = entrada.includes('.') ? 'domains' : 'ip_addresses';
  const url = \https://www.virustotal.com/api/v3/\/\\;

  try {
    const resposta = await axios.get(url, {
      headers: { 'x-apikey': apiKey }
    });
    res.json(resposta.data);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao consultar VirusTotal', detalhes: error.message });
  }
}

module.exports = { consultarVirusTotal };
