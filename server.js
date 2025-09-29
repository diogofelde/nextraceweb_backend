import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; // ✅ Importa o pacote de segurança
import authRoutes from './routes/auth.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ✅ Aplica os cabeçalhos de segurança recomendados
app.use(helmet());

app.use(cors({
    origin: 'https://nextraceweb.vercel.app',
    credentials: false
}));

// ✅ Rota de login via /api/login
app.use('/api', authRoutes);

// ✅ Tratamento de erros não tratados
app.use((err, req, res, next) => {
    console.error('>>> Erro não tratado', err.stack || err.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});