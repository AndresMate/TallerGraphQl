const typeDefs = `#graphql
    type Airplane {
        id: ID!
        model: String!
        manufacturer: String!
        capacity: Int!
        range: Int!
        airport: ID!
    }

    type Airport {
        id: ID!
        name: String!
        city: String!
        country: String!
        code: String!
    }

    input AirplaneInput {
        model: String!
        manufacturer: String!
        capacity: Int!
        range: Int!
        airport: ID!
    }

    input AirportInput {
        name: String!
        city: String!
        country: String!
        code: String!
    }

    type Query {
        airplanes: [Airplane!]!
        airports: [Airport!]!
        findAirplaneById(id: ID!): Airplane
        findAirportByCode(code: String!): Airport
        findAirplanesByAirport(airportId: ID!): [Airplane!]!
    }

    type Mutation {
        createAirplane(input: AirplaneInput!): Airplane
        createAirport(input: AirportInput!): Airport
        updateAirplane(id: ID!, input: AirplaneInput!): Airplane
        deleteAirplane(id: ID!): Airplane
        updateAirport(id: ID!, input: AirportInput!): Airport
        deleteAirport(id: ID!): Airport
    }
`;

export default typeDefs;
