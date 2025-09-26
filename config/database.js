import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nextrace_db', 'usuario', 'senha', {
    host: 'localhost',
    dialect: 'postgres'
});

export default sequelize;
