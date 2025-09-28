import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(process.env.CRYPTO_SECRET, 'salt', 32);
const iv = Buffer.alloc(16, 0); // IV fixo — veja observações abaixo

export function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}

export function decrypt(encrypted) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
}