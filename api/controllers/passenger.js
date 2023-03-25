import Passenger from '../models/Passenger.js'
import Trip from '../models/Trip.js'
import { createError } from '../utils/error.js'

export const createPassenger = async (req, res, next) => {
    req.body.createdBy = req.user.id
    const tripId = req.params.tripid;
    const newPassenger = new Passenger(req.body)

    try {
        const savedPassenger = await newPassenger.save()
        const trip = await Trip.findById(tripId).populate('passengers');

        const isCreated = trip.passengers.find(passenger => passenger.createdBy == req.user.id)
        if (isCreated) {
            return res.status(400).json({ message: 'User already exists in passengers array' });
        }
        try {
            await Trip.findByIdAndUpdate(tripId, {
                $push: { passengers: savedPassenger },
            })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedPassenger)
    } catch (err) {
        next(err)
    }
}

export const updatePassenger = async (req, res, next) => {
    const tripId = req.params.tripid;

    try {
        const trip = await Trip.findById(tripId).populate('passengers');
        const passenger = trip.passengers.find(passenger => passenger.createdBy == req.params.id)
        if (!passenger) {
            return res.status(404).json({ message: "Passenger not found in trip." });
        }
        const updatedPassenger = await Passenger.findByIdAndUpdate(passenger._id, { $set: req.body }, { new: true })
        const passengerIndex = trip.passengers.findIndex(passenger => String(passenger.createdBy) === String(req.user.id));

        trip.passengers[passengerIndex] = updatedPassenger;
        await trip.save();
        console.log(updatedPassenger)
        res.status(200).json({ updatedPassenger });
    } catch (err) {
        next(err)
    }
}

export const deletePassenger = async (req, res, next) => {
    const tripId = req.params.tripid;
    const userId = req.params.id
    try {
        const trip = await Trip.findById(tripId).populate('passengers');
        const passenger = trip.passengers.find(passenger => passenger.createdBy == userId)
        console.log(passenger)
        if (!passenger) {
            return res.status(404).json({ message: "Passenger not found." });
        }
        try {
            await Passenger.findByIdAndDelete(passenger._id)
            trip.passengers.pull(passenger._id);
            await trip.save();
        } catch (err) {
            next(err)
        }
        res.status(200).json('Passenger has been deleted.')
    } catch (err) {
        next(err)
    }

}

// works.
export const getPassenger = async (req, res, next) => {
    const tripId = req.params.tripid;
    const userId = req.params.id

    try {
        const trip = await Trip.findById(tripId).populate('passengers');
        const passenger = trip.passengers.find(passenger => passenger.createdBy == userId)
        if (!passenger) {
            return res.status(404).json({ message: "Passenger not found." });
        }
        res.status(200).json({ passenger })
    } catch (err) {
        next(err)
    }
}

export const getPassengers = async (req, res, next) => {
    const tripId = req.params.tripid;
    try {
        const trip = await Trip.findById(tripId).populate('passengers');
        console.log(trip)
        res.status(200).json({ passengers: trip.passengers })
    } catch (err) {
        next(err)
    }
}