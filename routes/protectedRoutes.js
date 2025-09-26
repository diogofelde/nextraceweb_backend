import express from 'express';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { verificarPermissao } from '../middlewares/permissionMiddleware.js';

const router = express.Router();

router.get('/me', verificarToken, (req, res) => {
  res.json({ usuario: req.usuario });
});

router.get('/admin/dashboard',
  verificarToken,
  verificarPermissao('admin'),
  (req, res) => {
    res.json({ message: \Bem-vindo ao painel admin, \\ });
  }
);

export default router;
