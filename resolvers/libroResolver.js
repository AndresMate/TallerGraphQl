import Libro from '../models/Libro.js';

const resolvers = {
    Query: {
        libros: async () => {
            return await Libro.find();
        },
    },
    Mutation: {
        agregarLibro: async (_, { titulo, autor }) => {
            const nuevoLibro = new Libro({ titulo, autor });
            return await nuevoLibro.save();
        },
    },
};

export default resolvers;