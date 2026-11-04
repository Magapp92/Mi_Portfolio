
const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema (

    {
        _id: { type: mongoose.Schema.Types.ObjectId , auto : true },
        quizId: { type: mongoose.Schema.Types.String },
        tipo: { type: mongoose.Schema.Types.String },
        pelicula: { type: mongoose.Schema.Types.String },
        pregunta: { type: mongoose.Schema.Types.String },
        opciones: [
            {
                id: { type: mongoose.Schema.Types.String },
                texto: { type: mongoose.Schema.Types.String }
            }
        ],
        respuestaCorrecta: { type: mongoose.Schema.Types.String },
        feedback: {
            acierto: { type: mongoose.Schema.Types.String },
            fallo: { type: mongoose.Schema.Types.String }
        },
        activa: { type: mongoose.Schema.Types.Boolean }
    },
     {
        collection: 'quiz',
        collation: {
            locale: 'es',
            strength: 2
        },
        versionKey: false
    }
)

const puntuacionSchema = new mongoose.Schema (

      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        quizId: { type: mongoose.Schema.Types.String,  required: true },
        nick: { type: mongoose.Schema.Types.String,  required: true },
        puntuacion: { type: mongoose.Schema.Types.Number,  required: true },
        aciertos: { type: mongoose.Schema.Types.Number, required: true },
        errores: { type: mongoose.Schema.Types.Number, required: true },
        preguntasTotales: { type: mongoose.Schema.Types.Number, required: true },
        tiempoTotalSegundos: { type: mongoose.Schema.Types.Number, required: true },
        fecha: { type: mongoose.Schema.Types.Date, default: Date.now },
        estado: { type: mongoose.Schema.Types.String, default: 'finalizada' },
      },
      {
        collection: 'puntuaciones',
        collation: {
            locale: 'es',
            strength: 2
        },
        versionKey: false
    }
)

module.exports = {
    quizSchema,
    puntuacionSchema
}