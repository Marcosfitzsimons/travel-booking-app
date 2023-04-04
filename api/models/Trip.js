import mongoose from "mongoose";
import Passenger from "./Passenger.js";

const TripSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ingresa nombre del viaje.']
    },
    date: {
        type: Date,
        required: [true, 'Ingresa fecha del viaje.']
    },
    from: {
        type: String,
        required: [true, 'Ingresa ubicación de partida del viaje.']
    },
    to: {
        type: String,
        required: [true, 'Ingresa ubicación de llegada del viaje.']
    },
    departureTime: {
        type: String,
        required: [true, 'Ingresa horario de salida del viaje.']
    },
    arrivalTime: {
        type: String,
        required: [true, 'Ingresa horario de llegada del viaje.']
    },
    price: {
        type: Number,
        required: [true, 'Ingresa precio del viaje.']
    },
    maxCapacity: {
        type: Number,
        required: [true, 'Ingresa capacidad maxima del viaje.']
    },
    available: {
        type: Boolean,
        default: true,
    },
    passengers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Passenger'
    }]

})

export default mongoose.model('Trip', TripSchema)