import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    // const authHeader = req.headers.authorization; // That is not the token that I'm spected, I want to access the JWT that I send when user loggin 
    // const token = authHeader.split(' ')[1] // That is not the token that I'm spected, I want to access the JWT that I send when user loggin 
    if (!token) {
        return next(createError(401, 'You are not authenticated!'))
    }


    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, 'Token is not valid!'))
        req.user = user;
        next();
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "Your are not authorized"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "Your are not authorized"));
        }
    });
};