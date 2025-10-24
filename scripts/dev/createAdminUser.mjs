import sequelize from '../../config/database.js';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

const ADMIN_USER = {
    username: 'admin',
    email: 'admin@example.com',
    password: 'Admin@123',
    acesso: 'admin'
};

(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conectado ao banco');

        // Cria hash da senha
        const hashedPassword = await bcrypt.hash(ADMIN_USER.password, 10);

        // Cria ou atualiza o usuário admin
        const [user, created] = await User.upsert({
            username: ADMIN_USER.username,
            email: ADMIN_USER.email,
            password: hashedPassword,
            acesso: ADMIN_USER.acesso
        });

        console.log('Usuário admin ' + (created ? 'criado' : 'atualizado') + ':', {
            id: user.id,
            username: user.username,
            email: user.email,
            acesso: user.acesso
        });

        // Verifica se a senha está correta
        const isValid = await bcrypt.compare(ADMIN_USER.password, user.password);
        console.log('Senha válida:', isValid);

        process.exit(0);
    } catch (err) {
        console.error('Erro:', err);
        process.exit(1);
    }
})();