import mongoose from "mongoose";

const PassengerSchema = new mongoose.Schema({
    // to get user info
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    },
    fullName: {
        type: String,
        required: true
    },
    addressCda: {
        type: String,
        required: true
    },
    addressCapital: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

export default mongoose.model('Passenger', PassengerSchema)