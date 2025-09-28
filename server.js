import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import sequelize from './config/database.js';

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

// Rotas principais
app.use('/api', routes);

// Rota de saúde — mantida fora da verificação do banco
app.get('/api/health', (req, res) => {
    res.status(200).send('OK');
});

// Tratamento de erro genérico
app.use((err, req, res, next) => {
    console.error('❌ Erro não tratado:', err.stack || err.message);
    res.status(err.status || 500).json({ error: err.message || 'Erro interno do servidor' });
});

// Porta e ambiente
const port = process.env.PORT || 10000;
const env = process.env.NODE_ENV || 'desconhecido';

// Inicia servidor imediatamente
app.listen(port, async () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
    console.log(`🌍 Ambiente: ${env}`);

    try {
        await sequelize.authenticate();
        console.log('✅ Conectado ao banco com sucesso');
    } catch (err) {
        console.error('❌ Erro ao conectar ao banco:', err.message);
        if (process.env.ALLOW_OFFLINE === 'true') {
            console.warn('⚠️ Subindo servidor mesmo sem banco (modo offline)');
        } else {
            process.exit(1);
        }
    }
});