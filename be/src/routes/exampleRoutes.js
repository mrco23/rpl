import express from 'express'
import Example from '../controllers/Example.js'

const exampleRoutes = express.Router()
const example = new Example()

exampleRoutes.post('', example.addExample)
exampleRoutes.get('', example.getExample)

export default exampleRoutes