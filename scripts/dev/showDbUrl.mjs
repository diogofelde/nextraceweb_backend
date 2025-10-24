import path, { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const defaultSqlitePath = resolve(__dirname, '..', '..', 'database.sqlite');
const envDb = process.env.DATABASE_URL || process.env.DB_URL;
let databaseUrl;
if (!envDb) databaseUrl = `sqlite:${defaultSqlitePath}`;
else if (String(envDb).startsWith('sqlite:')) {
  const sqlitePath = String(envDb).replace(/^sqlite:/, '');
  if (!path.isAbsolute(sqlitePath)) databaseUrl = `sqlite:${resolve(__dirname, '..', '..', sqlitePath)}`;
  else databaseUrl = `sqlite:${sqlitePath}`;
} else databaseUrl = envDb;

console.log('process.cwd():', process.cwd());
console.log('env DATABASE_URL:', process.env.DATABASE_URL);
console.log('resolved databaseUrl:', databaseUrl);
console.log('defaultSqlitePath:', defaultSqlitePath);
