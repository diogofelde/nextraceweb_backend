app.get('/api/isc', (req, res) => {
    const ip = req.query.ip || req.query.alvo;
    res.json([
        { IP: ip, Evento: 'Conexão suspeita detectada', Severidade: 'Alta' }
    ]);
});