import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_master: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'users',      // Nome da tabela no banco
  schema: 'public',        // Schema padrão do PostgreSQL
  timestamps: false        // Desativa createdAt e updatedAt
});

export default User;