<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000; // Porta dinâmica para Render
=======
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
>>>>>>> 86cf59ce9768abf29a184d7e493dee1fd8ebc3e2

// Middlewares
app.use(cors({
    origin: ['https://nextraceweb.vercel.app'], // Libera frontend Vercel
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json());

// Rotas
app.use('/api/auth', authRoutes);

// Rota de teste
app.get('/api/ping', (req, res) => {
<<<<<<< HEAD
    res.status(200).json({ message: '✅ Backend ativo e respondendo!' });
});

// Inicialização
sequelize.authenticate()
    .then(() => {
        console.log('✅ Conectado ao banco de dados com sucesso.');
        return sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Backend rodando na porta ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Erro ao conectar com o banco de dados:', err);
    });
=======
  res.json({ message: 'pong' });
});

// Inicialização
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
>>>>>>> 86cf59ce9768abf29a184d7e493dee1fd8ebc3e2
