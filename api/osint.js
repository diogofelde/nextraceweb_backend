app.get('/api/osint', (req, res) => {
    const query = req.query.query || req.query.alvo;
    res.json([
        { Plataforma: 'Instagram', Perfil: `@${query}`, Link: `https://instagram.com/${query}` },
        { Plataforma: 'GitHub', Perfil: query, Link: `https://github.com/${query}` },
        { Plataforma: 'LinkedIn', Perfil: query, Link: `https://linkedin.com/in/${query}` }
    ]);
});