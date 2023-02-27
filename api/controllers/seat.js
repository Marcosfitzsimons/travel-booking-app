import Seat from '../models/Seat.js'
import Trip from '../models/Trip.js'
import { createError } from '../utils/error.js'

export const createSeat = async (req, res, next) => {

    const tripId = req.params.tripid;
    const newSeat = new Seat(req.body)

    try {
        const savedSeat = await newSeat.save()
        try {
            await Trip.findByIdAndUpdate(tripId, {
                $push: { seats: savedSeat._id },
            })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedSeat)
    } catch (err) {
        next(err)
    }
}


export const updateSeat = async (req, res, next) => {
    try {
        const updatedSeat = await Seat.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedSeat)
    } catch (err) {
        next(err)
    }
}

export const deleteSeat = async (req, res, next) => {
    const tripId = req.params.tripid;
    try {
        try {
            await Trip.findByIdAndUpdate(tripId, {
                $pull: { seats: req.params.id },
            })
        } catch (err) {
            next(err)
        }
        res.status(200).json('Seat has been deleted.')
    } catch (err) {
        next(err)
    }

}


export const getSeat = async (req, res, next) => {

    try {
        const trip = await Seat.findById(req.params.id)
        res.status(200).json(trip)
    } catch (err) {
        next(err)
    }
}

export const getSeats = async (req, res, next) => {
    try {
        const seats = await Seat.find()
        res.status(200).json(seats)
    } catch (err) {
        next(err)
    }
}