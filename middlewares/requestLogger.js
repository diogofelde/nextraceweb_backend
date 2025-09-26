import morgan from 'morgan';
import logger from '../utils/logger.js';

const stream = {
  write: (message) => logger.info(message.trim())
};

export const requestLogger = morgan('combined', { stream });
