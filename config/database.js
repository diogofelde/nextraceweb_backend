// config/database.js

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Debug temporário (remova depois de confirmar funcionamento)
console.log('DATABASE_URL_PRESENT:', !!process.env.DATABASE_URL);
console.log('DATABASE_URL_PREFIX:', (process.env.DATABASE_URL || '').slice(0, 40));

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // necessário para Render
    }
  },
  logging: false
});

export default sequelize;