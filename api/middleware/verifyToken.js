import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from '../errors/index.js'
import { createError } from '../utils/error.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    // const authHeader = req.headers.authorization; // That is not the token that I'm spected, I want to access the JWT that I send when user loggin 
    // const token = authHeader.split(' ')[1] // That is not the token that I'm spected, I want to access the JWT that I send when user loggin 
    if (!token) throw new UnauthenticatedError('No estas autorizado')



    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, 'Token is not valid!'))
        req.user = user;
        next();
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.params.id)
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
            throw new UnauthenticatedError('No estas autorizado')
        }
    });
};