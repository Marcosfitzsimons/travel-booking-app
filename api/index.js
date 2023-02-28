import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import tripsRoute from './routes/trips.js'
import seatsRoute from './routes/seats.js'

const app = express()
dotenv.config()

// ignore warning
mongoose.set('strictQuery', false)

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to mongoDB.')
    } catch (error) {
        throw error
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected')
})

// middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use((req, res, next) => {
    console.log("Hello from middleware")
    next()
})

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/trips", tripsRoute)
app.use("/api/seats", seatsRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(8800, () => {
    connect()
    console.log('Connected to backend!')
})