import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

<<<<<<< HEAD
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false // Desativa logs SQL no console
});
=======
const sequelize = new Sequelize(
  process.env.DB_NAME || 'nextrace_db',
  process.env.DB_USER || 'usuario',
  process.env.DB_PASSWORD || 'senha',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false, // desativa logs SQL no console
  }
);
>>>>>>> 86cf59ce9768abf29a184d7e493dee1fd8ebc3e2

export default sequelize;