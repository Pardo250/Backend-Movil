import express from 'express';
import { getAllUsuarios, getUsuarioById } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', getAllUsuarios);
router.get('/:id', getUsuarioById);

export default router;
