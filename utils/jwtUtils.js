import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Garante que dotenv seja carregado
dotenv.config();

/**
 * Obtém a lista de segredos JWT válidos.
 * O primeiro segredo é usado para criar novos tokens.
 * @returns {string[]} Lista de segredos JWT
 */
export function getJwtSecrets() {
    // Se JWT_SECRETS existir, use-o como lista CSV
    if (process.env.JWT_SECRETS) {
        return process.env.JWT_SECRETS.split(',').map(s => s.trim());
    }
    
    // Fallback para JWT_SECRET único ou segredo padrão
    const secret = process.env.JWT_SECRET || 'segredoPadrao';
    return [secret];
}

/**
 * Assina um payload com o segredo JWT principal (primeiro da lista)
 * @param {object} payload Dados a serem assinados
 * @param {object} options Opções do JWT
 * @returns {string} Token assinado
 */
export function signToken(payload, options = {}) {
    const secrets = getJwtSecrets();
    return jwt.sign(payload, secrets[0], options);
}

/**
 * Tenta verificar um token com cada segredo disponível
 * @param {string} token Token JWT a ser verificado
 * @returns {object} Payload decodificado ou throw se inválido
 */
export function verifyToken(token) {
    const secrets = getJwtSecrets();
    let lastError;

    for (const secret of secrets) {
        try {
            return jwt.verify(token, secret);
        } catch (err) {
            lastError = err;
            // Continue tentando próximo segredo
        }
    }

    // Se chegou aqui, nenhum segredo funcionou
    throw lastError;
}