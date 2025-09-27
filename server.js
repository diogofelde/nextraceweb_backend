import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import sequelize from './config/database.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { requestLogger } from './middlewares/requestLogger.js';
import { setupSwagger } from './utils/swagger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// 🛡️ Middleware de CORS
app.use(cors({
    origin: 'https://nextraceweb.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// 📦 Middleware para JSON
app.use(express.json());

// 📋 Logger de requisições
app.use(requestLogger);

// 📘 Documentação Swagger
setupSwagger(app);

// 🔗 Rotas
app.use('/', authRoutes);

// 🧪 Rota de teste
app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'Backend ativo e respondendo' });
});

// 🚫 Rota 404
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

// 🚀 Inicialização do banco e servidor
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