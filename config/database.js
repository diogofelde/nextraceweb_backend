// backend/config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Validação da variável de ambiente
if (!process.env.DB_URL) {
  throw new Error('❌ Variável DB_URL não definida. Verifique as configurações no Render.');
}

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// Exporta a instância sem autenticar aqui
export default sequelize;
