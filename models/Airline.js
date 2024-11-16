import mongoose from 'mongoose';

const AirlineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    IATA: {
        type: String,
        required: true,
        unique: true
    },
    ICAO: {
        type: String,
        required: true,
        unique: true
    },
    callsign: {
        type: String,
        required: true
    }
});

const Airline = mongoose.model('Airline', AirlineSchema);

export default Airline;