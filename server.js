import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔗 Rotas
app.use('/api', authRoutes);

// 🩺 Rota de saúde
app.get('/health', (req, res) => {
    res.send('OK');
});

// 🚀 Inicializa servidor e conecta ao banco
sequelize.sync().then(() => {
    console.log('🗄️ Banco conectado com sucesso');
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
}).catch(err => {
    console.error('❌ Erro ao conectar ao banco:', err);
});