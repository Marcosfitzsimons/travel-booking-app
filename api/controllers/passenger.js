import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js'
import Passenger from '../models/Passenger.js'
import Trip from '../models/Trip.js'
import User from '../models/User.js';



export const createPassenger = async (req, res, next) => {
    req.body.createdBy = req.user.id

    const tripId = req.params.tripid;
    const newPassenger = new Passenger(req.body)

    const savedPassenger = await newPassenger.save()
    const trip = await Trip.findById(tripId).populate('passengers');

    const isCreated = trip.passengers.find(passenger => passenger.createdBy == req.user.id)
    if (isCreated) throw new BadRequestError('Usuario ya tiene boleto para este viaje.')

    // Push the trip to user's myTrips array

    await User.findByIdAndUpdate(req.user.id, {
        $push: { myTrips: tripId },
    });

    try {
        await Trip.findByIdAndUpdate(tripId, {
            $push: { passengers: savedPassenger },
        })

    } catch (err) {
        next(err)
    }
    res.status(StatusCodes.OK).json({ savedPassenger })
}

export const updatePassenger = async (req, res, next) => {
    const tripId = req.params.tripid;
    const userId = req.params.id

    const trip = await Trip.findById(tripId).populate('passengers');
    const passenger = trip.passengers.find(passenger => passenger.createdBy == userId)
    if (!passenger) throw new NotFoundError('Pasajero no existe en este viaje.')

    const updatedPassenger = await Passenger.findByIdAndUpdate(passenger._id, { $set: req.body }, { new: true })
    const passengerIndex = trip.passengers.findIndex(passenger => String(passenger.createdBy) === String(userId));

    trip.passengers[passengerIndex] = updatedPassenger;
    await trip.save();
    res.status(StatusCodes.OK).json({ updatedPassenger });

}

export const deletePassenger = async (req, res, next) => {
    const tripId = req.params.tripid;
    const userId = req.params.id

    const trip = await Trip.findById(tripId).populate('passengers');
    const passenger = trip.passengers.find(passenger => passenger.createdBy == userId)

    if (!passenger) throw new NotFoundError('Pasajero no existe en este viaje.')

    try {
        await Passenger.findByIdAndDelete(passenger._id)
        trip.passengers.pull(passenger._id);
        await trip.save();
    } catch (err) {
        next(err)
    }
    res.status(StatusCodes.OK).json('Pasaje cancelado con éxito.')

}

// works.
export const getPassenger = async (req, res, next) => {
    const tripId = req.params.tripid;
    const userId = req.params.id

    const trip = await Trip.findById(tripId).populate('passengers');
    const passenger = trip.passengers.find(passenger => passenger.createdBy == userId)
    if (!passenger) throw new NotFoundError('Pasajero no existe en este viaje.')

    res.status(StatusCodes.OK).json({ passenger })

}

export const getPassengers = async (req, res, next) => {
    const tripId = req.params.tripid;

    const trip = await Trip.findById(tripId).populate({
        path: 'passengers',
        populate: { path: 'createdBy' }
    });

    res.status(StatusCodes.OK).json({ passengers: trip.passengers })

}