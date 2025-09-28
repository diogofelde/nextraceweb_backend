import sequelize from '../config/database.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const seed = async () => {
    try {
        // 🔄 Limpa e recria tabelas
        await sequelize.sync({ force: true });

        // 🔐 Cria usuários iniciais
        const senhaHash = bcrypt.hashSync('senha123', 10);

        await User.bulkCreate([
            {
                username: 'admin',
                email: 'admin@nextrace.com.br',
                passwordHash: senhaHash,
                role: 'admin',
                team: 'TI',
                permissions: ['admin'],
                isActive: true,
                master: true
            },
            {
                username: 'diogo',
                email: 'diogo@empresa.com',
                passwordHash: senhaHash,
                role: 'user',
                team: 'Operações',
                permissions: ['visualizar_dashboard'],
                isActive: true,
                master: false
            }
        ]);

        console.log('✅ Seed executado com sucesso!');
    } catch (err) {
        console.error('❌ Erro ao executar seed:', err);
    } finally {
        process.exit();
    }
};

seed();