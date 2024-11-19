const typeDefs = `#graphql
    type Flight {
        id: ID!
        flightNumber: String!
        airline: ID!
        departureAirport: ID!
        arrivalAirport: ID!
        departureTime: String!
        arrivalTime: String!
        status: String!
    }

    type Airport {
        id: ID!
        name: String!
        city: String!
        country: String!
        code: String!
    }

    type Airline {
        id: ID!
        name: String!
        country: String!
        IATA: String!
        ICAO: String!
        callsign: String!
    }

    input FlightInput {
        flightNumber: String!
        airline: ID!
        departureAirport: ID!
        arrivalAirport: ID!
        departureTime: String!
        arrivalTime: String!
        status: String!
    }

    input AirlineInput {
        name: String!
        country: String!
        IATA: String!
        ICAO: String!
        callsign: String!
    }

    input AirportInput {
        name: String!
        city: String!
        country: String!
        code: String!
    }

    type Query {
        flights: [Flight!]!
        airlines: [Airline!]!
        findFlightById(id: ID!): Flight
        findAirlineByIATA(IATA: String!): Airline
        findFlightsByAirline(airlineId: ID!): [Flight!]!
        findFlightsBetweenAirports(departureAirportId: ID!, arrivalAirportId: ID!): [Flight!]!

        airports: [Airport!]!
        findAirportByCode(code: String!): Airport
    }

    type Mutation {
        createFlight(input: FlightInput!): Flight
        createAirline(input: AirlineInput!): Airline
        updateFlight(id: ID!, input: FlightInput!): Flight
        deleteFlight(id: ID!): Flight
        updateAirline(id: ID!, input: AirlineInput!): Airline
        deleteAirline(id: ID!): Airline

        createAirport(input: AirportInput!): Airport
        updateAirport(id: ID!, input: AirportInput!): Airport
        deleteAirport(id: ID!): Airport
    }
`;

export default typeDefs;
