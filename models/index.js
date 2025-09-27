import sequelize from '../config/database.js';
import User from './User.js';

// Aqui você pode importar e registrar outros modelos futuramente
// import Team from './Team.js';
// import Permission from './Permission.js';

const db = {};
db.sequelize = sequelize;
db.User = User;

// Exporta os modelos individualmente e o objeto db
export { sequelize, User };
export default db;