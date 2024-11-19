import mongoose from 'mongoose';

const AirportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
});

const Airport = mongoose.model('Airport', AirportSchema);

export default Airport;