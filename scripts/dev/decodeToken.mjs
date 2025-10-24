import jwt from 'jsonwebtoken';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyZW1haWwiLCJhY2Vzc28iOiJ1c2VyIiwiaWF0IjoxNzYwNzU5MjExLCJleHAiOjE3NjA4NDU2MTF9.sf85oKV9gVinV5OZwnL_AWmL_wN2CJ7sfBDfYpu70Jg';

console.log('Decodificando token (sem verificar):');
console.log(jwt.decode(token));

const secretsToTry = [process.env.JWT_SECRET, 'segredoPadrao'].filter(Boolean);

for (const s of secretsToTry) {
  try {
    console.log(`\nTentando verificar com segredo: "${s}"`);
    const verified = jwt.verify(token, s);
    console.log('Verificação OK, payload:', verified);
  } catch (err) {
    console.error('Erro ao verificar com esse segredo:', err.message);
  }
}

process.exit(0);
