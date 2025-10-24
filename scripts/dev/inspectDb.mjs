import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = resolve(__dirname, '..', 'database.sqlite');

(async () => {
  try {
    const db = await open({ filename: dbPath, driver: sqlite3.Database });
    const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
    console.log('Tables:', tables.map(t => t.name));
    const users = await db.all('SELECT id, username, email FROM user');
    console.log('Users:', users);
    const resets = await db.all('SELECT * FROM password_resets');
    console.log('Password resets:', resets);
    await db.close();
  } catch (err) {
    console.error('Erro lendo DB:', err);
    process.exit(1);
  }
})();
