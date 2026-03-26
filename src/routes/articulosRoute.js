import express from 'express';
import { getAllArticulos, getArticuloById } from '../controllers/articuloController.js';

const router = express.Router();

router.get('/', getAllArticulos);
router.get('/:id', getArticuloById);

export default router;

