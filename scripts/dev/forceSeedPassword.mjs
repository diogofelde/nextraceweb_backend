import sequelize from '../../config/database.js';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao banco (force)');
    const hashed = bcrypt.hashSync('Test@123', 10);
    const [count] = await User.update({ password: hashed }, { where: { username: 'testuser' } });
    console.log('Linhas atualizadas:', count);
    process.exit(0);
  } catch (err) {
    console.error('Erro forceSeedPassword:', err);
    process.exit(1);
  }
})();
