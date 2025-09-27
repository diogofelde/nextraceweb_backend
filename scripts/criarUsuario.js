import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import sequelize from '../config/database.js';

const main = async () => {
    try {
        await sequelize.sync();

        const passwordHash = bcrypt.hashSync('senha123', 10);

        await User.create({
            username: 'admin',
            passwordHash,
            email: 'admin@nextrace.com.br',
            team: 'TI',
            permissions: ['admin'],
            role: 'admin',
            isActive: true
        });

        console.log('✅ Usuário criado com sucesso');
    } catch (erro) {
        console.error('❌ Erro ao criar usuário:', erro);
    } finally {
        process.exit();
    }
};

main();