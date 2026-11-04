
const mongoose = require('mongoose')

const{ quizSchema, puntuacionSchema } = require('./schemas')

const Quiz = mongoose.model(`Quiz`, quizSchema)

const Puntuacion = mongoose.model(`Puntuacion`, puntuacionSchema)

module.exports = {
    Quiz, 
    Puntuacion
}