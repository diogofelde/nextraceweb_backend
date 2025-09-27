// backend/server.js
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js'; // ajuste conforme sua estrutura

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// CORS configurado para seu frontend
app.use(cors({
  origin: 'https://nextraceweb.vercel.app',
  credentials: false
}));

// Headers adicionais de segurança
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// Rotas da aplicação
app.use('/api', routes);

// Middleware global para capturar erros não tratados
app.use((err, req, res, next) => {
  console.error('>>> Erro não tratado', err.stack || err.message);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Inicialização do servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});