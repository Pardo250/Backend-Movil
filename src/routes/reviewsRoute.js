import express from 'express';
import {
  createReview,
  getAllReviewsByArticulo,
  getAllReviewsByUsuario,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', createReview);
router.get('/articulo/:articuloId', getAllReviewsByArticulo);
router.get('/usuario/:usuarioId', getAllReviewsByUsuario);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;
