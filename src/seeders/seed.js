import { Usuario, Articulo } from '../models/index.js';

export const seedDatabase = async () => {
    try {
        const userCount = await Usuario.count();
        if (userCount === 0) {
            await Usuario.bulkCreate([
                { nombre: 'Juan Perez', email: 'juan@example.com' },
                { nombre: 'Maria Gomez', email: 'maria@example.com' },
                { nombre: 'Carlos Ruiz', email: 'carlos@example.com' }
            ]);
            console.log('✅ Usuarios cargados en la base de datos.');
        }

        const articleCount = await Articulo.count();
        if (articleCount === 0) {
            await Articulo.bulkCreate([
                { titulo: 'Inception', descripcion: 'A thief who steals corporate secrets through the use of dream-sharing technology.', tipo: 'pelicula' },
                { titulo: 'Interstellar', descripcion: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', tipo: 'pelicula' },
                { titulo: 'The Matrix', descripcion: 'A computer hacker learns from mysterious rebels about the true nature of his reality.', tipo: 'pelicula' }
            ]);
            console.log('✅ Articulos cargados en la base de datos.');
        }

    } catch (error) {
        console.error('❌ Error al seedear la base de datos:', error);
    }
};
