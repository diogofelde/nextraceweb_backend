import express from 'express';
import loginController from '../controllers/loginController.js';

const router = express.Router();

// Rota POST /login
router.post('/login', loginController.login);

export default router;