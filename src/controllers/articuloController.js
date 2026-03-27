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

// CREATE
export const createArticulo = async (req, res) => {
  try {
    const { titulo, descripcion, tipo } = req.body;

    if (!titulo || !tipo) {
      return res.status(400).json({ message: "Faltan datos requeridos (titulo, tipo)" });
    }

    const articulo = await Articulo.create({ titulo, descripcion, tipo });

    res.status(201).json(articulo);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateArticulo = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, tipo } = req.body;

    const articulo = await Articulo.findByPk(id);

    if (!articulo) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }

    articulo.titulo = titulo ?? articulo.titulo;
    articulo.descripcion = descripcion ?? articulo.descripcion;
    articulo.tipo = tipo ?? articulo.tipo;

    await articulo.save();

    res.json(articulo);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteArticulo = async (req, res) => {
  try {
    const { id } = req.params;

    const articulo = await Articulo.findByPk(id);

    if (!articulo) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }

    await articulo.destroy();

    res.json({ message: "Articulo eliminado" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
