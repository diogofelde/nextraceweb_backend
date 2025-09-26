import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import sequelize from '../config/database.js';

await sequelize.sync();

const passwordHash = bcrypt.hashSync('senha123', 10);

await User.create({
    username: 'admin',
    passwordHash
});

console.log(' Usuário criado com sucesso');
process.exit();
