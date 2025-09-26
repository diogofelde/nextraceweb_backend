const fs = require('fs');
function logErro(mensagem) {
    const linha = `[${new Date().toISOString()}] ${mensagem}\n`;
    fs.appendFileSync('logs/erros.log', linha);
}