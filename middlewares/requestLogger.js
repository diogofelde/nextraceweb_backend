import morgan from 'morgan';
import logger from '../utils/logger.js';

// 🔁 Redireciona os logs do Morgan para o Winston
const stream = {
    write: (message) => logger.info(message.trim())
};

// 📋 Middleware de log de requisições
export const requestLogger = morgan('combined', { stream });