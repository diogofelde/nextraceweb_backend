import express from 'express';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/segredo', verificarToken, (req, res) => {
    res.json({ mensagem: `Bem-vindo, usuário ${req.usuario.id}. Aqui está o conteúdo secreto.` });
});

export default router;