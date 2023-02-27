import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema({
    seatNumber: {
        type: Number,
        required: true,
    },
    price: { // special trip or daily trips.
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
})

export default mongoose.model('Seat', SeatSchema)