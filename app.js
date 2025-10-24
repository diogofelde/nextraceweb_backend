import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.js';
import sequelize from './config/database.js';

export default async function createApp() {
  const app = express();

  await sequelize.sync();

  app.use(express.json());
  app.use(helmet());
  app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://nextraceweb.vercel.app'],
    credentials: true
  }));

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'API está funcionando!' });
  });

  app.use('/api', authRoutes);

  // error handler
  app.use((err, req, res, next) => {
    console.error('>>> Erro não tratado', err.stack || err.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  });

  return app;
}
