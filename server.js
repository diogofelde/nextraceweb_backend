import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

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

app.get('/api/health', (req, res) => {
  res.send('OK');
});

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.error('>>> Erro não tratado', err.stack || err.message);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

const port = process.env.PORT || 10000;
console.log("Servidor rodando na porta " + port);
app.listen(port);
