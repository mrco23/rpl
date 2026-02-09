import jwt from 'jsonwebtoken'
import prisma from "../config/prisma.js"

const SECRET_KEY = process.env.JWT_SECRET;

export const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, {expiresIn: '3 days'})
}

export const verifyToken = (token)=>{
    return jwt.verify(token, SECRET_KEY)
}

