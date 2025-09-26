app.get('/api/exercise', (req, res) => {
    const nome = req.query.nome || req.query.alvo;
    res.json([
        { Nome: nome, Resultado: 'Simulado concluído', Pontuação: 92 }
    ]);
});