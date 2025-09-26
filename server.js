import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api', authRoutes);

// Rota de teste
app.get('/api/ping', (req, res) => {
    res.json({ message: 'pong' });
});

// Inicialização
app.listen(PORT, () => {
    console.log(`🚀 Backend rodando na porta ${PORT}`);
});