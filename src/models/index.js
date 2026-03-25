import sequelize from '../config/database.js';
import Usuario from './usuario.js';
import Articulo from './articulo.js';
import Review from './review.js';

// Definir relaciones
Usuario.hasMany(Review, {
  foreignKey: 'usuarioId',
  onDelete: 'CASCADE',
});

Articulo.hasMany(Review, {
  foreignKey: 'articuloId',
  onDelete: 'CASCADE',
});

Review.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
});

Review.belongsTo(Articulo, {
  foreignKey: 'articuloId',
});

export { sequelize, Usuario, Articulo, Review };
