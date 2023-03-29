import { StatusCodes } from 'http-status-codes';
import bcrypt, { hash } from "bcrypt";
import { BadRequestError, NotFoundError } from '../errors/index.js'
import User from "../models/User.js"

export const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) throw new NotFoundError('User not found')

    const { password: passwordUser, ...otherDetails } = req.body.userData;
    if (!req.body.userData) throw new NotFoundError('User data not found.')

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(passwordUser, salt);

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: { password: hash, ...otherDetails } }, { new: true })
    if (!updatedUser) throw new NotFoundError('Usuario no existe.')

    const { password, isAdmin, ...userData } = updatedUser._doc

    res.status(StatusCodes.OK).json(userData)

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
            })),
        }
    })

}

export const getUsers = async (req, res) => {

    const users = await User.find()
    res.status(StatusCodes.OK).json(users)

}

