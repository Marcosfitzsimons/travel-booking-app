import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from '../errors/index.js'
import User from '../models/User.js'
import { createError } from '../utils/error.js'

export const verifyToken = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1]
    if (!token) throw new UnauthenticatedError('No estas autorizado, no token provided.')

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const decoded = jwt.verify(token, process.env.JWT)
        req.user = await User.findById(decoded.id).select('-password')
        next()
    }
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (!req.params.id) {
            return next(createError(400, "Missing id parameter"));
        }
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            throw new UnauthenticatedError('No estas autorizado')
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            throw new UnauthenticatedError('No estas autorizado, no sos admin.')
        }
    });
};