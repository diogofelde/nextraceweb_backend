app.get('/api/prestamista', (req, res) => {
    const nome = req.query.nome || req.query.alvo;
    res.json([
        { Nome: nome, Score: 780, Status: 'Aprovado' }
    ]);
});