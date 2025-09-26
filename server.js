import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Corrigir __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 4000;

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