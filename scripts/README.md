# Scripts (dev)

Arquivos de utilitários e testes estão em `scripts/dev/`.

Principais scripts:

- `checkPassword.mjs` — Verifica hashes de senha do usuário `testuser`.
- `forceResetPassword.mjs` — Força reset de senha para `Test@123`.
- `forceSeedPassword.mjs` — Regrava hash de `testuser` para `Test@123`.
- `inspectDb.mjs` — Inspeção rápida das tabelas do sqlite.
- `seedTestUser.mjs` / `seedTestUser.cjs` — Cria/garante o usuário `testuser`.
- `testFlowInProcess.mjs` — E2E in-process (supertest) para login -> forgot -> reset -> login.
- `testFlow.mjs`, `testFlow2.mjs`, `test-api.js` — alternativas de teste via HTTP (requer backend rodando em `localhost:3000`).

Como rodar (PowerShell):

```powershell
# Exemplo: rodar o E2E in-process
node scripts/dev/testFlowInProcess.mjs

# Exemplo: inspecionar DB
node scripts/dev/inspectDb.mjs

# Exemplo: forçar senha seed para 'Test@123'
node scripts/dev/forceSeedPassword.mjs
```

Observações:

- Esses scripts são para desenvolvimento e testes locais. Não os exponha em produção.
- Mantenha o arquivo `database.sqlite` na raiz do backend (configurado em `config/database.js`).
