import mongoose from "mongoose";

const PassengerSchema = new mongoose.Schema({
    // to get user info
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, {
    timestamps: true,
})

export default mongoose.model('Passenger', PassengerSchema)