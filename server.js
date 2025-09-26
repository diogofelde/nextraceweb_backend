import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import sequelize from './config/database.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({
    origin: ['https://nextraceweb.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json());

// ✅ Rotas
app.use('/api', authRoutes);

// Rota de teste
app.get('/api/ping', (req, res) => {
    res.status(200).json({ message: '✅ Backend ativo e respondendo!' });
});

// Inicialização do banco
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
