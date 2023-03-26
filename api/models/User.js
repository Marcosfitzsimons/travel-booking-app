import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Por favor, escribí tu username.'],
        minLength: 3,
        maxLength: 15,
        unique: true,
    },
    fullName: {
        type: String,
        minLength: 3,
        maxLength: 25,
        required: [true, 'Por favor, escribí tu nombre completo.']
    },
    email: {
        type: String,
        required: [true, 'Por favor, escribí tu email.'],
        minLength: 3,
        maxLength: 40,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Por favor, escribí un email válido.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Por favor, escribí tu contraseña.'],
        minLength: 3,
    },
    addressCda: {
        type: String,
        required: [true, 'Por favor, escribí tu dirreción (Carmen de Areco).'],
        minLength: 3,
        maxLength: 40,
    },
    addressCapital: {
        type: String,
        required: [true, 'Por favor, escribí tu dirreción (Capital).'],
        minLength: 3,
        maxLength: 40,
    },
    phone: {
        type: Number,
        required: [true, 'Por favor, escribí tu número celular.'],
    },
    image: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    myTrips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    }]
},
    { timestamps: true }
);

export default mongoose.model('User', UserSchema)