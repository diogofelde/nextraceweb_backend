import { body } from 'express-validator';

export const loginValidator = [
    body('identificador')
        .isEmail()
        .withMessage('O identificador deve ser um e-mail válido'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('A senha deve ter pelo menos 6 caracteres')
];