import express from 'express';
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'Diogo' && password === 'D1090') {
    return res.json({ token: 'fake-jwt-token' });
  }
  res.status(401).json({ erro: 'Credenciais inválidas' });
});

export default router;