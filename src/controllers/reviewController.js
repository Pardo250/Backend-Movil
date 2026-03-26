import { Review, Usuario, Articulo } from '../models/index.js';

export const createReview = async (req, res) => {
  try {
    const { contenido, calificacion, usuarioId, articuloId } = req.body;

    if (!contenido || !calificacion || !usuarioId || !articuloId) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos',
      });
    }

    const usuario = await Usuario.findByPk(usuarioId);
    const articulo = await Articulo.findByPk(articuloId);

    if (!usuario || !articulo) {
      return res.status(404).json({
        success: false,
        message: 'Usuario o artículo no encontrado',
      });
    }

    const review = await Review.create({
      contenido,
      calificacion,
      usuarioId,
      articuloId,
    });

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllReviewsByArticulo = async (req, res) => {
  try {
    const { articuloId } = req.params;

    const reviews = await Review.findAll({
      where: { articuloId },
      include: [
        { model: Usuario, attributes: ['id', 'nombre', 'email'] },
        { model: Articulo, attributes: ['id', 'titulo', 'tipo'] },
      ],
    });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllReviewsByUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const reviews = await Review.findAll({
      where: { usuarioId },
      include: [
        { model: Usuario, attributes: ['id', 'nombre', 'email'] },
        { model: Articulo, attributes: ['id', 'titulo', 'tipo'] },
      ],
    });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { contenido, calificacion } = req.body;

    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review no encontrado',
      });
    }

    await review.update({
      contenido: contenido || review.contenido,
      calificacion: calificacion || review.calificacion,
    });

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review no encontrado',
      });
    }

    await review.destroy();

    res.status(200).json({
      success: true,
      message: 'Review eliminado correctamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
