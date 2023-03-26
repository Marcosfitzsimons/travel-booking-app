import bcrypt from "bcrypt";
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import jwt from 'jsonwebtoken'
import User from "../models/User.js"

export const register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        addressCda: req.body.addressCda,
        addressCapital: req.body.addressCapital,
        phone: req.body.phone
    })

    await newUser.save()
    res.status(StatusCodes.CREATED).send('User has been created.')

}

export const login = async (req, res, next) => {
    const { emailOrUsername, password: userReqPassword } = req.body

    let user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });

    if (!emailOrUsername) return next(createError(404, "Bad username or email"));
    if (!user) return next(createError(404, "User not found!"));

    // bcrypt allow us to compare hash password with the password that is in the request.
    const isPasswordCorrect = await bcrypt.compare(userReqPassword, user.password)
    if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT, { expiresIn: process.env.JWT_LIFETIME })

    const { password, isAdmin, ...otherDetails } = user._doc
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    }).status(StatusCodes.OK).json({ ...otherDetails })

}

