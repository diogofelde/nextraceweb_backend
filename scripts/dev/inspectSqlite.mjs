import { promises as fs } from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '..', '..', 'database.sqlite');

(async ()=>{
  try{
    const stat = await fs.stat(dbPath);
    console.log('DB path:', dbPath);
    console.log('Size (bytes):', stat.size);
    console.log('MTime:', stat.mtime);

    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
      if(err) return console.error('Erro abrir sqlite:', err.message);
    });

    db.serialize(()=>{
      db.all("SELECT name, type FROM sqlite_master WHERE type IN ('table','index')", [], (err, rows)=>{
        if(err) { console.error('Erro listar sqlite_master', err); return; }
        console.log('sqlite_master rows:', rows);
      });

      db.all('SELECT id, username, email, acesso FROM user', [], (err, rows)=>{
        if(err) { console.error("Erro selecionar da tabela 'user':", err.message); } else {
          console.log('Users in sqlite user table:', rows);
        }
      });
    });

    // wait a moment for outputs
    setTimeout(()=>{ db.close(); }, 500);
  }catch(err){
    console.error('Erro inspectSqlite:', err);
    process.exit(1);
  }
})();