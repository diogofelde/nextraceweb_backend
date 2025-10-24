import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    acesso: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'user',      // Nome da tabela no banco
    timestamps: false        // Desativa createdAt e updatedAt
});

export default User;