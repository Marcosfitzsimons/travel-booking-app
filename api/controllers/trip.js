import { format } from "date-fns";
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js'
import Trip from "../models/Trip.js"

export const createTrip = async (req, res) => {
    const newTrip = new Trip(req.body)

    const savedTrip = await newTrip.save()

    res.status(StatusCodes.OK).json(savedTrip)

}

export const updateTrip = async (req, res) => {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    if (!updatedTrip) throw new NotFoundError('Viaje no existe')

    res.status(StatusCodes.OK).json(updatedTrip)

}

export const deleteTrip = async (req, res) => {
    const trip = await Trip.findByIdAndDelete(req.params.id)
    if (!trip) throw new NotFoundError('Viaje no existe')

    res.status(StatusCodes.OK).json('Viaje ha sido eliminado.')

}


export const getTrip = async (req, res) => {

    const trip = await Trip.findById(req.params.id)
    if (!trip) throw new NotFoundError('Viaje no existe.')
    res.status(StatusCodes.OK).json(trip)

}

export const getTrips = async (req, res) => {
    // See the time of the current date -> Must be UTC-3
    const currentDate = format(new Date(), "dd/MM/yy");
    const trips = await Trip.find({ date: { $gte: currentDate } }).sort('date')
    res.status(StatusCodes.OK).json(trips)

}
