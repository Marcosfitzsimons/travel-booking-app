import { StatusCodes } from 'http-status-codes';
import { format } from "date-fns";
import { NotFoundError } from '../errors/index.js'
import User from "../models/User.js"

// add validation 
export const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) throw new NotFoundError('User not found')

    const { ...userDetails } = req.body.data;
    if (!req.body.data) throw new NotFoundError('User data not found.')

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: { ...userDetails } }, { new: true })
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

    // See the time of the current date -> Must be UTC-3
    // const currentDate = new Date().toLocaleString('en-US', { timeZone: 'UTC-3' });
    // const formattedCurrentDate = new Date(currentDate);

    // const filteredMyTrips = user.myTrips.filter(trip => new Date(trip.date) >= formattedCurrentDate)
    // console.log(filteredMyTrips)

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

