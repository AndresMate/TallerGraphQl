import Airport from "../models/Airport.js";

const resolvers = {
  Query: {
      airports: async () => await Airport.find(),
      findAirportByCode: async (parent, args) => await Airport.findOne({ code: args.code }),
  },

  Mutation: {
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
