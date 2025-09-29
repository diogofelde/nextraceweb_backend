import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: 'https://nextraceweb.vercel.app',
  credentials: false
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// ✅ Rota de login via /api/login
app.use('/api', authRoutes);

app.use((err, req, res, next) => {
  console.error('>>> Erro não tratado', err.stack || err.message);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});