import { format } from "date-fns";
import Passenger from "../models/Passenger.js"
import Trip from "../models/Trip.js"

export const createTrip = async (req, res, next) => {
    const newTrip = new Trip(req.body)

    try {
        const savedTrip = await newTrip.save()
        res.status(200).json(savedTrip)
    } catch (err) {
        next(err)
    }
}

export const updateTrip = async (req, res, next) => {
    try {
        const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedTrip)
    } catch (err) {
        next(err)
    }
}

export const deleteTrip = async (req, res, next) => {
    try {
        await Trip.findByIdAndDelete(req.params.id)
        res.status(200).json('Trip has been deleted')
    } catch (err) {
        next(err)
    }
}


export const getTrip = async (req, res, next) => {

    try {
        const trip = await Trip.findById(req.params.id)
        res.status(200).json(trip)
    } catch (err) {
        next(err)
    }
}

export const getTrips = async (req, res, next) => {
    // See the time of the current date -> Must be UTC-3
    try {
        const currentDate = format(new Date(), "dd/MM/yy");
        const trips = await Trip.find({ date: { $gte: currentDate } }).sort('date')
        res.status(200).json(trips)
    } catch (err) {
        next(err)
    }
}
