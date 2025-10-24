import createApp from './app.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 3000;

(async () => {
    const app = await createApp();
    app.listen(port, () => {
        console.log(`🚀 Servidor rodando na porta ${port}`);
    });
})();