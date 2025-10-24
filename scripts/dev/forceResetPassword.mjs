import sequelize from '../../config/database.js';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

(async () => {
  try {
    await sequelize.sync();
    const newPass = 'Test@123';
    const hashed = bcrypt.hashSync(newPass, 10);
    const [affected] = await User.update({ password: hashed }, { where: { username: 'testuser' } });
    console.log('Usuários atualizados:', affected);
    const u = await User.findOne({ where: { username: 'testuser' } });
    console.log('Usuário agora:', u && u.toJSON());
    process.exit(0);
  } catch (err) {
    console.error('Erro ao forçar reset:', err);
    process.exit(1);
  }
})();
