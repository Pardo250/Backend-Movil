import { Usuario } from '../models/index.js';

export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json({
      success: true,
      data: usuarios,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: usuario,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE
export const createUsuario = async (req, res) => {
  try {
    const { nombre, email } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const usuario = await Usuario.create({ nombre, email });
    res.status(201).json(usuario);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email } = req.body;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    usuario.nombre = nombre ?? usuario.nombre;
    usuario.email = email ?? usuario.email;

    await usuario.save();

    res.json(usuario);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await usuario.destroy();

    res.json({ message: "Usuario eliminado" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
