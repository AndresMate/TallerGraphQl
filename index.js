import 'dotenv/config';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServer } from '@apollo/server';
import conectarDB from './config/database.js';
import typeDefs from './schema/typeDefs.js';
import resolvers from './resolvers/Resolves.js';

// Conectar a MongoDB
conectarDB();

// Configurar Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Iniciar el servidor
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`Servidor listo en ${url}`);