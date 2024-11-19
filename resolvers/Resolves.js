import Flight from "../models/Flight.js";
import Airline from "../models/Airline.js";
import Airport from "../models/Airport.js";

const resolvers = {
  Query: {
      // Obtener todos los vuelos
      flights: async () => { const flights = await Flight.find(); return flights.map(flight => ({ ...flight.toObject(), departureTime: flight.departureTime.toISOString(), arrivalTime: flight.arrivalTime.toISOString() })); },
      
      airports: async () => await Airport.find(),
      findAirportByCode: async (parent, args) => await Airport.findOne({ code: args.code }),

      // Obtener todas las aerolíneas
      airlines: async () => await Airline.find(),
      
      // Buscar un vuelo por ID
      findFlightById: async (parent, args) => await Flight.findById(args.id),
      
      // Buscar una aerolínea por código IATA
      findAirlineByIATA: async (parent, args) => await Airline.findOne({ IATA: args.IATA }),

      // Buscar vuelos por aerolínea
      findFlightsByAirline: async (parent, args) => await Flight.find({ airline: args.airlineId }),

      // Buscar vuelos entre dos aeropuertos
      findFlightsBetweenAirports: async (parent, args) => {
          return await Flight.find({
              departureAirport: args.departureAirportId,
              arrivalAirport: args.arrivalAirportId
          });
      },
  },

  Mutation: {
      // Crear un nuevo vuelo
      createFlight: async (parent, { input }) => {
        const { airline, departureAirport, arrivalAirport, ...flightData } = input;
      
        // Validar si la aerolínea existe
        const existingAirline = await Airline.findById(airline);
        if (!existingAirline) {
          throw new Error("Airline not found");
        }
      
        // Validar si el aeropuerto de salida existe
        const departure = await Airport.findById(departureAirport);
        if (!departure) {
          throw new Error("Departure airport not found");
        }
      
        // Validar si el aeropuerto de llegada existe
        const arrival = await Airport.findById(arrivalAirport);
        if (!arrival) {
          throw new Error("Arrival airport not found");
        }
      
        // Validar que el aeropuerto de salida y llegada no sean iguales
        if (departureAirport === arrivalAirport) {
          throw new Error("Departure and arrival airports must be different");
        }
      
        // Crear el vuelo
        const newFlight = new Flight({
          ...flightData,
          airline,
          departureAirport,
          arrivalAirport,
        });
      
        return await newFlight.save();
      },
          
      // Crear una nueva aerolínea
      createAirline: async (parent, { input }) => {
          const newAirline = new Airline(input);
          return await newAirline.save();
      },

      // Actualizar y eliminar vuelos
      updateFlight: async (parent, { id, input }) => {
          return await Flight.findByIdAndUpdate(id, input, { new: true });
      },
      deleteFlight: async (parent, { id }) => {
          const flight = await Flight.findByIdAndDelete(id);
          if (!flight) throw new Error('Flight not found');
          return flight;
      },

      // Actualizar y eliminar aerolíneas
      updateAirline: async (parent, { id, input }) => {
          return await Airline.findByIdAndUpdate(id, input, { new: true });
      },
      deleteAirline: async (parent, { id }) => {
          const airline = await Airline.findByIdAndDelete(id);
          if (!airline) throw new Error('Airline not found');
          return airline;
      },

       // Adicionar aeropuerto
       createAirport: async (parent, { input }) => {
        const newAirport = new Airport(input);
        return await newAirport.save();
    },
    updateAirport: async (parent, { id, input }) => {
        return await Airport.findByIdAndUpdate(id, input, { new: true });
    },
    deleteAirport: async (parent, { id }) => {
        const airport = await Airport.findByIdAndDelete(id);
        if (!airport) throw new Error('Airport not found');
        return airport;
    },
  },
};

export default resolvers;
