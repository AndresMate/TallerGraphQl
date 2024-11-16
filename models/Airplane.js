import mongoose from 'mongoose';

const AirplaneSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    range: {
        type: Number,
        required: true
    },
    airport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Airport',
        required: true
    }
});

const Airplane = mongoose.model('Airplane', AirplaneSchema);

export default Airplane;
