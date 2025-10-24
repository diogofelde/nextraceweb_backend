// backend/config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path, { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Força caminho absoluto para sqlite no root do workspace se não houver DATABASE_URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaultSqlitePath = resolve(__dirname, '..', 'database.sqlite');
// Resolve DATABASE_URL garantindo caminho absoluto para sqlite quando necessário
let databaseUrl = process.env.DATABASE_URL || process.env.DB_URL;
if (!databaseUrl) {
    databaseUrl = `sqlite:${defaultSqlitePath}`;
} else if (String(databaseUrl).startsWith('sqlite:')) {
    const sqlitePath = String(databaseUrl).replace(/^sqlite:/, '');
    if (!path.isAbsolute(sqlitePath)) {
        // resolve relative sqlite path against this config directory
        databaseUrl = `sqlite:${resolve(__dirname, '..', sqlitePath)}`;
    } else {
        databaseUrl = `sqlite:${sqlitePath}`;
    }
}

const isSqlite = String(databaseUrl).startsWith('sqlite');

let sequelize;
if (isSqlite) {
    // quando sqlite, passe explicitamente o caminho do arquivo via storage
    const sqliteFile = String(databaseUrl).replace(/^sqlite:/, '');
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: sqliteFile,
        logging: false
    });
} else {
    sequelize = new Sequelize(databaseUrl, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
}

sequelize.authenticate()
    .then(() => console.log('✅ Conectado ao banco com sucesso'))
    .catch(err => console.error('❌ Erro ao conectar ao banco:', err));

export default sequelize;