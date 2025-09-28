app.get('/api/threatintel', (req, res) => {
    const indicador = req.query.indicador || req.query.indicator || req.query.alvo;
    res.json([
        { Fonte: 'VirusTotal', Indicador: indicador, Status: 'Suspeito' },
        { Fonte: 'AlienVault', Indicador: indicador, Status: 'Monitorado' }
    ]);
});