import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = resolve(__dirname, '..', '..', 'database.sqlite');

(async ()=>{
  const db = await open({ filename: dbPath, driver: sqlite3.Database });
  const row = await db.get('SELECT id, username, email, password FROM user WHERE username = ?', ['testuser']);
  console.log('row:', row);
  if(row){
    const match = await bcrypt.compare('Test@123', row.password);
    console.log('bcrypt compare result:', match);
  }
  await db.close();
})();