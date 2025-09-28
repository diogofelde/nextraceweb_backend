import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import sequelize from './config/database.js'; // Importa conexão com o banco

const app = express();

// Middleware para JSON
app.use(express.json());

// CORS para frontend em produção
app.use(cors({
  origin: 'https://nextraceweb.vercel.app',
  credentials: false
}));

// Headers de segurança
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.send('OK');
});

// Rotas principais
app.use('/api', routes);

// Tratamento de erro
app.use((err, req, res, next) => {
  console.error('>>> Erro não tratado', err.stack || err.message);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Testa conexão com banco
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado ao banco com sucesso');
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar ao banco:', err.message);
  });

// Inicia servidor
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
