import bcrypt from "bcrypt";
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import jwt from 'jsonwebtoken'
import User from "../models/User.js"

export const register = async (req, res, next) => {
    const { fullName, username, email, password, addressCda, phone } = req.body

    if (!fullName || !email || !username || !password || !addressCda || !phone) throw new BadRequestError('Por favor, completar todos los datos antes de enviar.')

    const emailExists = await User.findOne({ email })
    if (emailExists) throw new BadRequestError('Email ya está en uso.')

    const usernameExists = await User.findOne({ username })
    if (usernameExists) throw new BadRequestError('Nombre de usuario ya está en uso.')

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User({
        ...req.body,
        password: hash,

    })

    await user.save()

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT, { expiresIn: process.env.JWT_LIFETIME })
    const { password: userPassword, isAdmin, ...otherDetails } = user._doc

    res.status(StatusCodes.CREATED).json({
        details: { ...otherDetails },
        token: token
    })

}

export const login = async (req, res, next) => {
    const { emailOrUsername, password: userReqPassword } = req.body

    let user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });

    if (!emailOrUsername) throw new BadRequestError('Ingresa tu nombre de usuario o email.')
    if (!user) throw new UnauthenticatedError('Usuario no encontrado.')

    // bcrypt allow us to compare hash password with the password that is in the request.
    const isPasswordCorrect = await bcrypt.compare(userReqPassword, user.password)
    if (!isPasswordCorrect) throw new BadRequestError('Contraseña incorrecta.')

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT, { expiresIn: process.env.JWT_LIFETIME })

    const { password, isAdmin, ...otherDetails } = user._doc

    res.status(StatusCodes.CREATED).json({
        details: { ...otherDetails },
        token: token,
        isAdmin
    })
}

