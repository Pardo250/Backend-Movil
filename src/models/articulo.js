import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Articulo = sequelize.define('Articulo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagenUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'articulos',
});

export default Articulo;
