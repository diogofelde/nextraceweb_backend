import sequelize from '../../config/database.js';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

(async () => {
  try {
    await sequelize.sync();
    const u = await User.findOne({ where: { username: 'testuser' } });
    if (!u) {
      console.log('Usuário não encontrado');
      process.exit(1);
    }
    console.log('Usuário encontrado:', { id: u.id, username: u.username, email: u.email });
    const match = await bcrypt.compare('Test@123', u.password);
    console.log('Senha Test@123 corresponde ao hash?', match);
    const matchNew = await bcrypt.compare('NewPass@123', u.password);
    console.log('Senha NewPass@123 corresponde ao hash?', matchNew);
    process.exit(0);
  } catch (err) {
    console.error('Erro:', err);
    process.exit(1);
  }
})();
