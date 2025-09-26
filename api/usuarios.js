app.get('/api/usuario', (req, res) => {
    const nome = req.query.nome || req.query.usuario || req.query.alvo;
    res.json([
        {
            Usuario: nome || 'Não informado',
            Cargo: 'Analista de Segurança',
            Acesso: 'Completo',
            Status: 'Ativo'
        }
    ]);
});