import Flight from "../models/Flight.js";
import Airline from "../models/Airline.js";
import Airport from "../models/Airport.js";

const resolvers = {
    Query: {
        flights: async () => await Flight.find(),
        airlines: async () => await Airline.find(),
        findFlightById: async (parent, args) => await Flight.findById(args.id),
        findAirlineByIATA: async (parent, args) => await Airline.findOne({ IATA: args.IATA }),
        findFlightsByAirline: async (parent, args) => await Flight.find({ airline: args.airlineId }),
        findFlightsBetweenAirports: async (parent, args) => {
            return await Flight.find({
                departureAirport: args.departureAirportId,
                arrivalAirport: args.arrivalAirportId
            });
        },
    },

    Mutation: {
        createFlight: async (parent, { input }) => {
            const { airline, departureAirport, arrivalAirport, ...flightData } = input;

            const existingAirline = await Airline.findById(airline);
            if (!existingAirline) {
                throw new Error("Airline not found");
            }

            const departure = await Airport.findById(departureAirport);
            if (!departure) {
                throw new Error("Departure airport not found");
            }

            const arrival = await Airport.findById(arrivalAirport);
            if (!arrival) {
                throw new Error("Arrival airport not found");
            }

            if (departureAirport === arrivalAirport) {
                throw new Error("Departure and arrival airports must be different");
            }

            const newFlight = new Flight({
                ...flightData,
                airline,
                departureAirport,
                arrivalAirport,
            });

            return await newFlight.save();
        },

        createAirline: async (parent, { input }) => {
            const newAirline = new Airline(input);
            return await newAirline.save();
        },

        updateFlight: async (parent, { id, input }) => {
            return await Flight.findByIdAndUpdate(id, input, { new: true });
        },
        deleteFlight: async (parent, { id }) => {
            const flight = await Flight.findByIdAndDelete(id);
            if (!flight) throw new Error('Flight not found');
            return flight;
        },

        updateAirline: async (parent, { id, input }) => {
            return await Airline.findByIdAndUpdate(id, input, { new: true });
        },
        deleteAirline: async (parent, { id }) => {
            const airline = await Airline.findByIdAndDelete(id);
            if (!airline) throw new Error('Airline not found');
            return airline;
        },
    },
};

export default resolvers;