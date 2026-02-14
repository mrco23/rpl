import {verifyToken} from '../utils/jwt.js'
import prisma from '../config/prisma.js'

class Example {
    addExample = async (req, res) => {
        try {
            const {title, description} = req.body;
            const authHeaders = req.headers['authorization'].split(' ')[1];

            const token = verifyToken(authHeaders);
            const data = {}

            title && (data.title = title)
            description && (data.description = description)
            token.id && (data.userId = token.id)

            const newExample = await prisma.example.create({
                data
            })
            res.status(201).json({
                message: 'success',
                data: newExample
            })

        } catch (err) {
            console.error({message: err.message})
        }
    }

    getExample = async (req, res) => {

    }

}

export default Example