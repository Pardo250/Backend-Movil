import { Articulo } from '../models/index.js';

export const getAllArticulos = async (req, res) => {
  try {
    const articulos = await Articulo.findAll();
    res.status(200).json({
      success: true,
      data: articulos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getArticuloById = async (req, res) => {
  try {
    const { id } = req.params;
    const articulo = await Articulo.findByPk(id);

    if (!articulo) {
      return res.status(404).json({
        success: false,
        message: 'Artículo no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: articulo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
