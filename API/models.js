
const mongoose = require('mongoose')

const{ quizSchema, puntuacionSchema } = require('./schemas')

/* Modelo de las preguntas del quiz */
const Quiz = mongoose.model(`Quiz`, quizSchema)

/* Modelo de las puntuaciones del ranking */
const Puntuacion = mongoose.model(`Puntuacion`, puntuacionSchema)

module.exports = {
    Quiz,
    Puntuacion
}
