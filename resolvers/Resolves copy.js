import Airplane from "../models/Airplane.js";
import Airport from "../models/Airport.js";

const resolvers = {
  Query: {
      airplanes: async () => await Airplane.find(),
      airports: async () => await Airport.find(),
      findAirplaneById: async (parent, args) => await Airplane.findById(args.id),
      findAirportByCode: async (parent, args) => await Airport.findOne({ code: args.code }),
      findAirplanesByAirport: async (parent, args) => await Airplane.find({ airport: args.airportId }),
  },

  Mutation: {
      // Adicionar avión
      createAirplane: async (parent, { input }) => {
          const newAirplane = new Airplane(input);
          return await newAirplane.save();
      },
      // Adicionar aeropuerto
      createAirport: async (parent, { input }) => {
          const newAirport = new Airport(input);
          return await newAirport.save();
      },

      // Actualizar y eliminar
      updateAirplane: async (parent, { id, input }) => {
          return await Airplane.findByIdAndUpdate(id, input, { new: true });
      },
      deleteAirplane: async (parent, { id }) => {
          const airplane = await Airplane.findByIdAndDelete(id);
          if (!airplane) throw new Error('Airplane not found');
          return airplane;
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
