app.get('/api/alunos', (req, res) => {
    const nome = req.query.nome || req.query.alvo;
    res.json([
        { Nome: nome, Curso: 'Segurança da Informação', Status: 'Ativo' }
    ]);
});