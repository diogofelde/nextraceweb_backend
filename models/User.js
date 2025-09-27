import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
    username: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    team: DataTypes.STRING,
    permissions: DataTypes.JSON
});

export default User;