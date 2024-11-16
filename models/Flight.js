import mongoose from 'mongoose';

const FlightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true,
        unique: true
    },
    airline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Airline',
        required: true
    },
    departureAirport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Airport',
        required: true
    },
    arrivalAirport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Airport',
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'active', 'completed', 'cancelled'],
        default: 'scheduled'
    }
});

const Flight = mongoose.model('Flight', FlightSchema);

export default Flight;
