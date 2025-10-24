const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const dbPath = './database.sqlite';
const db = new sqlite3.Database(dbPath);

const users = [
  {
    username: 'admin',
    password: 'admin123',
    email: 'admin@nextrace.com',
    acesso: 'admin'
  },
  {
    username: 'useremail',
    password: 'user123',
    email: 'user@nextrace.com',
    acesso: 'user'
  }
];

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      email TEXT,
      acesso TEXT
    )`);

  // tabela para tokens de reset de senha
  db.run(`CREATE TABLE IF NOT EXISTS password_resets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    token TEXT UNIQUE,
    expires_at INTEGER
  )`);

    users.forEach(user => {
      const password_hash = bcrypt.hashSync(user.password, 10);
      db.run(
        `INSERT INTO user (username, password, email, acesso) VALUES (?, ?, ?, ?)`,
        [user.username, password_hash, user.email, user.acesso],
        function (err) {
          if (err) {
            console.error(`Erro ao inserir usuário ${user.username}:`, err.message);
          } else {
            console.log(`Usuário ${user.username} criado com sucesso!`);
          }
        }
      );
    });
    db.close();
  });
