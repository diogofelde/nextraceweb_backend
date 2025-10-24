import express from 'express';
import authController from '../controllers/authController.js';
import autenticar from '../middlewares/auth.js';

const router = express.Router();

// 🔐 Login
router.post('/login', authController.login);
// Recuperação de senha
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// 👤 Rota protegida
router.get('/me', autenticar, (req, res) => {
  res.json({ usuario: req.usuario });
});

export default router;