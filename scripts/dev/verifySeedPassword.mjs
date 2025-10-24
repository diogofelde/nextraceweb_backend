import sequelize from '../../config/database.js';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao banco (verify)');
    const user = await User.findOne({ where: { username: 'testuser' } });
    if (!user) {
      console.error('Usuário testuser não encontrado');
      process.exit(2);
    }
    const match = await bcrypt.compare('Test@123', user.password);
    console.log('Usuário encontrado:', { id: user.id, username: user.username, email: user.email });
    console.log("Senha 'Test@123' corresponde ao hash?", match);
    process.exit(match ? 0 : 1);
  } catch (err) {
    console.error('Erro verifySeedPassword:', err);
    process.exit(3);
  }
})();
