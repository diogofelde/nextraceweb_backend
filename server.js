import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import routes from './routes/index.js';
import sequelize from './config/database.js';

const app = express();

// Básicos de segurança e performance
app.disable('x-powered-by');
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '100kb' }));
app.set('trust proxy', true);
app.use(morgan('combined'));

// CORS
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'https://nextraceweb.vercel.app';
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: false }));

// Security headers extras e preflight
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

// Rotas principais
app.use('/api', routes);

// Tolerância para typo no health check do Render
app.get('/api/healtc', (_, res) => res.status(200).send('OK'));

// Health (liveness) e Ready (readiness)
app.get('/api/health', (_, res) => res.status(200).send('OK'));
app.get('/api/ready', async (_, res) => {
    try {
        await sequelize.authenticate();
        return res.status(200).json({ ready: true });
    } catch (err) {
        return res.status(503).json({ ready: false, error: err.message });
    }
});

// Error handler
app.use((err, req, res, next) => {
    console.error('❌ Erro não tratado:', err.stack || err.message);
    res.status(err.status || 500).json({ error: err.message || 'Erro interno do servidor' });
});

// ENV checks mínimos
['DB_URL', 'NODE_ENV'].forEach(k => {
    if (!process.env[k]) console.warn(`⚠️ Variável ${k} não definida`);
});

// Porta e ambiente
const port = Number(process.env.PORT) || 10000;
const env = process.env.NODE_ENV || 'desconhecido';

// Helper: tentativa de conexão ao DB com retry exponencial simples
const startDbWithRetry = async (retries = 5, baseDelay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
            await sequelize.authenticate();
            console.log('✅ Conectado ao banco com sucesso');
            return;
        } catch (err) {
            const attempt = i + 1;
            console.warn(`Tentativa ${attempt} para conectar ao DB falhou: ${err.message}`);
            if (attempt < retries) {
                const wait = baseDelay * attempt;
                console.log(`Aguardando ${wait}ms antes da próxima tentativa`);
                await new Promise(r => setTimeout(r, wait));
            }
        }
    }
    throw new Error('Falha ao conectar ao banco após várias tentativas');
};

// Inicia servidor e verifica DB em background
const server = app.listen(port, async () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
    console.log(`🌍 Ambiente: ${env}`);
    try {
        await startDbWithRetry();
    } catch (err) {
        console.error('❌ DB unrecoverable:', err.message);
        if (process.env.ALLOW_OFFLINE === 'true') {
            console.warn('⚠️ Modo offline ativado — servidor continuará sem DB');
        } else {
            console.error('⛔ Saindo pois DB é obrigatório');
            process.exit(1);
        }
    }
});

// Keep-alive / timeouts
server.keepAliveTimeout = 65000;
server.headersTimeout = 70000;

// Graceful shutdown
const gracefulShutdown = async () => {
    console.log('🛑 Recebido sinal de encerramento, fechando servidor...');
    server.close(async () => {
        try {
            await sequelize.close();
            console.log('✅ DB desconectado');
        } catch (e) {
            console.warn('Erro ao desconectar DB', e && e.message);
        }
        process.exit(0);
    });
    setTimeout(() => {
        console.error('Forçando saída após timeout');
        process.exit(1);
    }, 30000);
};
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Captura erros globais
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

export default app;