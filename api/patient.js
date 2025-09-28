app.get('/api/patient', (req, res) => {
    const indicador = req.query.indicador || req.query.alvo;
    res.json([
        { Indicador: indicador, Status: 'Malicioso', Fonte: 'CrowdStrike' }
    ]);
});