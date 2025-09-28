import winston from 'winston';
import fs from 'fs';
import path from 'path';

// 🔧 Garante que a pasta logs exista
const logDir = path.resolve('logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// 🎯 Criação do logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(logDir, 'app.log') }),
        new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' })
    ]
});

export default logger;