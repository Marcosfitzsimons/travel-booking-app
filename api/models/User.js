import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    addressCda: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    addressCapital: {
        type: String
    },
    image: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
},
    { timestamps: true }
);

export default mongoose.model('User', UserSchema)