import { StatusCodes } from 'http-status-codes';
import { format, parse } from "date-fns";
import { NotFoundError } from '../errors/index.js'
import User from "../models/User.js"

// add validation 
export const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) throw new NotFoundError('User not found')
    const { ...userDetails } = req.body.userData;
    if (!req.body.userData) throw new NotFoundError('User data not found.')

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
    console.log(user._id)
    if (!user) throw new NotFoundError('Usuario no existe.')

    const currentDate = parse(format(new Date(), "dd/MM/yy"), "dd/MM/yy", new Date());
    const userTrips = user.myTrips.map(trip => ({
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
    }))
    const filteredUserTrips = userTrips.filter(trip => trip.date >= currentDate).sort((a, b) => new Date(a.date) - new Date(b.date))
    res.status(StatusCodes.OK).json({
        user: {
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            addressCda: user.addressCda,
            addressCapital: user.addressCapital,
            phone: user.phone,
            myTrips: filteredUserTrips,
            image: user.image
        }
    })
}
export const getUsers = async (req, res) => {

    const users = await User.find()
    res.status(StatusCodes.OK).json(users)

}

