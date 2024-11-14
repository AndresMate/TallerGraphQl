import gql from 'graphql-tag';

const typeDefs = gql`
    type Libro {
        id: ID!
        titulo: String!
        autor: String!
    }

    type Query {
        libros: [Libro]
    }

    type Mutation {
        agregarLibro(titulo: String!, autor: String!): Libro
    }
`;

export default typeDefs;