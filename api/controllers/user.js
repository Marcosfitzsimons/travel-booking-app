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

    const user = await User.findById(req.params.id)
    if (!user) throw new NotFoundError('Usuario no existe.')
    res.status(StatusCodes.OK).json(user)

}

export const getUsers = async (req, res) => {

    const users = await User.find()
    res.status(StatusCodes.OK).json(users)

}

