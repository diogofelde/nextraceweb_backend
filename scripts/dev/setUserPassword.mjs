import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = resolve(__dirname, '..', '..', 'database.sqlite');

const username = process.argv[2] || 'testuser';
const newPassword = process.argv[3] || 'Test@123';

(async ()=>{
  const db = await open({ filename: dbPath, driver: sqlite3.Database });
  const hashed = await bcrypt.hash(newPassword, 10);
  const res = await db.run('UPDATE user SET password = ? WHERE username = ?', [hashed, username]);
  console.log('Updated rows:', res.changes);
  const row = await db.get('SELECT id, username, email, password FROM user WHERE username = ?', [username]);
  console.log('Row after update:', { id: row.id, username: row.username, email: row.email, password: row.password });
  const match = await bcrypt.compare(newPassword, row.password);
  console.log('bcrypt compare result:', match);
  await db.close();
})();