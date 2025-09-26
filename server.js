const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000; // Porta dinâmica para Render

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