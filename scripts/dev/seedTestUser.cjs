import sequelize from '../../config/database.js';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

(async () => {
  try {
    await sequelize.sync();
    const hashed = bcrypt.hashSync('Test@123', 10);
    const [user, created] = await User.findOrCreate({
      where: { username: 'testuser' },
      defaults: {
        email: 'test@example.com',
        password: hashed,
        acesso: 'admin'
      }
    });

    console.log('Usuário:', user.toJSON());
    console.log('Criado?', created);
    process.exit(0);
  } catch (err) {
    console.error('Erro seed:', err);
    process.exit(1);
  }
})();
