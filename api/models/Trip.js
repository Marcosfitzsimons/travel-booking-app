import mongoose from "mongoose";

const TripSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: { // special trip or daily trips.
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    departureTime: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    returnTime: {
        type: String,
    },
    roundTrip: {
        type: Boolean,
        default: false,
    },
    maxCapacity: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
    seats: {
        type: [String]
    }
})

export default mongoose.model('Trip', TripSchema)