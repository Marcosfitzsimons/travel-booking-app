import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js'
import User from "../models/User.js"


export const updateUser = async (req, res) => {
    // Check on updated password to generate new token and not sent the password and isAdmin to the client.

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    if (!updatedUser) throw new NotFoundError('Usuario no existe.')
    res.status(StatusCodes.OK).json(updatedUser)

}

export const deleteUser = async (req, res) => {

    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) throw new NotFoundError('Usuario no existe.')
    res.status(StatusCodes.OK).json('Usuario eliminado con éxito.')

}


export const getUser = async (req, res) => {

    const user = await User.findById(req.params.id).populate('myTrips');
    if (!user) throw new NotFoundError('Usuario no existe.')
    res.status(StatusCodes.OK).json({
        user: {
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            addressCda: user.addressCda,
            addressCapital: user.addressCapital,
            phone: user.phone,
            myTrips: user.myTrips.map(trip => ({
                id: trip._id,
                name: trip.name,
                date: trip.date,
                from: trip.from,
                to: trip.to,
                departureTime: trip.departureTime,
                arrivalTime: trip.arrivalTime,
                price: trip.price,
                maxCapacity: trip.maxCapacity,
                available: trip.available
                // add any other properties you want to display about the trip
            })),
        }
    })

}

export const getUsers = async (req, res) => {

    const users = await User.find()
    res.status(StatusCodes.OK).json(users)

}

