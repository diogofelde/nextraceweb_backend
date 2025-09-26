app.post('/api/login', express.json(), (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '1234') {
        return res.json({ token: 'fake-jwt-token' });
    }
    res.status(401).json({ erro: 'Credenciais inválidas' });
});